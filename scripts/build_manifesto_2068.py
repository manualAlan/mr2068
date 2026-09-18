"""Typeset the 2068 LCA manifesto with sourced photographs and checked geometry."""
from pathlib import Path
from xml.sax.saxutils import escape
import hashlib
import json
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from manifesto_2068_content import SLOGAN, PROMISES, PAGES

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/pdf/Caprica_Freedom_to_Build_2068_Manifesto.pdf'
ASSETS = ROOT / 'assets/manifesto-2068'
AUDIT = ROOT / 'tmp/pdfs/manifesto-2068'
OUT.parent.mkdir(parents=True, exist_ok=True)
AUDIT.mkdir(parents=True, exist_ok=True)
W, H = A4
M = 43
CW = W - 2*M
NAVY = HexColor('#092337')
INK = HexColor('#203746')
GRAY = HexColor('#536775')
BLUE = HexColor('#246CEA')
GREEN = HexColor('#69E5AB')
TEAL = HexColor('#08756D')
PALE = HexColor('#EDF5F3')
RULE = HexColor('#CEDBD9')
CREAM = HexColor('#F7F5F0')
LIGHT = HexColor('#C7DCDF')
ACCENTS = [BLUE, TEAL, TEAL]
for name, file in [('MR','Montserrat-Regular.ttf'),('MR-Bold','Montserrat-Bold.ttf'),('MR-Italic','Montserrat-Italic.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(ROOT/'assets/fonts/montserrat'/file)))
pdfmetrics.registerFontFamily('MR',normal='MR',bold='MR-Bold',italic='MR-Italic',boldItalic='MR-Bold')
c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
c.setTitle('Your Next Chapter | Freedom to Build. Confidence in Tomorrow. | LCA 2068')
c.setAuthor("Liberal-Conservative Alliance | Moderate Reform Party, People's Party, Avenir Caprica")
c.setSubject('Caprica 2068 manifesto; Robert Bluespan, Party Co-leader; program to 2072')
c.setCreator('LCA campaign')
layout_log, photo_log, page_map = [], [], {}
photo_hashes = set()

def box(x,top,w,h,fill):
    c.setFillColor(fill)
    c.rect(x,H-top-h,w,h,fill=1,stroke=0)

def line(x1,top1,x2,top2,color=RULE,width=.7):
    c.setStrokeColor(color); c.setLineWidth(width)
    c.line(x1,H-top1,x2,H-top2)

def para(s,x,top,width,size=10,leading=None,color=INK,bold=False,max_h=None,align=0):
    if any(ch in s for ch in ['\u2014','\u2013','\u2011']):
        raise ValueError(f'Unsupported dash: {s}')
    style=ParagraphStyle('p',fontName='MR-Bold' if bold else 'MR',fontSize=size,
                         leading=leading or size*1.42,textColor=color,alignment=align,
                         allowWidows=0,allowOrphans=0)
    p=Paragraph(escape(s).replace('\n','<br/>'),style)
    _,height=p.wrap(width,1200)
    if max_h is not None and height>max_h+.1:
        raise ValueError(f'Page {c.getPageNumber()}: {height:.1f}>{max_h} :: {s[:120]}')
    if top+height>H-12:
        raise ValueError(f'Page {c.getPageNumber()}: text outside page :: {s[:70]}')
    p.drawOn(c,x,H-top-height)
    layout_log.append(dict(page=c.getPageNumber(),x=x,y=top,w=width,h=height,text=s))
    return top+height

def label(s,x,top,color=TEAL,width=CW,size=7.6):
    return para(s.upper(),x,top,width,size,10.4,color,True)

def photo(name,x,top,width,height,focus=(.5,.5),portrait=False,zoom=1):
    path=ROOT/'public/images'/name if portrait else ASSETS/name
    checksum=hashlib.sha256(path.read_bytes()).hexdigest()
    if checksum in photo_hashes:
        raise ValueError(f'Repeated photograph: {name}')
    photo_hashes.add(checksum)
    with Image.open(path) as im: iw,ih=im.size
    scale=max(width/iw,height/ih)*zoom
    dw,dh=iw*scale,ih*scale
    px=x-(dw-width)*focus[0]
    py=H-top-height-(dh-height)*(1-focus[1])
    c.saveState()
    clip=c.beginPath();clip.rect(x,H-top-height,width,height)
    c.clipPath(clip,stroke=0,fill=0)
    c.drawImage(str(path),px,py,dw,dh,mask='auto')
    c.restoreState()
    photo_log.append(dict(page=c.getPageNumber(),file=name,sha256=checksum,
                          x=x,y=top,w=width,h=height,source_size=[iw,ih],
                          effective_dpi=round(72/scale),portrait=portrait))

def logo(x,top,w=42):
    c.drawImage(str(ROOT/'assets/lca_logo.png'),x,H-top-w,w,w,mask='auto')

def footer(section,dark=False):
    color=LIGHT if dark else GRAY
    line(M,H-42,W-M,H-42,HexColor('#355566') if dark else RULE)
    label('LCA / 2068',M,H-29,color,70,6.7)
    para(section,M+84,H-29,CW-115,6.7,9,color)
    para(f'{c.getPageNumber():02}',W-M-25,H-29,25,7.4,9,color,True,align=2)

def start(key,title,dark=False):
    page_map[key]=c.getPageNumber()
    c.bookmarkPage(key)
    c.addOutlineEntry(title,key,0,False)
    box(0,0,W,H,NAVY if dark else white)
    if not dark:
        box(M,24,28,3,BLUE);box(M+32,24,28,3,GREEN)
        label('Freedom to Build. Confidence in Tomorrow.',M+76,20,GRAY,CW-76,6.8)

def end(section,dark=False):
    footer(section,dark);c.showPage()

def title(kicker,head,intro=None,size=30):
    label(kicker,M,58)
    para(head,M,83,CW,size,size*1.12,NAVY,True,max_h=73)
    if intro: para(intro,M,166,CW,10.4,15,GRAY,max_h=46)

def internal_link(key,x,top,width,height):
    c.linkRect('',key,(x,H-top-height,x+width,H-top),relative=0,thickness=0)

def cover():
    start('cover','LCA 2068 / Your next chapter',True)
    label('LIBERAL-CONSERVATIVE ALLIANCE',M,42,GREEN,CW-75)
    logo(W-M-45,33,45)
    para('YOUR LIFE.\nYOUR NEXT\nCHAPTER.',M,112,CW,58,61,white,True,max_h=190)
    box(M,325,65,4,GREEN)
    para(SLOGAN,M,351,CW,20,27,GREEN,True,max_h=57)
    label('THE 2068 MANIFESTO / A PROGRAM TO 2072',M,424,LIGHT)
    photo('port.jpg',0,460,W,289,focus=(.55,.50))
    box(0,746,W,96,NAVY)
    para('A country where you can build a good life.',M,764,CW,12.2,17,white,True)
    para("Moderate Reform Party   /   People's Party   /   Avenir Caprica",M,803,CW,7,10,LIGHT)
    c.showPage()

def contents():
    start('contents','Find your next chapter')
    title('THE CHOICE / 2068','A stronger country.\nA life you can plan.',
          'National progress should reach your front door. Our next term is about the homes, work, care and freedom that make a future possible.')
    rows=[
        ('THE CASE FOR ANOTHER TERM','Robert Bluespan, our record and our shared alliance','next-chapter','03',252),
        ('01 / THE FREEDOM TO GET AHEAD','Homes, earnings, enterprise, skills and an open economy','part-0','06',354),
        ('02 / THE CONFIDENCE TO PLAN YOUR FUTURE','Sound finances, care, energy, reliable services and security','part-1','15',456),
        ('03 / THE POWER TO SHAPE YOUR OWN LIFE','Your rights, useful technology and government you can challenge','part-2','26',558),
    ]
    for head,body,key,num,top in rows:
        label(head,M,top,TEAL,CW-62)
        para(body,M,top+23,CW-68,10.1,14.5,max_h=35)
        para(num,W-M-44,top+14,44,24,30,BLUE,True,align=2)
        line(M,top+80,W-M,top+80)
        internal_link(key,M,top,CW,78)
    para('Start with the promise.\nStay for the detail.',M,699,CW,18,24,NAVY,True)
    end('Your next chapter')

def introduction():
    start('next-chapter','Robert Bluespan / Party Co-leader')
    title('ROBERT BLUESPAN / PARTY CO-LEADER','You should be able\nto make plans.')
    body=[
        'A home of your own. A better job. A business you have talked about for years. Time to care for someone you love. These are ordinary ambitions. In a country as capable as ours, they should be within reach.',
        'Capricans gave Moderate Reform another term in 2064. Today, gross public debt stands at 68% of GDP. We have a stronger foundation. We also have a responsibility to people who are still waiting for that progress to reach their own lives.',
        'That is the task of the next term. Build homes where people want to live. Make effort pay. Bring care within reach. Give businesses the confidence to invest and communities the connections to prosper.',
        'For an island at the west end of Columbia facing the cross road of the Twin Strait, ambition belongs close to home and far beyond our shores. A farm that reaches a new market, a technician who learns a better trade and a firm that sells to Columbia all contribute to the same national success.',
        'Our method is clear. Let people build and compete. Give public services the means to do their job. Keep power answerable to the citizen. Pay honestly for the promises we make.',
        'We are asking for your support to turn that method into a country where more people can look ahead and make a plan of their own.'
    ]
    y=209
    for s in body:
        y=para(s,M,y,CW,10.6,15.8,max_h=84)+16
    line(M,y+2,M+69,y+2,GREEN,3)
    para('Robert Bluespan',M,y+21,CW,16,21,NAVY,True)
    para('Party Co-leader',M,y+48,CW,9.6,13,GRAY)
    end('Freedom to Build. Confidence in Tomorrow.')

def record():
    start('record','The record and the next task',True)
    label('IN GOVERNMENT / 2064 TO 2068',M,43,GREEN)
    para('We have a stronger\nstarting point.',M,83,CW,34,40,white,True,max_h=86)
    para('68%',M,200,290,97,105,GREEN,True)
    label('GROSS PUBLIC DEBT / GDP IN 2068',M,322,LIGHT)
    para('Now the gains must reach\neveryday life.',M,373,CW,26,32,white,True,max_h=67)
    para('A stronger balance sheet gives us room to face the next challenge. People also need a home they can afford, a route into work and care they can reach. That is how the next term will be judged.',M,465,CW,11,16,white,max_h=67)
    for x,head,body in [
        (M,'Keep the foundations','Protect the earnings credit, open trade, universal care and constitutional freedoms. Finance permanent promises from permanent revenue.'),
        (M+CW/2+13,'Make the next move','Open land for homes. Connect skills to jobs. Expand access to care. Keep reducing debt toward our proposed 65% goal by 2072.')
    ]:
        line(x,573,x+CW/2-13,573,HexColor('#355566'))
        para(head,x,590,CW/2-13,12.6,17,GREEN,True)
        para(body,x,622,CW/2-13,10,14.8,LIGHT,max_h=106)
    end('A record to answer for. A reason to keep going.',True)

def flagships():
    start('flagships','Three promises to remember')
    title('THE PROMISES TO REMEMBER','Your next chapter\nstarts with a chance.',
          'More homes. A route into work. Help when you need it. These are practical commitments, backed by the policies in this manifesto.')
    cards=[
        ('50%','MORE HOMES','Your own front door.',
         'Raise annual housing completions by 50% by 2072 against the verified 2068 total. Release land with services, set planning deadlines and build near jobs and transport.','housing','THE HOUSING PLAN / 07'),
        ('90','DAYS ONCE ELIGIBLE','A route into working life.',
         'By 2070, anyone under 25 who has spent four months outside work or education will receive a suitable job, apprenticeship or training offer within a further 90 days.','work','THE WORK PLAN / 10'),
        ('14','DAYS TO FIRST CONTACT','Someone there to help.',
         'By 2070, urgent nonemergency mental health referrals for under 25s will receive first clinical contact within 14 days. Emergency cases need immediate assessment. Treatment waits will also be reported.','health','THE CARE PLAN / 19'),
    ]
    for i,(num,unit,head,body,key,route) in enumerate(cards):
        top=239+i*181
        box(M,top,CW,163,PALE if i!=1 else CREAM)
        para(num,M+15,top+12,104,39,45,BLUE if i==0 else TEAL,True)
        label(unit,M+15,top+71,TEAL,102,6.3)
        line(M+132,top+17,M+132,top+144,RULE)
        para(head,M+149,top+15,CW-166,16,21,NAVY,True,max_h=44)
        para(body,M+149,top+47,CW-166,9.4,13.4,max_h=82)
        label(route,M+149,top+138,TEAL,CW-166,6.5)
        internal_link(key,M,top,CW,163)
    end('Three promises. The detail to make them count.')

def alliance():
    start('alliance','Three parties / One common program')
    title('THREE PARTIES / ONE COMMON PROGRAM','One promise.\nRooted in your region.',
          "Moderate Reform, the People's Party and Avenir Caprica bring different traditions to one alliance. We share a belief in enterprise, accountable government and a future worth building here.")
    rows=[
        ('MODERATE REFORM PARTY','Alistair Foulke-McKeon','AMBROSIA','alistair.png',
         "Clean water, local food processing and better routes to market connect Ambrosia's farms to the national growth plan. More value should stay in the communities that produce it.",'https://manualalan.github.io/mr2068/team/#alistair'),
        ("PEOPLE'S PARTY",'Pepe Marti Rutte','CAMBRIA','pepe.png',
         "Practical training, room for local businesses and homes close to jobs put the freedom to get ahead within reach. Cambria's next good idea should have somewhere to grow.",'https://manualalan.github.io/mr2068/team/#pepe'),
        ('AVENIR CAPRICA','Mathieu Jeon','PLEUCADEUC','mathieu.jpg',
         'The southern rail corridor, homes near stations and respect for Gallic community life connect national investment to regional opportunity. Staying close to your roots should leave your future open.','https://manualalan.github.io/mr2068/team/#mathieu'),
    ]
    for i,(party,name,region,im,body,url) in enumerate(rows):
        top=238+i*152
        photo(im,M,top,96,122,focus=(.5,.15 if im=='alistair.png' else .25),
              portrait=True,zoom=1.55 if im=='alistair.png' else 1)
        x=M+114;ww=CW-114
        label(party+' / '+region,x,top+1,TEAL,ww,6.8)
        para(name,x,top+24,ww,14,18,NAVY,True,max_h=38)
        para(body,x,top+57,ww,9.5,13.6,max_h=64)
        c.linkURL(url,(M,H-top-122,W-M,H-top),relative=0,thickness=0)
        line(M,top+137,W-M,top+137)
    para('One national platform. Local plans that explain how it works where you live.',M,711,CW,15,20,NAVY,True,max_h=43)
    para('Our candidates stand on the same national commitments. Regional proposals connect to the same funding rules and protect the same constitutional freedoms.',M,758,CW,8.3,11.5,GRAY,max_h=26)
    end('Different traditions. Shared commitments.')

def divider(part):
    start(f'part-{part}',PROMISES[part],True)
    label(f'OUR PROMISE / 0{part+1}',M,44,GREEN)
    heads=['The freedom\nto get ahead.','The confidence\nto plan your\nfuture.','The power\nto shape your\nown life.']
    para(heads[part],M,107,CW,39,44,white,True,max_h=137)
    descriptions=[
        'The keys. The first customer. The chance to learn something new. Ambition needs room to grow.',
        'The appointment. The reliable train. The light left on for someone coming home. Confidence is built in ordinary moments.',
        'Your privacy. Your voice. Your choice. A capable country begins with citizens who can stand up for themselves.'
    ]
    para(descriptions[part],M,278,CW,13,19,LIGHT,max_h=63)
    photo(['homes.jpg','wind.jpg','civic-new.jpg'][part],0,384,W,364,focus=(.5,.50))
    box(0,745,W,97,NAVY)
    label(['SPACE TO BUILD','FOUNDATIONS YOU CAN TRUST','POWER THAT ANSWERS TO YOU'][part],M,766,GREEN)
    end(PROMISES[part],True)

POLICY_PHOTOS={
    'housing':('housing-policy.jpg',(.50,.48),108),
    'tax':('tax-policy.jpg',(.50,.50),94),
    'enterprise':('enterprise-policy.jpg',(.50,.50),108),
    'work':('work-policy.jpg',(.52,.45),94),
    'schools':('schools-new.jpg',(.50,.40),108),
    'science':('research-new.jpg',(.50,.50),94),
    'gateway':('gateway-policy.jpg',(.50,.50),108),
    'regions':('regions-policy.jpg',(.50,.55),94),
    'fiscal-rules':('fiscal-policy.jpg',(.50,.55),108),
    'funding':('funding-policy.jpg',(.50,.50),94),
    'health':('health-new.jpg',(.50,.45),108),
    'families':('families-policy.jpg',(.50,.48),94),
    'energy':('energy-policy.jpg',(.50,.54),108),
    'networks':('networks-policy.jpg',(.50,.48),94),
    'justice':('justice-policy.jpg',(.50,.42),108),
    'defense':('defense-policy.jpg',(.50,.48),94),
    'resilience':('resilience-policy.jpg',(.50,.50),108),
    'rights':('rights-policy.jpg',(.50,.48),94),
    'digital':('digital-policy.jpg',(.50,.48),108),
    'government':('government-policy.jpg',(.50,.48),94),
    'foreign':('foreign-policy.jpg',(.50,.46),108),
    'trade-migration':('trade-policy.jpg',(.50,.50),94),
}

def policy_page(p):
    start(p['id'],p['title'])
    title(f"0{p['part']+1} / {PROMISES[p['part']]}",p['title'],p['intro'],size=28)
    gap=25;col=(CW-gap)/2
    im,focus,image_h=POLICY_PHOTOS[p['id']]
    photo(im,M,222,CW,image_h,focus=focus)
    c.setStrokeColor(ACCENTS[p['part']]);c.setLineWidth(1.2)
    c.rect(M,H-222-image_h,CW,image_h,fill=0,stroke=1)
    top0=222+image_h+14
    stride=(786-top0)/3
    fs,leading=9.15,12.7
    for i,(head,body) in enumerate(p['entries']):
        x=M+(i%2)*(col+gap);top=top0+(i//2)*stride
        box(x,top,19,2.5,ACCENTS[p['part']])
        y=para(head,x,top+10,col,10.5,13.4,NAVY,True,max_h=28)
        para(body,x,y+6,col,fs,leading,max_h=stride-(y-top)-5)
    end(PROMISES[p['part']])

def fiscal_chart():
    start('debt','Pay for the future honestly')
    title('THE FINANCIAL FOUNDATION','Pay for the future\nhonestly.',
          'Debt has fallen to 68% of GDP. Our proposed goal is 65% by 2072 under normal economic conditions. A stronger position helps protect the services people rely on.')
    box(M,242,CW,294,PALE)
    label('GROSS PUBLIC DEBT AS A SHARE OF GDP',M+17,258,TEAL)
    left=M+60;top=305;height=159;width=CW-105
    for tick in range(0,81,20):
        yy=top+height-height*tick/80
        line(left,yy,left+width,yy,RULE,.5)
        para(f'{tick}%',M+16,yy-5,32,7.5,10,GRAY,align=2)
    for i,(v,year,note) in enumerate([(68,'2068','CURRENT RESULT'),(65,'2072','PROPOSED GOAL')]):
        x=left+42+i*174;h=height*v/80
        if i==0:box(x,top+height-h,89,h,BLUE)
        else:
            c.saveState();c.setDash(4,3);c.setStrokeColor(TEAL);c.setLineWidth(1.5)
            c.setFillColor(HexColor('#D9EEE6'));c.rect(x,H-top-height,89,h,fill=1,stroke=1);c.restoreState()
        para(f'{v}%',x-5,top+height-h-31,99,20,24,NAVY,True,align=1)
        para(year,x,476,89,10.5,14,NAVY,True,align=1)
        para(note,x-24,500,138,6.8,9,GRAY,True,align=1)
    para('The 2072 figure is a policy goal. It is not an independently forecast result.',M,548,CW,8.3,12,GRAY)
    for i,(head,body) in enumerate([
        ('Lasting promises need lasting revenue.','Permanent services must be funded by recurring revenue or verified savings. A temporary windfall cannot pay a permanent wage bill.'),
        ('Investment must earn its place.','Test major projects before committing money. Include running costs, maintenance and realistic risk. Protect sovereign wealth principal.'),
        ('People should see the assumptions.','Publish costs and stress tests. If the path slips, explain the correction within 30 days. An emergency departure needs parliamentary authority.'),
    ]):
        y=587+i*66
        para(head,M,y,CW,11.4,15,NAVY,True)
        para(body,M,y+23,CW,9.4,13.2,max_h=30)
    end('68% today. A proposed 65% by 2072.')

def closing():
    start('closing','Your next chapter / Vote LCA',True)
    photo('field.jpg',0,0,W,310,focus=(.5,.5))
    box(0,309,W,H-309,NAVY)
    label('THE CHOICE IN 2068',M,345,GREEN)
    para('Make room\nfor your\nnext chapter.',M,385,CW,42,47,white,True,max_h=147)
    para('A home. A livelihood. A country\nwhere you can make plans.',M,557,CW,17,24,LIGHT,max_h=52)
    para('VOTE LCA',M,640,CW-80,33,40,GREEN,True)
    para(SLOGAN,M,700,CW,13.5,19,white,True,max_h=42)
    logo(W-M-54,637,54)
    para('Meet the team. Explore the campaign.',M,756,CW,9.3,13,GREEN,True)
    c.linkURL('https://manualalan.github.io/mr2068/',(M,H-773,W-M,H-751),relative=0,thickness=0)
    end('Liberal-Conservative Alliance',True)

cover();contents();introduction();record();flagships()
for part in range(3):
    divider(part)
    if part==1:fiscal_chart()
    for p in PAGES:
        if p['part']==part:policy_page(p)
closing()
c.save()
(AUDIT/'layout.json').write_text(json.dumps(layout_log,indent=2),encoding='utf-8')
(AUDIT/'photo-usage.json').write_text(json.dumps(photo_log,indent=2),encoding='utf-8')
(AUDIT/'page-map.json').write_text(json.dumps(page_map,indent=2),encoding='utf-8')
print(f'Created {OUT}')
print(f'{len(page_map)} pages; {len(layout_log)} measured text blocks; {len(photo_log)} unique photographs')
