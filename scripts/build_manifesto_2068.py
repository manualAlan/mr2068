"""Build the fully typeset 2068 Caprica manifesto from editable policy content.

Run with the bundled Python runtime. No image generation is used. Photographs
are downloaded source assets; all text and the debt chart remain vector based.
"""
from pathlib import Path
from xml.sax.saxutils import escape
import json
import re
import sys

from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from manifesto_2068_content import SLOGAN, PROMISES, PAGES, EVERYDAY, DELIVERY

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/pdf/Caprica_Freedom_to_Build_2068_Manifesto.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
ASSETS = ROOT / 'assets/manifesto-2068'
W, H = A4
M = 44
CW = W - 2 * M
NAVY = HexColor('#092337')
INK = HexColor('#203746')
GRAY = HexColor('#576E7A')
BLUE = HexColor('#2374D8')
GREEN = HexColor('#31B87F')
TEAL = HexColor('#087C77')
PALE = HexColor('#EDF5F6')
RULE = HexColor('#CBDEDF')
CREAM = HexColor('#F8F6EF')
ACCENTS = [BLUE, TEAL, GREEN]

for name, file in [('MR', 'Montserrat-Regular.ttf'), ('MR-Bold', 'Montserrat-Bold.ttf'), ('MR-Italic', 'Montserrat-Italic.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(ROOT / 'assets/fonts/montserrat' / file)))

c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
c.setTitle('Freedom to Build. Confidence in Tomorrow. | LCA Manifesto 2068')
c.setAuthor("Liberal-Conservative Alliance | Moderate Reform, People's Party, Avenir Caprica")
c.setSubject('Caprica 2068 election: Robert Bluespan, Party Co-leader; program for 2068-2072')
c.setCreator('LCA campaign editorial team')
layout_log = []
page_map = {}

def box(x, top, w, h, fill, radius=0, stroke=None):
    c.setFillColor(fill)
    c.setStrokeColor(stroke or fill)
    if radius:
        c.roundRect(x, H-top-h, w, h, radius, fill=1, stroke=bool(stroke))
    else:
        c.rect(x, H-top-h, w, h, fill=1, stroke=bool(stroke))

def line(x1, top1, x2, top2, color=RULE, width=.7):
    c.setStrokeColor(color); c.setLineWidth(width)
    c.line(x1, H-top1, x2, H-top2)

def para(s, x, top, width, size=10, leading=None, color=INK, bold=False,
         max_h=None, markup=False, align=0):
    if '\u2014' in s or '\u2013' in s or '\u2011' in s:
        raise ValueError(f'Unsupported dash in {s!r}')
    style = ParagraphStyle('p', fontName='MR-Bold' if bold else 'MR',
                           fontSize=size, leading=leading or size*1.42,
                           textColor=color, alignment=align,
                           allowWidows=0, allowOrphans=0)
    p = Paragraph(s if markup else escape(s).replace('\n', '<br/>'), style)
    _, height = p.wrap(width, 1200)
    if max_h is not None and height > max_h + .1:
        raise ValueError(f'Page {c.getPageNumber()}: text overflow ({height:.1f}>{max_h}) {s[:100]}')
    if top + height > H - 12:
        raise ValueError(f'Page {c.getPageNumber()}: text outside live area {s[:80]}')
    p.drawOn(c, x, H-top-height)
    layout_log.append(dict(page=c.getPageNumber(), x=x, y=top, w=width, h=height, text=s))
    return top+height

def label(s, x, top, color=TEAL, width=CW):
    return para(s.upper(), x, top, width, 7.8, 10, color, True)

def photo(name, x, top, width, height, focus=(.5,.5)):
    path = ASSETS / name
    im = Image.open(path)
    scale = max(width / im.width, height / im.height)
    dw, dh = im.width * scale, im.height * scale
    px = x-(dw-width)*focus[0]
    py = H-top-height-(dh-height)*(1-focus[1])
    c.saveState()
    p = c.beginPath(); p.rect(x, H-top-height, width, height)
    c.clipPath(p, stroke=0, fill=0)
    c.drawImage(str(path), px, py, dw, dh, mask='auto')
    c.restoreState()

def logo(x, top, w=48):
    path = ROOT/'assets/lca_logo.png'
    c.drawImage(str(path), x, H-top-w, w, w, preserveAspectRatio=True, anchor='c', mask='auto')

def footer(section, dark=False):
    ink = HexColor('#CBDFE8') if dark else GRAY
    rule = HexColor('#365368') if dark else RULE
    line(M, H-41, W-M, H-41, rule)
    para('LCA 2068  /  '+section, M, H-29, CW-30, 6.8, 8.5, ink)
    para(f'{c.getPageNumber():02}', W-M-25, H-29, 25, 7.5, 9, ink, True, align=2)

def start(key, section, dark=False):
    c.bookmarkPage(key)
    c.addOutlineEntry(section, key, 0, False)
    page_map[key]=c.getPageNumber()
    box(0,0,W,H,NAVY if dark else white)
    if not dark:
        box(0,0,W,5,BLUE); box(W*.58,0,W*.42,5,GREEN)
        label('FREEDOM TO BUILD. CONFIDENCE IN TOMORROW.', M, 24, GRAY)

def end(section, dark=False):
    footer(section, dark)
    c.showPage()

def heading(kicker, title, intro=None, color=TEAL):
    label(kicker, M, 57, color)
    para(title, M, 82, CW, 27, 31.5, NAVY, True, max_h=66)
    if intro:
        para(intro, M, 158, CW, 10.3, 14.8, GRAY, max_h=46)
    line(M,214,W-M,214)

def policy_page(p):
    start(p['id'], p['title'])
    heading(f"0{p['part']+1} / {PROMISES[p['part']]}", p['title'], p['intro'], ACCENTS[p['part']])
    gap=25
    col_w=(CW-gap)/2
    for i,(title,body) in enumerate(p['entries']):
        x=M+(i%2)*(col_w+gap)
        top=234+(i//2)*169
        box(x,top,25,2.2,ACCENTS[p['part']])
        bottom=para(title,x,top+12,col_w,11.2,14.2,NAVY,True,max_h=29)
        para(body,x,bottom+7,col_w,9.05,12.45,INK,max_h=115)
    box(M,756,CW,40,PALE)
    label('DELIVERY',M+10,764,ACCENTS[p['part']],60)
    para(p['delivery'],M+77,764,CW-87,7.7,10.7,INK,max_h=25)
    end(PROMISES[p['part']])

def cover():
    start('cover','2068 manifesto',True)
    label('LIBERAL-CONSERVATIVE ALLIANCE',M,42,HexColor('#8CDBE6'))
    logo(W-M-48,37,48)
    para('FREEDOM\nTO BUILD.',M,105,CW,47,48,white,True,max_h=105)
    para('CONFIDENCE\nIN TOMORROW.',M,230,CW,35,39,HexColor('#7DE3AE'),True,max_h=85)
    line(M,335,M+130,335,GREEN,3)
    para('A country where you can build a good life.',M,360,430,17,23,white,True,max_h=50)
    label('THE 2068 MANIFESTO / OUR PROGRAM TO 2072',M,436,HexColor('#9AB8C9'))
    photo('port.jpg',0,488,W,245,focus=(.55,.52))
    box(M,708,CW,53,NAVY)
    para('Robert Bluespan, Party Co-leader',M+14,720,CW-28,14,18,white,True)
    para("Moderate Reform Party  /  People's Party  /  Avenir Caprica",M,788,CW,7.7,10,HexColor('#BAD6E3'))
    c.showPage()

def contents():
    start('contents','How to read this manifesto')
    heading('ONE PURPOSE / THREE PROMISES','A country you can build a life in.',
            'A shared program for an MR-led government: freedom to move forward, reliable foundations beneath you and a real say over the life you choose.')
    routes=[
        ('THE CASE FOR 2068', 'Our next chapter, governing record and three flagship commitments', 'next-chapter', 244),
        ('01  THE FREEDOM TO GET AHEAD', 'Homes, work, enterprise, education, science and a gateway economy', 'part-0', 346),
        ('02  THE CONFIDENCE TO PLAN YOUR FUTURE', 'Sound finances, care, energy, reliable networks, safety and defense', 'part-1', 448),
        ('03  THE POWER TO SHAPE YOUR OWN LIFE', 'Rights, accountable government, digital choice and an open country', 'part-2', 550),
    ]
    for title,body,target,top in routes:
        label(title,M,top,TEAL)
        para(body,M,top+22,CW-57,10.5,15,INK,max_h=35)
        c.linkRect('',target,(M,H-top-69,W-M,H-top+3),relative=0,thickness=0)
        line(M,top+77,W-M,top+77)
    end('Read the promise. Inspect the policy. Judge the result.')

def introduction():
    start('next-chapter','Robert Bluespan: the next chapter')
    heading('ROBERT BLUESPAN / PARTY CO-LEADER','The next chapter should be yours.')
    y=242
    paragraphs=[
        "A country succeeds when people can make plans and expect them to mean something. A home within reach. Work that rewards effort. A business with room to grow. Care that is there when a family needs it. These are the ambitions that should set the direction of government.",
        "Capricans entrusted Moderate Reform with another term from 2064 to 2068. We enter this election as a governing alliance with a record to answer for and work still to do. Gross public debt has fallen to 69% of GDP. That strengthens our foundations, but a healthier balance sheet is not the same as an affordable home or a dependable appointment.",
        "The next MR-led government must turn national strength into a wider range of personal opportunities. We will make it easier to build homes and businesses, connect regions to expanding markets and equip people for the work those changes create. We will protect universal care, constitutional freedoms and the institutions on which long-term decisions depend.",
        "Our island position gives us a particular responsibility and possibility. Ports, science, finance, clean power and trusted law can connect Columbia with Albeuman and the world beyond. We will organize investment around that opportunity, then judge it by the benefit for the worker, farmer, student and local supplier as well as the exporter.",
        "This manifesto sets out the choices. It states deadlines, explains funding routes and names the public tests. We will protect what works, correct what has fallen short and publish the difference. By 2072, people should be able to see progress in their own lives and check the record for themselves.",
    ]
    for s in paragraphs:
        y=para(s,M,y,CW,10.5,15.7,INK)+16
    line(M,y+2,M+90,y+2,GREEN,2)
    para('Robert Bluespan',M,y+21,CW,17,21,NAVY,True)
    para('Party Co-leader',M,y+48,CW,9,12,GRAY)
    end('A new mandate for an MR-led government')

def record():
    start('record','The 2068 starting point')
    heading('IN GOVERNMENT / 2064-2068','Progress is a foundation to build on.',
            'Another MR term has brought Caprica to this election. We will defend the gains, acknowledge unfinished work and set a clear starting line for the next four years.')
    box(M,238,CW,148,NAVY)
    para('69%',M+20,257,200,62,66,white,True)
    label('GROSS PUBLIC DEBT / GDP',M+235,268,HexColor('#7DE3AE'),CW-255)
    para('The 2068 starting point. Lower debt gives Caprica more resilience; it is not a license for unfunded promises.',M+235,294,CW-255,10,15,white,max_h=66)
    items=[
        ('Continue responsible government', 'Build on fiscal repair, an open economy and constitutional institutions. Retain useful measures such as the earnings credit, net-zero framework and enforceable limits on state power.'),
        ('Face the work still ahead', 'Housing supply, reliable local services, regional connections and productive investment remain the tests. A previous manifesto promise does not become an achievement simply because another term has passed.'),
        ('Publish the next starting line', 'In the first 100 days, verify housing completions, care access, network condition and delivery costs. Compare 2072 results with those 2068 baselines, not selectively chosen years.'),
    ]
    y=421
    for hd,body in items:
        para(hd,M,y,CW,13,17,NAVY,True)
        y=para(body,M,y+26,CW,10,14.5,INK)+28
    end('A record to account for. A program to deliver.')

def flagships():
    start('flagships','Three flagship commitments')
    heading('OUR NATIONAL CONTRACT','Three commitments people can test.',
            'These commitments connect the same ambition across the campaign: the freedom to build a life, backed by institutions reliable enough to plan around.')
    items=[
        ('01', 'MORE HOMES', '50% more annual completions by 2072',
         'Make independence possible through more serviced land, clear planning clocks and construction capacity. Measure against the verified 2068 total, with rents, prices and regional delivery published alongside the headline target.'),
        ('02', 'A ROUTE FORWARD', 'A next-step offer within 90 days',
         'For under-25s out of work or education for four months, guarantee a named plan and a suitable apprenticeship, training or employment offer by 2070. Portable training and fair tax rules will keep opportunity open through later working life.'),
        ('03', 'RELIABLE FOUNDATIONS', 'Debt down to 65% of GDP by 2072',
         'Use the 69% starting point to build fiscal resilience under normal conditions. Fund lasting commitments properly and publish service access, so discipline supports dependable care and infrastructure as well as a stronger balance sheet.'),
    ]
    for i,(n,k,hd,body) in enumerate(items):
        top=238+i*179
        box(M,top,CW,163,PALE if i!=1 else CREAM)
        label(n+' / '+k,M+16,top+16,ACCENTS[i])
        para(hd,M+16,top+43,CW-32,16,21,NAVY,True,max_h=44)
        para(body,M+16,top+94,CW-32,9.5,13.5,INK,max_h=57)
    end('Three promises, one national direction')

def everyday():
    start('everyday','A program for the lives people lead')
    heading('THE SAME COUNTRY / MANY PATHS','A good life takes different forms.',
            'The same fair rules and reliable foundations should serve people with different ambitions, responsibilities and circumstances. This program is a shared national offer.')
    gap=25; cw=(CW-gap)/2
    for i,(hd,body) in enumerate(EVERYDAY):
        x=M+(i%2)*(cw+gap); top=244+(i//2)*177
        box(x,top,cw,156,PALE if i%2==0 else CREAM)
        para(hd,x+15,top+17,cw-30,13,17,NAVY,True,max_h=38)
        para(body,x+15,top+65,cw-30,9.7,14,INK,max_h=80)
    end('Opportunity and security across every stage of life')

def divider(part):
    start(f'part-{part}',PROMISES[part],True)
    label(f'OUR PROMISE / 0{part+1}',M,45,HexColor('#80DDB7'))
    title=['The freedom\nto get ahead.','The confidence\nto plan your\nfuture.','The power\nto shape your\nown life.'][part]
    para(title,M,115,CW,37,42,white,True,max_h=134)
    sub=[
        'More room to live. More ways to earn. More opportunity to create something of your own.',
        'Sound finances, dependable care and a country prepared for the next challenge.',
        'Equal rights, meaningful choices and public power that answers to the people it serves.',
    ][part]
    para(sub,M,289,445,15,21,HexColor('#D3E6EB'),max_h=65)
    # Each divider uses a different real photograph so no image is repeated.
    photo(['homes.jpg','wind.jpg','transit.jpg'][part],0,399,W,363,focus=[(.5,.6),(.5,.45),(.56,.58)][part])
    box(M,733,CW,44,NAVY)
    label('CAPRICA / 2068-2072',M+14,749,white)
    end(PROMISES[part],True)

def fiscal_chart():
    start('debt','From fiscal repair to resilience')
    heading('THE ECONOMIC FOUNDATION','Keep the room to respond.',
            'Gross debt has fallen to 69% of GDP in 2068. Our proposed goal is 65% by 2072, a further reduction of 4 percentage points under normal economic conditions.')
    box(M,239,CW,329,PALE)
    label('GROSS PUBLIC DEBT / SHARE OF GDP',M+17,256,TEAL)
    chart_left=M+58; chart_top=311; chart_h=192; chart_w=CW-105
    for tick in range(0,81,20):
        yy=chart_top+chart_h-(tick/80)*chart_h
        line(chart_left,yy,chart_left+chart_w,yy,RULE,.5)
        para(f'{tick}%',M+17,yy-5,31,7.5,9,GRAY,align=2)
    for i,(value,year,note) in enumerate([(69,'2068','CURRENT RESULT'),(65,'2072','PROPOSED GOAL')]):
        x=chart_left+45+i*174; height=chart_h*value/80
        if i==0:
            box(x,chart_top+chart_h-height,89,height,BLUE)
        else:
            c.saveState(); c.setDash(4,3); c.setStrokeColor(TEAL); c.setLineWidth(1.5)
            c.setFillColor(HexColor('#D9EEE6'))
            c.rect(x,H-(chart_top+chart_h),89,height,fill=1,stroke=1);c.restoreState()
        para(f'{value}%',x-5,chart_top+chart_h-height-32,99,20,25,NAVY,True,align=1)
        para(year,x,515,89,10,13,NAVY,True,align=1)
        para(note,x-23,535,135,6.7,9,GRAY,True,align=1)
    para('The 2072 bar is a policy target, not an economic forecast. No intermediate annual outturns are implied.',M,585,CW,8.5,12,GRAY,max_h=27)
    y=637
    for hd,body in [
        ('Why the number matters', 'Lower debt can create room to absorb shocks and reduce financing pressure. It does not by itself prove that households are better off; wages, housing costs and access to services must also improve.'),
        ('How we keep the promise honest', 'Publish the nominal debt and GDP assumptions behind the ratio, financing costs and growth stress tests. Independent costing and a parliamentary escape clause will govern the path, with no raid on sovereign-wealth principal.'),
    ]:
        para(hd,M,y,CW,11,15,NAVY,True)
        y=para(body,M,y+23,CW,9.3,13,INK)+20
    end('69% is the starting point. 65% is the proposed destination.')

def delivery():
    start('delivery','A public delivery timetable')
    heading('THE CONTRACT / 2068-2072','From a mandate to visible results.',
            'Every commitment needs an accountable minister, a delivery body, funding and an observable measure. Parliament and the public should be able to follow the work.')
    for i,(when,hd,body) in enumerate(DELIVERY):
        top=237+i*136
        box(M,top,4,116,ACCENTS[i%3])
        label(when,M+18,top+4,ACCENTS[i%3])
        para(hd,M+18,top+27,CW-18,14,18,NAVY,True)
        para(body,M+18,top+58,CW-18,9.7,13.7,INK,max_h=59)
    end('Deadlines, owners and published results')

def scorecard():
    start('scorecard','The public scorecard')
    heading('ACCOUNTABILITY','Let the public judge the result.',
            'An independent National Audit Office will report quarterly on manifesto delivery. Ministers must explain missed milestones, corrective action and any change to the original commitment.')
    rows=[
        ('Debt and public finances','69% baseline; 65% goal; costs and stress tests','Each budget / Fiscal Council'),
        ('Homes and affordability','Completions, starts, rents, prices and permits','Monthly / Planning Auditor'),
        ('Work and opportunity','Offer times, completion and sustained work','Quarterly / National Audit Office'),
        ('Business and suppliers','Incorporation times; invoices paid within 20 working days','Quarterly / National Audit Office'),
        ('Health and care','Actual access, treatment waits and quality','Monthly / Health Standards Office'),
        ('Schools and skills','Progress, completion and destinations','Annual / Qualifications Association'),
        ('Energy and climate','Reliability, bills, emissions and dividends','Quarterly / Climate Commission'),
        ('Networks and regions','Service reliability, asset condition and access','Quarterly / Sector regulators'),
        ('Defense and resilience','Mission readiness and tested continuity','Quarterly / Parliamentary review'),
        ('Rights and digital services','Appeals, errors, intrusive powers and remedies','Quarterly / Independent oversight'),
        ('Integrity and spending','Contracts, interests, gifts and changes','Live registers / Independent audit'),
    ]
    widths=[128,218,CW-346]; top=236; row_h=45
    box(M,top,CW,33,NAVY)
    x=M
    for title,w in zip(['PUBLIC TEST','WHAT WE WILL PUBLISH','WHEN / WHO CHECKS'],widths):
        para(title,x+9,top+11,w-16,7.2,9,white,True);x+=w
    top+=33
    for i,row in enumerate(rows):
        box(M,top,CW,row_h,PALE if i%2==0 else CREAM)
        x=M
        for j,(s,w) in enumerate(zip(row,widths)):
            para(s,x+9,top+9,w-17,8.2,10.7,INK,j==0,max_h=33);x+=w
        top+=row_h
    para('After two missed milestones, the responsible minister must publish a recovery plan or ask Parliament to amend or end the program.',M,776,CW,8.5,12,TEAL,True,max_h=24)
    end('Public evidence, including the promises not yet delivered')

def notes():
    start('notes','Reading the numbers and photographs')
    heading('NOTES ON THIS EDITION','Clear about the basis of the program.')
    y=241
    entries=[
        ('The setting and dates', 'This is the Liberal-Conservative Alliance manifesto for Caprica\'s fictional 2068 election, covering a proposed governing term to 2072. References to 2064-2068 describe the preceding MR-led administration. Robert Bluespan is a Party Co-leader.'),
        ('Results and targets', 'The current gross-debt figure is 69% of GDP, supplied in the 2068 campaign brief. The 65% figure is the new proposed 2072 goal, not an independently forecast outturn. Other new deadlines and targets are manifesto commitments; they are not claims that earlier promises have already been delivered.'),
        ('Baselines and affordability', 'Annual housing completions will be compared with a verified 2068 baseline. The gross-debt ratio is separate from the statutory net-debt ceiling. Tax amounts use the established reference schedule and are subject to statutory indexation. Funding routes are described here; final allocations require published costing under the fiscal framework.'),
        ('Photography', 'The photographs are real stock images used to illustrate homes, farming and maritime trade in a fictional setting. They do not depict actual Caprican locations or imply endorsement by the photographers. Images are cropped to the page frames; no AI-generated photographs are used in this edition.'),
    ]
    for hd,body in entries:
        para(hd,M,y,CW,12,16,NAVY,True)
        y=para(body,M,y+24,CW,9.3,13.5,INK)+23
    credits=[
        ('Port photography: Andy Li / Unsplash','https://unsplash.com/photos/CpsTAUPoScw'),
        ('Housing photography: Denise Jans / Unsplash','https://unsplash.com/photos/UbCSGqLXSOE'),
        ('Field photography: Melissa Askew / Unsplash','https://unsplash.com/photos/wheat-field-y4xZxzN754M'),
    ]
    for txt,url in credits:
        end_y=para(txt,M,y,CW,8.4,12,TEAL)
        c.linkURL(url,(M,H-end_y,W-M,H-y),relative=0,thickness=0)
        y=end_y+8
    end('Liberal-Conservative Alliance / 2068 edition')

def closing():
    start('closing','Freedom to Build. Confidence in Tomorrow.',True)
    photo('field.jpg',0,0,W,346,focus=(.5,.55))
    box(0,318,W,H-318,NAVY)
    label('OUR SHARED PURPOSE',M,353,HexColor('#80DDB7'))
    para('A country where\nyou can build\na good life.',M,398,CW,38,43,white,True,max_h=132)
    para(SLOGAN,M,575,CW,18,26,HexColor('#80DDB7'),True,max_h=54)
    para('Robert Bluespan, Party Co-leader',M,660,CW,14,20,white,True)
    para('An MR-led government. A common Alliance program.\nA mandate for 2068-2072.',M,700,CW-75,10.5,15,HexColor('#C6DAE5'),max_h=46)
    para('Photography: Andy Li, Denise Jans, Melissa Askew and Unsplash contributors.',M,759,CW-75,6.8,9,HexColor('#9CB7C5'),max_h=16)
    logo(W-M-60,699,60)
    end('Liberal-Conservative Alliance',True)

cover(); contents(); introduction(); record(); flagships(); everyday()
for part in range(3):
    divider(part)
    if part==1:
        fiscal_chart()
    for p in PAGES:
        if p['part']==part:
            policy_page(p)
closing()
c.save()

audit_dir=ROOT/'tmp/pdfs/manifesto-2068'
audit_dir.mkdir(parents=True,exist_ok=True)
(audit_dir/'layout.json').write_text(json.dumps(layout_log,indent=2),encoding='utf-8')
(audit_dir/'page-map.json').write_text(json.dumps(page_map,indent=2),encoding='utf-8')
print(f'Created {OUT}')
print(f'{len(page_map)} pages; {len(layout_log)} measured text blocks')
