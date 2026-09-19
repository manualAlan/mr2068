export type BeliefStory = {
  slug: string;
  label: string;
  headline: string[];
  standfirst: string;
  opening: string;
  paragraphs: string[];
  pullQuote: string;
  principles: { title: string; text: string }[];
  detailTitle: string;
  details: { title: string; text: string }[];
  delivery: { firstStep: string; publicTest: string; fundingRule: string };
  related: string[];
  closing: string;
};

export const beliefStories: Record<string, BeliefStory> = {
  infrastructure: {
    slug: "infrastructure",
    label: "Infrastructure & energy",
    headline: ["A country", "that works."],
    standfirst: "Power you can rely on. A journey you can plan. Water and connections that keep life moving.",
    opening: "We believe the freedom to build needs foundations that hold.",
    paragraphs: [
      "A home is not ready without water and power. A job is not within reach without a dependable journey. A business cannot grow on a promise of a connection someday. Infrastructure turns an opportunity on paper into something people can actually use.",
      "Our approach is practical: maintain what works, build where the need is proven and publish the whole bill. Government should set dependable rules, buy openly and name who is responsible. Private investment should compete to meet clear standards, with public obligations kept in plain sight.",
    ],
    pullQuote: "The next connection should come with a date.",
    principles: [
      { title: "Maintain before it fails", text: "A repaired pipe or bridge may never make a grand opening. It still matters. Asset condition, repair backlogs and maintenance funding belong alongside new construction in every serious plan." },
      { title: "Buy reliability", text: "Cheap electricity is little use when it is unavailable. Compare energy options on their full cost, dependable capacity and verified emissions. Let technologies compete against the same demanding test." },
      { title: "Make the plan public", text: "People should know what will be built, when it will work and who must explain a delay. Show operating and financing costs alongside construction, including the obligations passed to future taxpayers and bill payers." },
    ],
    detailTitle: "Connections with commitments",
    details: [
      { title: "Reliable power, honest bills", text: "Let storage, demand response, geothermal, advanced nuclear and other dependable clean options compete on cost, reliability and emissions. Publish guaranteed capacity, backup costs and consumer obligations. Keep the binding emissions cap and return at least half of actual auction receipts to households equally and transparently." },
      { title: "Grid connections with dates", text: "Prioritize ready projects over speculative reservations. Publish connection dates and charges for homes, ports and industry, with independent appeals and cost checks. Before buying small modular reactors, require independent regulation and funded waste and decommissioning plans. Compare alternatives over their full working lives." },
      { title: "A joined-up journey", text: "Agree an automatic weekly fare cap across participating rail, bus and ferry networks, with cash or assisted options and revenue sharing settled first. Upgrade the southern rail corridor in independently costed stages, subject to funding and passenger demand. Connect stations to local services and publish operating subsidies." },
      { title: "Clean water and dependable digital service", text: "Publish water quality tests, leakage and repair schedules for every service area. Protect a public minimum for maintenance in transport and water capital budgets. Tender digital support competitively for underserved areas with open wholesale access, actual reliability reports and backup connections for critical services." },
      { title: "Every major project must earn its place", text: "Projects above 1 billion aurums need an options appraisal, reference design, cost and benefit ranges, a named authority and funded maintenance. Independent reviews release money in stages. Publish contract changes, overruns and guarantees, with proportionate checks for smaller projects too." },
    ],
    delivery: {
      firstStep: "By 2069, publish the national investment pipeline, energy auction terms and grid connection dates. Agree regional rollout milestones for transport and water.",
      publicTest: "Quarterly reports on bills, reliability, emissions and dividends. By 2070, shared fare agreements and public reports on network condition.",
      fundingRule: "Independently appraise capital borrowing and disclose lifetime costs. Keep maintenance funded; do not use variable emissions receipts for permanent payroll.",
    },
    related: ["housing", "economy", "education"],
    closing: "A stronger country starts with the things we count on every day.",
  },
  education: {
    slug: "education",
    label: "Education & skills",
    headline: ["Strong beginnings.", "Open futures."],
    standfirst: "Confident readers. Respected trades. Room to discover. An education that opens the next door.",
    opening: "We believe talent deserves a clear route forward.",
    paragraphs: [
      "Good education gives people more choices. The ability to read confidently, work with numbers and question an argument belongs at the heart of it. So does the chance to master a trade, pursue a discovery or learn something new when work changes.",
      "We want clear standards and professional freedom together. Teachers need time to teach. Colleges need equipment and real placements. Universities need independence. Families and learners should be able to see what a course offers, what it costs and where it has led, without mistaking a glossy prospectus for a guarantee.",
    ],
    pullQuote: "A practical skill is a serious ambition.",
    principles: [
      { title: "Get the foundations right", text: "Reading, writing and mathematics make later learning possible. Give them protected time, proven materials and regular checks that help teachers act early. Science, civic knowledge and critical thinking belong beside them." },
      { title: "Respect different routes", text: "A technical qualification, an apprenticeship and a university degree should each stand for demanding work. Make the choices understandable and qualifications portable, so one decision does not close every other door." },
      { title: "Show the learning", text: "Report progress, completion and next destinations with context and privacy safeguards. Use evidence to improve teaching and funding. A crude league table cannot explain every school's work or every student's path." },
    ],
    detailTitle: "What opportunity needs",
    details: [
      { title: "Help early. Teach the essentials.", text: "Offer a language and development check two years before school, followed by timely support. Protect daily reading, writing and mathematics with clear national standards and room for teacher judgment. Use regular checks to guide help, not simply record that a learner has fallen behind." },
      { title: "Give teachers time and classrooms focus", text: "Cut duplicate reporting, provide quality lesson resources and create senior careers for expert classroom teachers. Set clear behavior expectations and keep phones out of instructional time, with health and disability exceptions. Give every additional needs support plan one coordinator and a legal deadline." },
      { title: "Technical training connected to real work", text: "Agree regional college programs with employers in construction, maritime engineering, health, energy, manufacturing and cybersecurity. Fund equipment and placements through open agreements. Direct genuinely unused training levy balances into accredited apprenticeships and portable accounts, verifying training and completion rather than relabeling existing jobs." },
      { title: "Know the course before you commit", text: "Publish teaching hours, completion, employment, earnings ranges and likely debt before enrollment. Explain academic, technical and apprenticeship routes on a consistent basis. Recognize prior learning, and report next destinations with context: a past earnings figure informs a choice but cannot promise a salary." },
      { title: "Keep discovery free, make invention useful", text: "Protect university autonomy, academic freedom and independent peer review. Introduce standard research licenses and testing awards with fixed end dates. Publish ownership and returns from publicly supported discoveries. Evaluate additional investment and results before expanding a scheme." },
    ],
    delivery: {
      firstStep: "By 2069, establish core standards and legal deadlines for support plans. By 2070, regional technical agreements and standard research licenses.",
      publicTest: "Annual school and destination reports, course completion and employment data, and published results from research commercialization.",
      fundingRule: "Verify unused levy balances and existing obligations before redirecting funds. Publish equipment and placement agreements; evaluate awards before expansion.",
    },
    related: ["economy", "healthcare", "infrastructure"],
    closing: "More than a qualification. More choices for the life ahead.",
  },
  housing: {
    slug: "housing",
    label: "Housing",
    headline: ["A place", "to call yours."],
    standfirst: "A home gives you somewhere to begin. Finding one should leave room for the rest of your life.",
    opening: "We believe a place of your own should be an ordinary ambition in Caprica.",
    paragraphs: [
      "A home changes what you can plan. You can take a job, start a family, settle near friends or choose a quieter life. When every spare aurum goes on keeping a roof overhead, those choices shrink. Too many Capricans are being asked to wait for their own lives to begin.",
      "We want builders to build and communities to grow with confidence. Clear rules, working infrastructure and more homes will give people real choice. Ownership should be within reach. Renting should feel secure. Both deserve a serious place in the country we are building.",
    ],
    pullQuote: "A home should make your world bigger.",
    principles: [
      {
        title: "Make room",
        text: "A growing neighborhood can welcome new people and keep the things residents love. Good streets, schools and transport belong in the plan from the beginning. Saying yes to homes means taking the whole place seriously.",
      },
      {
        title: "Respect the person renting",
        text: "A rental is somebody's home. People deserve safe rooms, repairs that happen and a contract they can plan around. Clear rights and fair dispute resolution help responsible tenants and landlords get on with their lives.",
      },
      {
        title: "Open the door to ownership",
        text: "Saving for a deposit should lead somewhere. More supply must come first, with carefully limited help for working households buying additional new homes. Public support should make the market more accessible instead of pushing prices higher.",
      },
    ],
    detailTitle: "What gets built next",
    details: [
      {
        title: "50% more homes by 2072",
        text: "Increase annual completions by 50% against the independently verified 2068 total. Allow quality homes within 800 meters of rapid transit and in town centers, including homes above shops. Regional agreements will match new homes with water, power, schools and transport. Publish monthly starts, completions and costs.",
      },
      {
        title: "A decision within 120 days",
        text: "Complete applications in growth zones should receive a decision within 120 days. Compliant infill using approved designs gets 60 days. Safety, flood and habitat rules still apply. A missed deadline brings a fee refund and an independent appeal, so silence cannot hold an application indefinitely.",
      },
      {
        title: "A rental you can settle into",
        text: "Introduce lasting contracts, portable deposits and enforceable standards for warmth, safety and repairs. A specialist tribunal will aim to resolve disputes within 30 days. Publish local rents and vacancies so communities can see where more homes are needed and whether the shortage is easing.",
      },
      {
        title: "Ownership help that adds homes",
        text: "Offer portable housing savings accounts and a capped shared ownership scheme for eligible working households buying additional new homes. Publish income limits, resale terms and subsidy costs before allocating places. Support must add supply and pass independent fiscal checks, not bid up the price of homes already in short supply.",
      },
      {
        title: "Services ready when the keys arrive",
        text: "Agree ten years of local water, power, school and transport capacity through regional growth compacts. A revolving Infrastructure Capacity Fund will advance independently appraised investment, repaid through disclosed development levies and gains in land value. Include maintenance and test the plan against lower land receipts before borrowing.",
      },
    ],
    delivery: {
      firstStep: "Verify the 2068 housing total within 100 days. Put growth compacts and planning clocks in place by 2069.",
      publicTest: "Annual completions 50% above 2068 by 2072. Publish monthly construction figures and local rent and vacancy data.",
      fundingRule: "Cost ownership support before allocating places. Match infrastructure advances to a tested repayment plan, with no receipt counted twice.",
    },
    related: ["infrastructure", "economy", "civil-liberties"],
    closing: "The next chapter of your life needs somewhere to happen.",
  },
  healthcare: {
    slug: "healthcare",
    label: "Healthcare",
    headline: ["Someone", "should answer."],
    standfirst: "When someone you love is ill, knowing what happens next should be the easy part.",
    opening: "We believe everyone deserves care they can reach and people they can trust.",
    paragraphs: [
      "Illness makes the world smaller. Work is rearranged, plans are canceled and a family waits for a call. A decent health service understands that time matters. People need an appointment they can book, an explanation they can understand and a person who knows what comes next.",
      "Universal access is a responsibility we accept. We also believe patients deserve choice and clinicians deserve room to use their judgment. Every qualified service that can provide safe, effective care has something to offer. We will judge the system by what happens to the person who needs it.",
    ],
    pullQuote: "Care should leave you feeling less alone.",
    principles: [
      {
        title: "Your need comes first",
        text: "The care you receive should follow your clinical need. Income, address and confidence in navigating the system should not decide whether you get help. Universal coverage must mean a practical route to treatment for everyone.",
      },
      {
        title: "Trust the people doing the work",
        text: "Nurses, pharmacists and doctors should be able to use the skills they trained for. Clear standards, proper staffing and less repeated administration give them more time to listen, make decisions and look after their patients.",
      },
      {
        title: "Give patients a say",
        text: "You deserve to understand your choices, see your own record and know who is responsible for your care. Services should listen when something goes wrong, explain it honestly and make the next step easier to find.",
      },
    ],
    detailTitle: "Making care easier to reach",
    details: [
      {
        title: "An appointment within reach",
        text: "Set same-day access for urgent primary care and appointments within seven days for routine needs, phased with verified staffing. Expand safe roles for nurses and pharmacists. District waiting figures must include people unable to book, so the full demand for care remains visible.",
      },
      {
        title: "A way through the waiting list",
        text: "When a service misses a clinically defined maximum elective wait, its commissioner must arrange suitable alternative care at no extra charge. Confirm capacity before the guarantee begins. Public and independent providers will meet the same quality rules, including safeguards for people whose treatment is complex.",
      },
      {
        title: "Mental health without the maze",
        text: "Provide one assessment pathway and a named navigator. By 2070, urgent nonemergency referrals for people under 25 should receive first clinical contact within 14 days. Emergencies need immediate assessment. Publish subsequent treatment waits too, because a first conversation must lead to the right care.",
      },
      {
        title: "One standard, whoever provides the care",
        text: "Publish common measures of safety, infections, mortality and patient experience across public and independent services. Give an independent inspector powers for unannounced visits and enforceable improvements. Contracts must reward quality and continuity, with safeguards against avoiding people whose care is complex or costly.",
      },
      {
        title: "Fund the service before promising the saving",
        text: "Use budgets covering several years to build primary, community and elective capacity. Publish staffing and referral agreements before activating guarantees. Keep existing provision until replacements work. Prevention can improve lives and future costs, but hoped-for savings cannot pay today's wages.",
      },
    ],
    delivery: {
      firstStep: "Publish funded district access plans in 2069, with staffing and referral capacity verified before guarantees begin.",
      publicTest: "Report actual appointment and treatment waits, including people unable to book. Publish safety and patient experience on the same basis for every provider.",
      fundingRule: "Show costs over ten years before budget votes. Commission capacity within a multiyear budget and count savings only when verified.",
    },
    related: ["education", "infrastructure", "civil-liberties"],
    closing: "A promise of care should be one you can rely on.",
  },
  "civil-liberties": {
    slug: "civil-liberties",
    label: "Civil liberties",
    headline: ["Your life.", "Your business."],
    standfirst: "The freedom to speak, believe, disagree and live privately belongs to every Caprican.",
    opening: "We believe freedom matters most when somebody in power would rather you kept quiet.",
    paragraphs: [
      "A free country has room for people who see life differently. You should be able to practice a faith, reject religion, make art, organize peacefully and criticize your government. Nobody should have to earn those freedoms by being popular, agreeable or useful to the people in charge.",
      "We want public institutions capable of protecting us and willing to answer for their actions. Courts must be independent. The law must apply equally. Police and intelligence services need clear powers, real limits and scrutiny that works. Our confidence in the state begins with knowing how to challenge it.",
    ],
    pullQuote: "Power should always have to explain itself.",
    principles: [
      {
        title: "Leave room for disagreement",
        text: "Living together does not require us to think alike. Political, academic, artistic and religious expression deserve protection. Precise laws against threats and harassment must leave people free to question institutions, offend conventional wisdom and change their minds.",
      },
      {
        title: "Keep private life private",
        text: "Your messages, records and beliefs are part of your life. Anyone collecting personal information needs a lawful reason and a clear limit. Convenience for an institution is a poor excuse for permanent access to everyone else.",
      },
      {
        title: "One law for everyone",
        text: "Rights belong to individuals, whatever their identity or connections. Ministers, agencies and powerful businesses should face meaningful consequences when they break the law. An ordinary citizen must have a usable way to challenge an unlawful decision.",
      },
    ],
    detailTitle: "Where we draw the line",
    details: [
      {
        title: "Warrants before intrusion",
        text: "Preserve the Nuremberg Act framework, requiring judicial approval for intrusive surveillance and rapid review of genuine emergency use. Keep an audit trail and independent oversight. Journalism, peaceful association and political belief must never become grounds for surveillance merely because they inconvenience people in power.",
      },
      {
        title: "Control over your information",
        text: "Require proportionate data collection, clear retention periods and rights to access, correct and delete information when keeping it is no longer justified. Reject general encryption backdoors. An independent commissioner will investigate misuse and order remedies against public agencies and private operators alike.",
      },
      {
        title: "A right you can use",
        text: "Keep legal assistance, complaints and appeals accessible. Require clear reasons for adverse decisions and meaningful human review when an automated system affects someone's life. Give exceptional emergency powers expiration dates, parliamentary scrutiny and continued court oversight. Government must make a public case whenever it seeks an extension.",
      },
      {
        title: "Equal citizenship. Secure property.",
        text: "Defend equal treatment, existing marriage rights and protection from unlawful discrimination. Public institutions must serve people without arbitrary preferences or penalties for lawful identity or belief. Protect lawful ownership through independent courts, evidence and appeal. Owning valuable property is not evidence of a crime.",
      },
      {
        title: "Public money, open books",
        text: "Publish tenders, beneficial owners, selection reasons, contract changes and results in a searchable register. Keep corruption investigations independent of ministers and protect lawful whistleblowing. Privacy and security exceptions must be narrow and audited. The same standards apply to agencies, state enterprises and the military.",
      },
    ],
    delivery: {
      firstStep: "Complete a first-year rights and oversight review. Introduce public service deadlines and open spending registers by 2069.",
      publicTest: "Publish complaint resolution times, compliance with remedies and quarterly delivery reports, with independent audit and correction plans.",
      fundingRule: "Disclose procurement costs and contract changes. Keep watchdogs independent and subject public spending to parliamentary scrutiny.",
    },
    related: ["housing", "economy", "defense"],
    closing: "A free country belongs to the people who live in it.",
  },
  "foreign-policy": {
    slug: "foreign-policy",
    label: "Foreign policy",
    headline: ["Open eyes.", "Open horizons."],
    standfirst: "An island with confidence in itself has every reason to engage with the world.",
    opening: "We believe a small country can be a dependable friend and an important place.",
    paragraphs: [
      "Caprica faces the Twin Strait, with Columbia behind us and Albeuman to the west. Our position gives us a chance to connect people, ideas and markets. Trade is part of ordinary life here. The partnerships we build abroad can open a door for a business, a researcher or someone beginning a career.",
      "The Bluespan Doctrine starts with judgment. We will defend our people, honor clear commitments and work patiently for peace. We believe in liberty and understand that other societies have their own histories. Diplomacy deserves persistence. Military force requires lawful authority, an achievable purpose and an honest account of the cost.",
    ],
    pullQuote: "Reliability is a small country's strength.",
    principles: [
      {
        title: "Be useful to our friends",
        text: "Partnership lasts when each country contributes something others value. Caprica can offer secure ports, trusted institutions, scientific talent and steady judgment. A country people want to work with has more ways to protect its own future.",
      },
      {
        title: "Keep the conversation open",
        text: "Diplomacy often means speaking to governments we disagree with. Agreements need verification and commitments need limits. Patient contact can reduce the danger of a mistake while leaving us free to defend our principles and our interests.",
      },
      {
        title: "Know the purpose of force",
        text: "People asked to serve deserve a mission they can understand. Our forces will defend Caprica and meet clear treaty obligations. We reject wars with no defined end that seek to impose a political system on another country.",
      },
    ],
    detailTitle: "Our commitments beyond the shore",
    details: [
      {
        title: "A Columbian Union that works",
        text: "Cooperate through the CU on maritime security, disaster response, trade and essential infrastructure. Pursue mutual recognition that lets professionals and small businesses use the shared market. Keep national parliamentary accountability and review shared functions so cooperation stays focused on work partners can do better together.",
      },
      {
        title: "Turn dialogue into security",
        text: "Build on the Kaoqing Communique and normalization with OURS. Support Kerevan's restored territorial integrity and deny Oshmit access to weapons supply chains. Establish a Twin Strait crisis hotline and maritime incident procedures, backed by verification and credible deterrence, to stop a dangerous encounter becoming a wider crisis.",
      },
      {
        title: "Keep every commitment answerable",
        text: "Seek parliamentary approval for deployments beyond immediate defense, with prompt review of emergency action. State lawful authority, achievable aims and an exit strategy. An annual foreign policy statement will report diplomatic objectives, treaty readiness and market access, showing how commitments abroad serve the country at home.",
      },
    ],
    delivery: {
      firstStep: "Pursue a Twin Strait crisis hotline and practical maritime incident procedures, alongside verified agreements and credible deterrence.",
      publicTest: "An annual foreign policy statement will set out diplomatic objectives, treaty readiness and market access, with parliamentary scrutiny.",
      fundingRule: "Keep national accountability for shared commitments. State the authority, purpose and costs of deployments, with prompt review of emergencies.",
    },
    related: ["defense", "economy", "civil-liberties"],
    closing: "We want Caprica to be a country others can count on.",
  },
  defense: {
    slug: "defense",
    label: "Defense",
    headline: ["Ready when", "it matters."],
    standfirst: "Protecting our island means protecting the ordinary freedom to get on with life.",
    opening: "We believe the people who defend Caprica deserve a clear mission and the means to carry it out.",
    paragraphs: [
      "Most of what we value happens far from a military base. A ferry leaves on time. A cargo ship reaches port. A family goes to work without thinking about who protects the sea around them. Good defense helps make that ordinary confidence possible.",
      "Our forces should reflect our geography. A stronger navy and air force will protect the approaches to this island. A smaller, highly trained army will be ready to move where needed. Every new capability brings a responsibility to pay for its crews, training and maintenance, and to use the courage of those who serve with care.",
    ],
    pullQuote: "Readiness is a responsibility to the people who serve.",
    principles: [
      {
        title: "Start with the map",
        text: "Our food, exports and connections cross the sea. Protecting ports, shipping and airspace is central to our security. The country needs forces built for those responsibilities, with the reach to support partners when our commitments require it.",
      },
      {
        title: "Make every unit capable",
        text: "Equipment matters when trained people can use it together. Mobile units, secure communications and dependable support give commanders real options. Restructuring must protect training and personnel while being honest about the gaps that arise during change.",
      },
      {
        title: "Respect the decision to serve",
        text: "Military service asks a great deal of individuals and families. Political leaders owe them proper preparation, clear aims and lawful orders. Every operation should be judged with the seriousness its human consequences deserve, including the decision to end it.",
      },
    ],
    detailTitle: "What readiness requires",
    details: [
      {
        title: "Put sea and air first",
        text: "Prioritize submarines, escorts, maritime patrols, coastal defenses and resilient air defense. Strengthen surveillance, airborne early warning and strategic lift. Publish a funded capability plan in 2069 that includes crews, ammunition, bases and maintenance, so purchases produce forces that can actually deploy and remain in service.",
      },
      {
        title: "A smaller, mobile army",
        text: "Move from mass formations toward mobile brigades, coastal defense, engineering and special operations, ready to reinforce CU partners. Equip small units with drones and secure communications. Expand trained reserves and exercise mobilization, with Parliament told the transition costs and any temporary gaps in capability.",
      },
      {
        title: "Show what is ready",
        text: "Set out costs across ten years and publish quarterly readiness summaries, with confidential scrutiny where necessary. Open procurement to competition and strengthen domestic maintenance. By 2072, independently test forces against their assigned missions. Count savings from estate and administration only after they have actually been delivered.",
      },
    ],
    delivery: {
      firstStep: "Publish a costed sea and air capability plan in 2069, covering ten years of equipment, personnel, ammunition and maintenance.",
      publicTest: "Quarterly public readiness summaries, confidential scrutiny where needed and independent tests against assigned missions by 2072.",
      fundingRule: "Open procurement to competition. Reinvest verified estate and administrative savings only after transition costs have been covered.",
    },
    related: ["foreign-policy", "infrastructure", "civil-liberties"],
    closing: "Our strength should give Capricans confidence in the peace they live in.",
  },
  economy: {
    slug: "economy",
    label: "Economy",
    headline: ["Back the", "next good idea."],
    standfirst: "Let effort count, let businesses compete and give people the confidence to take a chance.",
    opening: "We believe prosperity grows when people have the freedom to try something of their own.",
    paragraphs: [
      "The next good employer might be a bakery opening a second shop, an engineer starting a workshop or a researcher finding a use for a discovery. Government cannot know every idea worth trying. It can keep the rules fair, make failure survivable and leave people room to make their own decisions.",
      "We are for enterprise and the competition that keeps it honest. A market works when a newcomer can challenge an established firm and customers can take their business elsewhere. Rewarding work, paying bills on time and managing public money carefully give that ambition a dependable foundation.",
    ],
    pullQuote: "A good idea should not need a political connection.",
    principles: [
      {
        title: "Let effort take you further",
        text: "An extra shift, a promotion or a return to work should bring a clear reward. People deserve to understand what they will keep and make their own choices about earning, saving and supporting the people they love.",
      },
      {
        title: "Keep the market open",
        text: "Being for business means making room for businesses that do not exist yet. Fair competition, easy switching and open public contracts give newcomers a chance. Political favor should never be worth more than a better product or service.",
      },
      {
        title: "Make promises we can afford",
        text: "Sound finances make it possible to plan and to respond when a crisis arrives. Permanent commitments need permanent funding. People should see the costs and the choices, including what government will change when a promise proves too expensive.",
      },
    ],
    detailTitle: "The practical part",
    details: [
      {
        title: "Keep the reward for work",
        text: "Retain the 20% earnings credit on the first 20,000 aurums of the reference income band, worth up to 4,000 aurums before other credits and indexation. Keep tax thresholds indexed to inflation and publish a calculator showing tax and benefit withdrawals together, so earning more has a clear meaning.",
      },
      {
        title: "Give small firms a fair start",
        text: "Process complete standard business registrations within one day, with a named contact and a staffed alternative. Require public bodies to pay undisputed small business invoices within 20 working days, with automatic interest for delays. Divide suitable contracts into smaller lots and publish who wins them and why.",
      },
      {
        title: "Investment and skills that travel together",
        text: "Allow immediate expensing of qualifying machinery, software and clean equipment. Keep the 40% research and human capital credit for audited additional spending, not relabeled routine costs. Use genuinely unused training levy balances for accredited apprenticeships and portable training accounts, with published completion and employment results.",
      },
      {
        title: "Make it easier to choose a better competitor",
        text: "Strengthen competition investigations and interim remedies, subject to appeal. Challenge state favoritism and exclusionary platforms. Clear charges, easy switching and portable data should let customers take their business elsewhere. Open public contracts to smaller firms and disclose owners, selection reasons and changes.",
      },
      {
        title: "Keep debt moving down",
        text: "Aim to reduce gross public debt from 68% of GDP in 2068 to 65% by 2072 under normal conditions, while retaining the separate net debt ceiling below 70%. Treasury must publish a correction plan within 30 days when a budget departs from the certified path. Parliament sets the pace, avoiding automatic cuts that deepen a downturn.",
      },
    ],
    delivery: {
      firstStep: "In the first budget, publish indexed tax schedules, the tax and benefit calculator and an independently tested fiscal path.",
      publicTest: "By 2069, standard incorporation in one day and public small-business invoices paid within 20 working days. Report competition and contract access annually.",
      fundingRule: "Pay for recurring commitments with recurring revenue or verified permanent savings. Publish ten-year costs; do not spend asset sales or hoped-for growth on permanent promises.",
    },
    related: ["housing", "education", "infrastructure"],
    closing: "The country's next success should have room to surprise us.",
  },
};
