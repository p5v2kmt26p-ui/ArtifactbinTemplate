import { useState, useEffect } from "react";

const SUBJECTS = [
  {
    id: "business", name: "Business", emoji: "💼", color: "#378ADD", bg: "#0c1e2e", priority: false,
    papers: [{ id: "bs_p1", label: "Paper 1", date: "2026-05-11", defaultTopic: "Investigating Small Businesses" }, { id: "bs_p2", label: "Paper 2", date: "2026-05-21", defaultTopic: "Investigating Large Businesses" }]
  },
  {
    id: "history", name: "History", emoji: "📜", color: "#E24B4A", bg: "#2a0e0e", priority: true,
    papers: [{ id: "hi_p1", label: "Paper 1", date: "2026-05-15", defaultTopic: "Depth Studies" }, { id: "hi_p2", label: "Paper 2", date: "2026-06-04", defaultTopic: "Investigation & Breadth Studies" }]
  },
  {
    id: "geography", name: "Geography", emoji: "🌍", color: "#1D9E75", bg: "#07201a", priority: false,
    papers: [{ id: "ge_p1", label: "Paper 1", date: "2026-05-13", defaultTopic: "Physical Geography" }, { id: "ge_p2", label: "Paper 2", date: "2026-06-03", defaultTopic: "Human Geography" }]
  },
  {
    id: "biology", name: "Biology", emoji: "🧬", color: "#7F77DD", bg: "#14123a", priority: false,
    papers: [{ id: "bi_p1", label: "Paper 1B", date: "2026-05-12", defaultTopic: "" }, { id: "bi_p2", label: "Paper 2B", date: "2026-06-08", defaultTopic: "" }]
  },
  {
    id: "chemistry", name: "Chemistry", emoji: "⚗️", color: "#EF9F27", bg: "#201500", priority: true,
    papers: [{ id: "ch_p1", label: "Paper 1C", date: "2026-05-18", defaultTopic: "" }, { id: "ch_p2", label: "Paper 2C", date: "2026-06-12", defaultTopic: "" }]
  },
  {
    id: "physics", name: "Physics", emoji: "⚡", color: "#5DCAA5", bg: "#082018", priority: false,
    papers: [{ id: "ph_p1", label: "Paper 1P", date: "2026-06-02", defaultTopic: "" }, { id: "ph_p2", label: "Paper 2P", date: "2026-06-15", defaultTopic: "" }]
  },
  {
    id: "maths", name: "Maths", emoji: "🔢", color: "#D4537E", bg: "#200a12", priority: false,
    papers: [{ id: "ma_p1", label: "Paper 1F", date: "2026-05-14", defaultTopic: "Foundation Paper 1" }, { id: "ma_p2", label: "Paper 2F", date: "2026-06-03", defaultTopic: "Foundation Paper 2" }]
  }
];

// ── OFFICIAL EDEXCEL IGCSE SPECIFICATION POINTS ──────────────────────────────
const SPEC = {
  business: {
    note: "Both papers cover ALL content — Paper 1 = small business context, Paper 2 = large business context.",
    p1: [
      "1.1.1 Business objectives: financial (survival, profit, sales, market share, financial security) and non-financial (social objectives, personal satisfaction, challenge, independence, control)",
      "1.1.2 Why aims and objectives change: market conditions, technology, performance, legislation, internal reasons",
      "1.2.1 Types of business ownership: sole trader, partnerships, limited companies (private and public), public corporations",
      "1.2.2 Risk, ownership and limited liability; public corporations — reasons for/against public ownership; ownership, control, sources of finance, use of profits, stakeholders",
      "1.2.3 Franchises, social enterprises and multinationals",
      "1.3.1 Primary, secondary and tertiary sectors — definitions and examples",
      "1.4.1 Location decisions: proximity to market/labour/materials/competitors; nature of business activity; e-commerce; legal controls and trade blocs",
      "1.5.1 Globalisation: concept, opportunities and threats for businesses",
      "1.5.2 Multinationals: importance and growth; benefits and drawbacks to host country/economy",
      "1.5.3 Exchange rate calculation",
      "1.5.4 Impact of exchange rate changes on international competitiveness, importers and exporters",
      "1.6.1 Government spending: public services, taxation, constraints on public spending",
      "1.6.2 How governments affect business: infrastructure, legislation, trade policy (trading blocs, tariffs)",
      "1.6.3 Effect of interest rates on businesses and consumer spending",
      "1.7.1 External factors: social, technological, environmental, political (STEP)",
      "1.8.1 Measuring business success: revenue, market share, customer satisfaction, profit, growth, owner/shareholder/employee satisfaction",
      "1.8.2 Reasons for business failure: cash flow problems, lack of competitiveness, failure to adapt",
    ],
    p2: [
      "2.1.1 Internal and external communication: methods including IT, benefits and limitations of each",
      "2.1.2 Barriers to communication: how they arise and how they can be removed",
      "2.2.1 Types of employment: full-time, part-time, job share, casual/seasonal/temporary",
      "2.2.2 Recruitment documents: job description, person specification, application form, CV/résumé",
      "2.2.3 Recruitment process: job advertisement, shortlisting, interviewing",
      "2.2.4 Legal controls: equal opportunities, minimum wage laws",
      "2.3.1 Training: induction, on-the-job, off-the-job; health and safety compliance; benefits and limitations",
      "2.4.1 Motivation in the workplace: attracting/retaining employees, productivity; Herzberg, Maslow and Taylor motivational theories",
      "2.4.2 Financial motivation: remuneration, bonus, commission, promotion, fringe benefits; Non-financial: job rotation, job enrichment, autonomy",
      "2.5.1 Organisational charts: hierarchical vs flat; centralised vs decentralised",
      "2.5.2 Roles and responsibilities: span of control, chain of command, delegation",
      "2.5.3 Functional areas: human resources, finance, marketing, production — roles of each",
      "3.1.1 Cash flow: importance, cash vs profit distinction, causes of cash flow problems",
      "3.1.2 Cash flow forecasts: construction, interpretation, how to improve cash flow",
      "3.2.1 Sources of finance: internal (retained profit, sale of assets) and external (loans, share capital, overdraft, trade credit, crowdfunding, venture capital, microfinance)",
      "3.3.1 Statement of Comprehensive Income (income statement): revenue, cost of sales, gross profit, other operating expenses, operating profit",
      "3.3.2 Statement of Financial Position (balance sheet): non-current assets, current assets, current liabilities, non-current liabilities, equity",
      "3.3.3 Financial ratios: gross profit margin, operating profit margin, markup, ROCE, current ratio, acid test ratio — formulae and interpretation",
      "4.1.1 Marketing: role and importance; market research — primary and secondary methods, quantitative vs qualitative data",
      "4.1.2 Market segmentation: demographic, geographic, psychographic, behavioural",
      "4.2.1 Product: product life cycle, Boston Matrix, unique selling point (USP), product portfolio",
      "4.2.2 Price: penetration, skimming, competitive, cost-plus, psychological pricing",
      "4.2.3 Promotion: advertising (above and below the line), sales promotions, public relations, direct marketing, digital/social media",
      "4.2.4 Place: channels of distribution — direct and indirect; e-commerce",
      "5.1.1 Production methods: job, batch and flow production — advantages and disadvantages",
      "5.1.2 Lean production: JIT (just-in-time), Kaizen (continuous improvement) — benefits and limitations",
      "5.2.1 Quality management: quality control, quality assurance, TQM (Total Quality Management)",
      "5.2.2 Customer service: importance, methods of ensuring, impact on business",
    ]
  },
  history: {
    note: "Paper 1: choose 2 depth studies. Paper 2: choose 1 investigation + 1 breadth study. Spec points below cover the most common options — confirm your school's chosen topics.",
    p1: [
      "Depth Study 3 (Germany 1918–45) — Topic 1: Weimar Republic 1918–23: origins, political problems, economic crisis, impact of WWI",
      "Depth Study 3 — Topic 2: Stresemann era 1923–29: recovery, Dawes Plan, Locarno, cultural changes, continued instability",
      "Depth Study 3 — Topic 3: Rise of the Nazis 1929–33: impact of Depression, appeal of Hitler, political manoeuvring to power",
      "Depth Study 3 — Topic 4: Nazi consolidation 1933–34: Reichstag Fire, Enabling Act, Night of the Long Knives, Hindenburg's death",
      "Depth Study 3 — Topic 5: Nazi Germany 1933–45: police state, propaganda, persecution of Jews, role of women, economy, resistance",
      "Depth Study 7 (Civil Rights USA 1945–74) — Topic 1: Position of African Americans 1945; legal segregation (Jim Crow); NAACP",
      "Depth Study 7 — Topic 2: Civil rights campaigns 1950s: Brown v Board of Education, Montgomery Bus Boycott, Little Rock",
      "Depth Study 7 — Topic 3: Civil rights movement 1960–65: sit-ins, Freedom Rides, March on Washington, Civil Rights Act 1964",
      "Depth Study 7 — Topic 4: Radical protest 1965–68: Black Power, Malcolm X, race riots, Kerner Commission",
      "Depth Study 7 — Topic 5: Nixon era 1968–74: Watergate, Vietnam's impact on civil rights movement",
      "Historical skills — P1: Describing key features and explaining their characteristics",
      "Historical skills — P1: Analysing and evaluating historical interpretations in context",
      "Historical skills — P1: Explaining, analysing and making judgements using second-order concepts (causation, consequence, change, continuity, significance)",
      "Historical skills — P1: Extended writing: structuring an analytical argument with evidence",
    ],
    p2: [
      "Investigation A1 (WWI 1905–18) — Topic 1: Origins of WWI: Morocco crises, Balkans, alliance systems, nationalism, militarism",
      "Investigation A1 — Topic 2: Outbreak of war 1914: Sarajevo assassination, July Crisis, Schlieffen Plan",
      "Investigation A1 — Topic 3: The war 1914–16: Western Front, trench warfare, new weapons, the Somme",
      "Investigation A1 — Topic 4: The wider war: naval war, Eastern Front, Gallipoli, role of USA",
      "Investigation A1 — Topic 5: End of war and peace settlement: armistice, Treaty of Versailles, impact",
      "Investigation A3 (USA 1918–41) — Topic 1: USA after WWI: economic boom, mass production, consumerism, Red Scare",
      "Investigation A3 — Topic 2: Intolerance in 1920s: Prohibition, organised crime, KKK, immigration restrictions",
      "Investigation A3 — Topic 3: Wall Street Crash and Depression: causes, Hoover's response, human impact",
      "Investigation A3 — Topic 4: New Deal: FDR's policies, Alphabet Agencies, opposition and impact",
      "Investigation A3 — Topic 5: End of Depression: impact of WWII on US economy and society",
      "Historical skills — P2 (source work): comprehending, interpreting and cross-referencing sources",
      "Historical skills — P2: Evaluating reliability, usefulness and purpose of sources in historical context",
      "Historical skills — P2: Analysing historical interpretations; identifying similarities and differences",
      "Breadth Study B2 (Changes in Medicine c1848–c1948): Germ theory, surgery, public health, hospitals, WWI impact, NHS",
      "Breadth Study B4 (China 1900–89): Fall of Qing, Republic, warlords, CCP vs GMD, Mao's China, Cultural Revolution",
    ]
  },
  geography: {
    note: "Paper 1: choose 2 of 3 topics (rivers, coasts, hazards) + 1 fieldwork question. Paper 2: choose 2 of 3 topics (economic activity, rural, urban) + 1 fieldwork + 1 global issues.",
    p1: [
      "1.1a Rivers — Hydrological cycle: characteristics, stores (atmosphere, cryosphere, surface water, groundwater) and transfers (precipitation, evaporation, runoff)",
      "1.1b Rivers — Drainage basin features: source, watershed, channel network, mouth; factors affecting river regimes including storm hydrographs",
      "1.2a Rivers — Fluvial processes: erosion (vertical and lateral), weathering, mass movement, transportation, deposition; factors affecting them",
      "1.2b Rivers — How channel shape, valley profile, gradient, velocity, discharge and sediment change along a named river",
      "1.2c Rivers — River landforms: valleys, interlocking spurs, waterfalls, meanders, oxbow lakes, floodplains and levées",
      "1.3a Rivers — Water uses and rising demand; areas of water shortage and surplus",
      "1.3b Rivers — Water quality: pollution causes, storage and supply of clean water (dams, pipelines, treatment works)",
      "1.3c Rivers — Causes of flooding; prediction and prevention strategies (hard and soft engineering)",
      "2.1a Coasts — Marine processes: wave action, erosion, deposition, transportation including longshore drift; weathering; mass movement",
      "2.1b Coasts — Influence of geology, vegetation, people and sea-level change on coastal environments",
      "2.1c Coasts — Erosional landforms: headlands/bays, cliffs, wave-cut platforms, caves, arches, stacks, stumps; depositional: beaches, spits, bars",
      "2.2 Coasts — Coastal ecosystems: distribution and features of mangroves, coral reefs, salt marshes; threats and management",
      "2.3 Coasts — Coastal management: hard (sea walls, groynes, rip-rap, offshore breakwaters) and soft (beach nourishment, managed retreat) strategies; case studies",
      "3.1a Hazards — Types: tectonic (earthquakes, volcanoes, tsunamis), climatic (tropical storms, drought) — distribution and causes",
      "3.1b Hazards — Measurement of earthquakes (Richter/Mercalli); volcanic eruption types; tropical storm formation and structure",
      "3.2 Hazards — Impacts: physical, human, economic; short-term vs long-term; factors affecting vulnerability",
      "3.3 Hazards — Responses: immediate aid and long-term management; prediction, preparation and prevention strategies; case studies in developed and developing/emerging countries",
    ],
    p2: [
      "4.1 Economic activity — Primary, secondary, tertiary, quaternary sectors; employment structure changes over time; differences between HICs and LICs/NEEs",
      "4.2 Economic activity — TNCs: growth, advantages and disadvantages for host and home country; specific case study",
      "4.3 Economic activity — Tourism: growth, types (mass, eco, adventure); economic, social and environmental impacts; sustainable tourism strategies",
      "4.4 Energy — Types: renewable (solar, wind, HEP, geothermal, biomass) and non-renewable (coal, oil, gas, uranium, shale gas); pros and cons of each",
      "4.5 Energy — Global energy demand: trends and factors; energy security and energy mix; management strategies in developed and developing countries (case studies)",
      "5.1 Rural environments — Definition and classification of rural areas; rural land use changes; urbanisation pressures on rural areas",
      "5.2 Rural environments — Issues in LICs/NEEs: population growth, land reform, food security, rural-urban migration; causes and effects",
      "5.3 Rural environments — Issues in HICs: depopulation, services decline, counter-urbanisation, second homes; strategies to manage change",
      "6.1 Urban environments — Urbanisation trends: rates, causes, rural-urban migration; mega-cities distribution",
      "6.2 Urban environments — Urban land use models: Burgess (concentric zone), Hoyt (sector); applying to real cities",
      "6.3 Urban environments — Urban challenges in LICs/NEEs: informal settlements (squatter areas), housing, sanitation, traffic, air pollution; squatter upgrading strategies",
      "6.4 Urban environments — Urban challenges in HICs: inner city decline, suburbanisation, traffic congestion, counter-urbanisation; regeneration strategies",
      "6.5 Urban environments — Sustainable urban management: sustainable design, green spaces, public transport, recycling, brownfield vs greenfield development",
      "7.1 Global issues — Fragile environments: definition, distribution; climate change evidence, causes and effects; international responses (Paris Agreement, carbon footprints)",
      "7.2 Global issues — Globalisation: definition, growth of TNCs, global trade, impact on culture and environment; winners and losers",
      "7.3 Global issues — Development and human welfare: measures of development (GNI, HDI, birth/death rates, literacy); inequality causes; strategies (trade, aid, debt relief, FDI, microfinance, intermediate technology)",
    ]
  },
  biology: {
    note: "Paper 1B covers Topics 1–5 (core). Paper 2B includes all content including bold 'B' statements in greater depth.",
    p1: [
      "1.1 Characteristics of living organisms: nutrition, respiration, excretion, response, movement, homeostasis, reproduction, growth",
      "1.2 Eukaryotes: plants (chloroplasts, cellulose cell walls, starch/sucrose storage; e.g. maize, peas); animals (no chloroplasts, glycogen storage; e.g. humans, insects); fungi (hyphae/mycelium, chitin walls, saprotrophic nutrition, glycogen; e.g. Mucor, yeast); protoctists (microscopic, e.g. Amoeba, Chlorella, Plasmodium)",
      "1.3 Prokaryotes (bacteria): cell wall, membrane, cytoplasm, plasmids, circular chromosome — no nucleus; examples: Lactobacillus bulgaricus, Pneumococcus",
      "1.4 Pathogens: definition; pathogens include fungi, bacteria, protoctists and viruses; viruses — structure (protein coat, one type of nucleic acid), examples (TMV, influenza, HIV)",
      "2.1 Levels of organisation: organelles → cells → tissues → organs → systems",
      "2.2–2.4 Cell structures and functions: nucleus, cytoplasm, membrane, cell wall, mitochondria, chloroplasts, ribosomes, vacuole; plant vs animal cell differences",
      "2.5B Cell differentiation: importance in development; stem cells in medicine — advantages and disadvantages",
      "2.7–2.8 Biological molecules: elements in carbohydrates (C, H, O), proteins (C, H, O, N, S) and lipids (C, H, O); structure from smaller units (sugars → starch/glycogen; amino acids → protein; fatty acids + glycerol → lipid)",
      "2.9 Food tests (practical): Benedict's (reducing sugars), iodine (starch), Biuret (protein), emulsion test (fat)",
      "2.10–2.13 Enzymes: biological catalysts; effect of temperature on enzyme function including active site denaturation; effect of pH on active site (practical investigations)",
      "2.15–2.17 Movement of substances: diffusion, osmosis and active transport — definitions, factors affecting rate (surface area:volume ratio, distance, temperature, concentration gradient); practical investigations",
      "2.18–2.22 Plant nutrition — Photosynthesis: process, importance, word and symbol equations; factors affecting rate (CO₂, light, temperature); leaf adaptations; mineral ions (nitrates for amino acids, magnesium for chlorophyll)",
      "2.23 Practical: investigate photosynthesis — oxygen evolution, starch production, requirements of light/CO₂/chlorophyll",
      "2.24–2.32 Human nutrition: balanced diet components and functions; energy requirements; alimentary canal structure and function (mouth, oesophagus, stomach, small intestine, large intestine, pancreas); peristalsis; digestive enzymes (amylase, maltase, proteases, lipases); bile production, storage and roles; villus adaptations for absorption",
      "2.34–2.38 Respiration: ATP production; aerobic vs anaerobic; word and symbol equations for aerobic respiration; word equations for anaerobic (lactic acid in animals; ethanol + CO₂ in plants/yeast)",
      "2.40–2.45B Gas exchange in plants: diffusion, role of stomata and guard cells, transpiration; net gas exchange depends on light intensity (practical with hydrogen carbonate indicator)",
      "2.46–2.50 Gas exchange in humans: thorax structure; intercostal muscles and diaphragm in ventilation; alveoli adaptations; biological consequences of smoking (lung disease, coronary heart disease)",
    ],
    p2: [
      "2.53–2.58B Transport in plants: phloem (sucrose, amino acids); xylem (water, mineral ions); water absorption by root hair cells; transpiration definition and factors affecting rate (humidity, wind, temperature, light intensity); practical investigation",
      "2.59–2.64 Blood composition: red blood cells (shape, no nucleus, haemoglobin), white blood cells (phagocytosis, lymphocytes and antibodies), platelets, plasma functions; immune response; 2.63B vaccination and memory cells; 2.64B blood clotting",
      "2.65–2.69 Heart structure and function; heart rate during exercise and under adrenaline; coronary heart disease risk factors; arteries/veins/capillaries — structure and function; double circulatory system",
      "2.70–2.79B Excretion: CO₂ and O₂ loss via stomata; human excretory organs (lungs, kidneys, skin); kidney roles (excretion and osmoregulation); urinary system structure; nephron — ultrafiltration, selective reabsorption of glucose, role of ADH in water reabsorption; urine composition",
      "2.80–2.84 Coordination: homeostasis definition; nervous system (CNS and peripheral); neurones (sensory, relay, motor); synapse structure and transmission; reflex arc",
      "2.85–2.87B Eye: structure and function; accommodation for near and far vision; rods and cones",
      "2.88–2.93 Endocrine system: glands and hormones overview; adrenaline; insulin and glucagon in blood glucose regulation; Type 1 and Type 2 diabetes; menstrual cycle hormonal control (FSH, LH, oestrogen, progesterone); fertilisation",
      "3.1–3.6 Reproduction: sexual vs asexual; male and female reproductive systems; fertilisation and early development",
      "3.7–3.10 Chromosomes, genes and DNA: DNA structure (double helix, nucleotides, base pairing A–T and C–G); genes, alleles, chromosomes, genome",
      "3.11–3.14 Cell division: mitosis (purpose, outcome); meiosis (reduction division, genetic variation)",
      "3.15–3.18 Genetics: monohybrid inheritance; dominant/recessive/homozygous/heterozygous; Punnett squares; sex determination (XX female, XY male); mutation types and causes",
      "3.19–3.21 Natural selection and evolution: Darwin's theory; evidence; speciation",
      "4.1–4.6 Ecology: food chains, webs, pyramids of numbers/biomass/energy; carbon cycle; nitrogen cycle (fixation, nitrification, denitrification, decomposition)",
      "4.7–4.10 Human impact: deforestation, greenhouse effect/climate change, pollution (water, air, land), eutrophication; conservation strategies",
      "5.1–5.9B Biotechnology: selective breeding; genetic engineering process; cloning (plant cuttings, micropropagation, embryo transplants, adult cell cloning); uses of microorganisms (fermentation, yoghurt, bread, beer); large-scale industrial fermentation; biogas production",
    ]
  },
  chemistry: {
    note: "Paper 1C covers core content (no bold 'C' statements). Paper 2C includes all content including the bold 'C' statements which go into greater depth.",
    p1: [
      "1.1–1.2 States of matter: particle arrangement, movement and energy; interconversions (melting, boiling, condensing, freezing, sublimation) — how achieved and particle changes",
      "1.3 Diffusion and dilution experiments as evidence for particle movement",
      "1.4–1.7C Solubility: solvent, solute, solution, saturated solution; solubility in g/100g solvent; plotting/interpreting solubility curves; practical investigation",
      "1.8–1.9 Classification: element, compound, mixture; pure substances have fixed melting/boiling points; mixtures melt/boil over a range",
      "1.10–1.13 Separation techniques: simple distillation, fractional distillation, filtration, crystallisation, paper chromatography; Rf values; practical investigation",
      "1.14–1.17 Atomic structure: atom and molecule definitions; sub-atomic particles (position, relative mass, charge); atomic number, mass number, isotopes, relative atomic mass (Ar); calculating Ar from isotopic abundances",
      "1.18–1.24 Periodic Table: arrangement by atomic number, groups and periods; electronic configurations for first 20 elements; metals vs non-metals; why group elements have similar properties; noble gases (Group 0) and why they don't react",
      "1.25–1.35C Chemical formulae and calculations: word and balanced symbol equations with state symbols; relative formula mass (Mr); moles and Avogadro's constant; amount of substance calculations; reacting masses; percentage yield; empirical and molecular formulae from experimental data; C: molar concentrations (mol/dm³); C: molar volume of gases (24 dm³ at rtp)",
      "1.36 Practical: determine formula of metal oxide by combustion (e.g. MgO) or reduction (e.g. CuO)",
      "1.37–1.43 Ionic bonding: ion formation by electron loss/gain; charges of ions (Groups 1,2,3,5,6,7 and named ions); formulae of ionic compounds; dot-and-cross diagrams; properties of ionic compounds (high m.p., conduct when molten/aqueous)",
      "1.44–1.51 Covalent bonding: electron sharing; dot-and-cross diagrams for diatomic molecules, H₂O, NH₃, CO₂, CH₄, C₂H₆, C₂H₄, halogen compounds; simple molecular structures (low m.p.); giant covalent structures (diamond, graphite, C₆₀ fullerene) — properties including electrical conductivity",
      "1.52C–1.54C Metallic bonding: 2D lattice diagram; electrostatic attractions; explains electrical conductivity and malleability",
      "1.55C–1.60C Electrolysis: why ionic compounds conduct only when molten/aqueous; anion and cation definitions; electrolysis of molten compounds (e.g. lead bromide) and aqueous solutions (NaCl, dilute H₂SO₄, CuSO₄); half-equations; oxidation/reduction at electrodes; practical investigation",
      "2.1–2.3, 2.4C Group 1 (alkali metals): reactions with water — similarities as evidence for family; differences as evidence for reactivity trend; predicting properties; C: explain trend in terms of electronic configuration",
      "2.5–2.7, 2.8C Group 7 (halogens): colours, states and physical property trends; displacement reactions as evidence for reactivity trend; predicting properties; C: explain trend in electronic configuration terms",
    ],
    p2: [
      "2.9–2.14 Atmosphere: percentage composition of dry air (N₂ ~78%, O₂ ~21%, Ar ~1%, CO₂ ~0.04%); experiments to determine O₂ percentage; combustion of elements in oxygen (Mg, H₂, S); thermal decomposition of metal carbonates to produce CO₂; CO₂ as greenhouse gas and climate change",
      "2.15–2.21 Reactivity series: arrangement based on reactions with water and dilute acids, and displacement reactions; order (K, Na, Li, Ca, Mg, Al, Zn, Fe, Cu, Ag, Au); rusting conditions; rust prevention (barriers, galvanising, sacrificial protection); oxidation/reduction/redox/oxidising agent/reducing agent in terms of oxygen and electrons",
      "2.22C–2.27C Extraction and uses of metals: most metals from ores; extraction method linked to reactivity (carbon for iron; electrolysis for aluminium); uses of Al, Cu, Fe and steel related to properties; alloys — definition and why harder than pure metals",
      "2.28–2.33C Acids, alkalis and titrations: litmus, phenolphthalein and methyl orange indicators; pH scale 0–14; universal indicator; acids as source of H⁺ ions, alkalis as source of OH⁻; neutralisation; C: acid-alkali titration procedure",
      "2.34–2.38C Salt preparation: neutralisation (acid + base), reactions of acids with metals/carbonates; preparing, filtering and purifying salts; C: preparing insoluble salt by precipitation; C: titration calculations",
      "2.39–2.43 Chemical tests: flame tests (Li red, Na yellow, K lilac, Ca orange-red, Cu blue-green); precipitation tests for metal ions (Fe²⁺, Fe³⁺, Cu²⁺, Al³⁺, Ca²⁺, Mg²⁺); tests for Cl⁻, SO₄²⁻, CO₃²⁻, NO₃⁻; tests for gases (H₂, O₂, CO₂, Cl₂, NH₃)",
      "3.1–3.4 Energetics: exothermic and endothermic reactions; bond breaking (endothermic) and bond forming (exothermic); energy calculations using bond energies",
      "3.5–3.9C Rates of reaction: collision theory; factors (temperature, concentration, surface area, catalysts); rate experiments (gas collection, mass loss, colour change); rate calculations from graphs; C: measuring initial rates",
      "3.10–3.14C Reversible reactions and equilibrium: definition; dynamic equilibrium; Le Chatelier's principle (effect of temperature, pressure, concentration); Haber process (450°C, 200 atm, iron catalyst, N₂ + 3H₂ ⇌ 2NH₃); contact process (SO₂ → SO₃, V₂O₅ catalyst)",
      "4.1–4.6C Alkanes: general formula CₙH₂ₙ₊₂; naming methane to butane; combustion (complete: CO₂ + H₂O; incomplete: CO + C); fractional distillation of crude oil — fractions and uses; cracking (thermal and catalytic) — products and uses; C: mechanism of free radical substitution",
      "4.7–4.10C Alkenes: general formula CₙH₂ₙ; C=C double bond; bromine water test; addition reactions (hydrogen/hydrogenation, halogens, water/hydration); addition polymerisation from alkenes; C: condensation polymerisation — polyesters and polyamides",
      "4.11–4.13C Ethanol: fermentation (glucose → ethanol + CO₂, yeast, 30–40°C, anaerobic); hydration of ethene; properties and uses; C: properties and reactions of carboxylic acids; C: esterification (acid + alcohol → ester + water); uses of esters",
    ]
  },
  physics: {
    note: "Paper 1P covers core content (no bold 'P' statements). Paper 2P includes all content including bold 'P' statements in greater depth.",
    p1: [
      "1.1–1.2P Units: kg, m, m/s, m/s², N, s, N/kg; P: also Nm and kg m/s",
      "1.3–1.5 Movement and position: distance–time graphs (gradient = speed); average speed = distance/time; practical with everyday objects",
      "1.6–1.10 Acceleration: a = (v−u)/t; velocity–time graphs (gradient = acceleration, area = distance); v² = u² + 2as",
      "1.11–1.15 Forces: effects of forces (speed, shape, direction changes); types of force (gravitational, electrostatic, etc.); vectors vs scalars; force is a vector; resultant force",
      "1.16–1.21 Dynamics: friction opposes motion; F = ma; W = mg; stopping distance (thinking + braking); factors affecting stopping distance; terminal velocity",
      "1.22–1.24 Elasticity: extension vs force for springs/wires/rubber bands (practical); Hooke's law (initial linear region); elastic behaviour definition",
      "1.25P–1.33P Momentum: p = mv; momentum in safety features; conservation of momentum; F = (mv−mu)/t; Newton's 3rd law; moment = Fd; weight acts through centre of gravity; principle of moments; forces on beams",
      "2.1 Electricity units: A, C, J, Ω, s, V, W",
      "2.2–2.6 Mains electricity: insulation, double insulation, earthing, fuses, circuit breakers; energy transfer in resistors; P = IV; E = IVt; AC vs DC",
      "2.7–2.12 Circuit fundamentals: series vs parallel for applications; current in series circuits; V–I characteristics of wire, resistor, filament lamp, diode; qualitative resistance effects; LDRs and thermistors; lamps and LEDs as current indicators",
      "2.13–2.21 Quantitative circuits: V = IR; current as charge flow rate; Q = It; electrons as charge carriers in metals; current conservation at junctions; voltage same across parallel components; series circuit calculations; E = QV",
      "2.22P–2.28P Electrostatics: conductors vs insulators; charging by friction (practical); positive/negative charges from electron loss/gain; forces between charges; dangers of electrostatic charge (fuelling aircraft); uses (photocopiers, inkjet printers)",
      "3.1–3.9 Waves: units (°, Hz, m, m/s, s); longitudinal vs transverse; amplitude, wavefront, frequency, wavelength, period; waves transfer energy/information not matter; v = fλ; f = 1/T; Doppler effect; reflection and refraction",
      "3.10–3.16P Electromagnetic spectrum: light part of continuous spectrum (radio, microwave, IR, visible, UV, X-ray, γ-ray); all travel at same speed in free space; order by decreasing wavelength/increasing frequency; properties and uses of each type; dangers of UV, X-rays, γ-rays; P: uses of EM waves in detail",
      "3.17–3.19P Sound and light: sound as longitudinal waves; speed in different media; echoes; P: detail on reflection, refraction and total internal reflection; critical angle; optical fibres",
    ],
    p2: [
      "4.1–4.6 Energy resources: work done W = Fd; power P = W/t and P = Fv; efficiency = useful output/total input; KE = ½mv²; GPE = mgh; fossil fuels — formation, advantages, disadvantages; renewable sources (solar, wind, hydro, tidal, geothermal, biomass) — advantages and disadvantages",
      "5.1–5.4 Solids, liquids and gases: density (m = ρV); pressure in fluids (P = F/A); atmospheric pressure; pressure increases with depth; change in pressure = hρg",
      "5.5–5.10P Thermal physics: specific heat capacity Q = mcΔT (practical investigation); latent heat Q = mL; gas laws and kinetic theory; absolute zero; P: gas law calculations P₁V₁/T₁ = P₂V₂/T₂",
      "5.11–5.14 Heat transfer: conduction mechanisms in metals and non-metals; convection in fluids; radiation (infrared); factors affecting emission/absorption",
      "6.1–6.7 Magnetism: permanent magnets (poles, fields); magnetic field patterns (bar magnet, solenoid); electromagnetism; factors affecting field strength; uses of electromagnets (relay, loudspeaker, circuit breaker)",
      "6.8–6.10 Motor effect: force on current-carrying conductor in magnetic field; F = BIl; Fleming's left-hand rule; DC motor (structure, commutator, operation)",
      "6.11–6.13 Electromagnetic induction: Faraday's and Lenz's laws; AC generator (structure, output, slip rings); factors affecting induced EMF",
      "6.14–6.16P Transformers and the national grid: transformer equation Vp/Vs = Np/Ns; power equation VpIp = VsIs (ideal); why national grid uses high voltage; P: detailed transformer calculations",
      "7.1–7.5 Atomic structure and radioactivity: proton, neutron, electron; isotopes and nuclide notation (AZX); alpha, beta, gamma — properties (charge, mass, ionising ability, range, penetration); nuclear equations for alpha and beta decay; background radiation sources",
      "7.6–7.9 Half-life: definition; half-life graphs; calculations; uses (tracers, radiotherapy, thickness gauges, carbon dating); safety precautions",
      "7.10–7.13P Nuclear physics: nuclear fission (chain reaction, critical mass, nuclear reactors); nuclear fusion (conditions, energy release, stars); P: detailed fission and fusion calculations; particle physics — quarks and leptons (overview)",
      "8.1–8.4 Astrophysics: structure of universe (galaxies, stars, solar system); life cycle of a star (nebula, main sequence, red giant/supergiant, white dwarf/neutron star/black hole)",
      "8.5–8.7P Red-shift and cosmology: red-shift definition and evidence for expanding universe; Big Bang theory and supporting evidence; Hubble's law (recession speed ∝ distance); P: calculating age of universe from Hubble's law",
    ]
  },
  maths: {
    note: "Foundation tier only (4MA1/1F and 4MA1/2F). Both papers cover the entire Foundation specification — calculator allowed on both. No separate P1/P2 content split.",
    p1: [
      "N1 Numbers and the number system: integers, fractions, decimals, percentages, negative numbers, powers, roots; order of operations (BIDMAS); place value; rounding to decimal places and significant figures",
      "N2 Fractions, decimals and percentages: convert between FDP; fractions of quantities; percentage of amounts; percentage increase/decrease; reverse percentages; simple and compound interest",
      "N3 Indices and surds: index laws (multiplication, division, zero, negative and fractional indices); standard form (converting and calculating)",
      "N4 Factors, multiples, primes: prime factorisation; HCF and LCM; Venn diagrams for HCF/LCM",
      "N5 Ratio, proportion and rates of change: simplifying ratios; sharing in a ratio; direct and inverse proportion (equations); speed/distance/time; density (m = ρV); pressure (P = F/A); compound measures",
      "A1 Algebra fundamentals: collecting like terms; expanding single and double brackets; factorising (common factor, simple quadratics x² + bx + c); substitution into expressions and formulae",
      "A2 Equations and inequalities: solving linear equations; solving quadratic equations by factorisation and using the quadratic formula; simultaneous equations (elimination and substitution); linear inequalities and number lines",
      "A3 Sequences: term-to-term rules; nth term of arithmetic sequences; recognising geometric sequences; Fibonacci sequences",
      "A4 Graphs: coordinates in all 4 quadrants; y = mx + c (gradient and y-intercept); straight-line graphs; drawing and interpreting quadratic, cubic and reciprocal graphs; distance–time and velocity–time graphs",
      "A5 Formulae: substituting values; changing the subject; constructing equations from given information",
      "G1 Angles and parallel lines: angles on a straight line, around a point, vertically opposite; angles in parallel lines (alternate, corresponding, co-interior)",
      "G2 Properties of 2D shapes: triangles, quadrilaterals (including special types), polygons; interior and exterior angles of regular polygons; congruence criteria (SSS, SAS, AAS, RHS)",
      "G3 Similarity and congruence: similar triangles; scale factors for lengths, areas and volumes",
      "G4 Circle geometry: radius, diameter, chord, tangent, arc, sector; circumference C = 2πr; area A = πr²; arc length and sector area",
      "G5 Mensuration: perimeter and area of rectangles, triangles, parallelograms, trapeziums; volume and surface area of cuboids, prisms and cylinders; volume and surface area of pyramids, cones and spheres",
    ],
    p2: [
      "G6 Pythagoras and trigonometry: Pythagoras' theorem in 2D and 3D; trigonometric ratios (sin, cos, tan) in right-angled triangles; exact values (sin/cos 30°, 45°, 60°); sine rule; cosine rule; area of triangle = ½ab sinC; 3D Pythagoras and trigonometry problems",
      "G7 Circle theorems: angle at centre = 2 × angle at circumference; angle in semicircle = 90°; angles in same segment equal; opposite angles in cyclic quadrilateral = 180°; tangent perpendicular to radius; two tangents from external point equal; alternate segment theorem — all with proof",
      "G8 Transformations: reflection (in lines including y = x, y = −x); rotation (centre, angle, direction); translation (column vector); enlargement (scale factor and centre, including fractional and negative scale factors); describing transformations",
      "G9 Vectors: vector notation; addition, subtraction, scalar multiplication; using vectors to describe paths; proof using vectors",
      "G10 Constructions and loci: perpendicular bisector; angle bisector; perpendicular from point to line; constructions with compass and ruler; loci problems",
      "G11 Bearings, plans and elevations: three-figure bearings; calculating bearings; plans and front/side elevations of 3D shapes",
      "M1 Compound measures and growth/decay: compound interest; depreciation; growth and decay problems (exponential)",
      "S1 Probability: single event probability; combined events (sample space diagrams); relative frequency; Venn diagrams (union, intersection, complement); P(A or B) = P(A) + P(B) − P(A and B); tree diagrams with and without replacement; conditional probability",
      "S2 Collecting and sampling data: types of data (quantitative, qualitative, discrete, continuous); sampling methods (random, systematic, stratified, quota); bias and reliability",
      "S3 Averages and spread: mean (from lists and frequency tables, including grouped data with midpoints); median; mode; range; interquartile range (IQR); comparing distributions",
      "S4 Representing data: bar charts; pie charts; frequency polygons; histograms with unequal class widths (frequency density = frequency ÷ class width); scatter graphs — correlation types, line of best fit, interpolation and extrapolation; time series",
      "S5 Cumulative frequency and box plots: drawing cumulative frequency curves; reading off median, quartiles and IQR; drawing and interpreting box plots; comparing distributions",
    ]
  }
};

const DAILY_GOAL = 3;
function daysUntil(s) { const d = new Date(s), t = new Date(); t.setHours(0, 0, 0, 0); d.setHours(0, 0, 0, 0); return Math.ceil((d - t) / 86400000); }
function fmtDate(s) { return new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short" }); }
function scoreColor(v) { return v >= 70 ? "#1D9E75" : v >= 50 ? "#EF9F27" : "#E24B4A"; }
function scoreBg(v) { return v >= 70 ? "#0a1e15" : v >= 50 ? "#1e1200" : "#200808"; }

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [sessions, setSessions] = useState([]);
  const [dbItems, setDbItems] = useState([]);
  const [topics, setTopics] = useState({});
  const [specChecked, setSpecChecked] = useState(new Set());
  const [loaded, setLoaded] = useState(false);
  const [logForm, setLogForm] = useState({ date: new Date().toISOString().split("T")[0], subjectId: "business", paperId: "bs_p1", hours: 1, score: "", notes: "" });
  const [newDb, setNewDb] = useState({ subjectId: "business", text: "" });
  const [dbFilter, setDbFilter] = useState("all");
  const [dbSubjectFilter, setDbSubjectFilter] = useState("all");
  const [specSubjectFilter, setSpecSubjectFilter] = useState("all");
  const [specHideChecked, setSpecHideChecked] = useState(false);

  useEffect(() => {
    async function load() {
      try { const r = await window.storage.get("gcse_v4_sessions"); if (r) setSessions(JSON.parse(r.value)); } catch (e) { }
      try { const r = await window.storage.get("gcse_v4_db"); if (r) setDbItems(JSON.parse(r.value)); } catch (e) { }
      try { const r = await window.storage.get("gcse_v4_topics"); if (r) setTopics(JSON.parse(r.value)); else { const d = {}; SUBJECTS.forEach(s => s.papers.forEach(p => { d[p.id] = p.defaultTopic; })); setTopics(d); } } catch (e) { const d = {}; SUBJECTS.forEach(s => s.papers.forEach(p => { d[p.id] = p.defaultTopic; })); setTopics(d); }
      try { const r = await window.storage.get("gcse_v4_spec"); if (r) setSpecChecked(new Set(JSON.parse(r.value))); } catch (e) { }
      setLoaded(true);
    }
    load();
  }, []);

  async function saveSessions(arr) { setSessions(arr); await window.storage.set("gcse_v4_sessions", JSON.stringify(arr)); }
  async function saveDb(arr) { setDbItems(arr); await window.storage.set("gcse_v4_db", JSON.stringify(arr)); }
  async function saveTopics(t) { setTopics(t); await window.storage.set("gcse_v4_topics", JSON.stringify(t)); }
  async function saveSpec(s) { setSpecChecked(s); await window.storage.set("gcse_v4_spec", JSON.stringify([...s])); }

  function toggleSpec(id) { const s = new Set(specChecked); s.has(id) ? s.delete(id) : s.add(id); saveSpec(s); }
  function toggleAll(ids, forceOn) { const s = new Set(specChecked); ids.forEach(id => forceOn ? s.add(id) : s.delete(id)); saveSpec(s); }

  const hoursPerSubject = {}; SUBJECTS.forEach(s => { hoursPerSubject[s.id] = 0; }); sessions.forEach(s => { if (hoursPerSubject[s.subjectId] !== undefined) hoursPerSubject[s.subjectId] += Number(s.hours); });
  const todayStr = new Date().toISOString().split("T")[0];
  const todayHours = sessions.filter(s => s.date === todayStr).reduce((a, s) => a + Number(s.hours), 0);
  const totalHours = sessions.reduce((a, s) => a + Number(s.hours), 0);
  const scoreMap = {}, scoreCnt = {};
  sessions.forEach(s => { if (s.score !== "" && s.score != null) { scoreMap[s.subjectId] = (scoreMap[s.subjectId] || 0) + Number(s.score); scoreCnt[s.subjectId] = (scoreCnt[s.subjectId] || 0) + 1; } });
  const maxHrs = Math.max(...Object.values(hoursPerSubject), 1);
  const totalSpec = Object.values(SPEC).reduce((a, v) => a + (v.p1 || []).length + (v.p2 || []).length, 0);
  const checkedSpec = specChecked.size;

  const inp = (extra = {}) => ({ background: "#1a1a1a", border: "0.5px solid #333", borderRadius: 8, padding: "8px 10px", color: "#e2e8f0", fontSize: 14, boxSizing: "border-box", width: "100%", ...extra });
  const card = (extra = {}) => ({ background: "#161616", border: "0.5px solid #2a2a2a", borderRadius: 12, padding: 16, ...extra });

  const TABS = [{ id: "dashboard", label: "Dashboard" }, { id: "log", label: "Log" }, { id: "stats", label: "Stats" }, { id: "spec", label: "Spec ✓" }, { id: "dblist", label: "DB List" }, { id: "topics", label: "Topics" }];

  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#0d0d0d", minHeight: "100vh", color: "#e2e8f0" }}>
      <div style={{ background: "#111", borderBottom: "0.5px solid #2a2a2a", padding: "16px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ fontSize: 28, lineHeight: 1 }}>📚</div>
          <div>
            <div style={{ fontWeight: 500, fontSize: 18, color: "#f0f0f0" }}>Mate's GCSE Revision Planner</div>
            <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>Edexcel IGCSE · Target: All 8s & 9s · 3 hrs/day · Summer 2026</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#666", marginBottom: 2 }}>Today's hours</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: todayHours >= DAILY_GOAL ? "#1D9E75" : "#EF9F27" }}>{todayHours}h / {DAILY_GOAL}h</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 14px", border: "none", background: "transparent", color: tab === t.id ? "#e2e8f0" : "#666", cursor: "pointer", fontSize: 13, fontWeight: tab === t.id ? 500 : 400, borderBottom: `2px solid ${tab === t.id ? "#378ADD" : "transparent"}`, whiteSpace: "nowrap" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 16px", maxWidth: 900, margin: "0 auto" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            <div style={{ background: "#1a1008", border: "0.5px solid #5a3000", borderRadius: 10, padding: "10px 14px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span>🚨</span>
              <span style={{ color: "#EF9F27", fontSize: 13 }}><strong>Priority subjects:</strong> Chemistry & History — schedule extra sessions this week!</span>
            </div>
            <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Upcoming exams — sorted by date</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
              {SUBJECTS.flatMap(s => s.papers.map(p => ({ ...p, subject: s }))).sort((a, b) => new Date(a.date) - new Date(b.date)).map(p => {
                const days = daysUntil(p.date), passed = days < 0;
                const topicLabel = (loaded && topics[p.id]) || p.defaultTopic || p.label;
                return (
                  <div key={p.id} style={{ background: passed ? "#111" : p.subject.bg, border: `0.5px solid ${passed ? "#1e1e1e" : days <= 14 ? p.subject.color + "88" : "#2a2a2a"}`, borderRadius: 12, padding: 14, opacity: passed ? 0.45 : 1, position: "relative" }}>
                    {p.subject.priority && !passed && <div style={{ position: "absolute", top: 10, right: 10, background: "#E24B4A", color: "#fff", fontSize: 10, padding: "2px 6px", borderRadius: 4, fontWeight: 500 }}>PRIORITY</div>}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 20 }}>{p.subject.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 14, color: "#f0f0f0" }}>{p.subject.name}</div>
                        <div style={{ fontSize: 11, color: "#888" }}>{p.label}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "#aaa", marginBottom: 8 }}>{topicLabel || "—"}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div style={{ fontSize: 12, color: "#666" }}>{fmtDate(p.date)}</div>
                      <div style={{ fontWeight: 500, fontSize: 22, color: passed ? "#333" : days === 0 ? "#E24B4A" : days <= 7 ? "#E24B4A" : days <= 14 ? "#EF9F27" : p.subject.color }}>
                        {passed ? "✓" : days === 0 ? "TODAY!" : days + "d"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LOG */}
        {tab === "log" && (
          <div>
            <div style={card({ marginBottom: 20 })}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#aaa", marginBottom: 14 }}>Log a revision session</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>Date</div><input type="date" value={logForm.date} onChange={e => setLogForm({ ...logForm, date: e.target.value })} style={inp()} /></div>
                <div><div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>Hours</div>
                  <select value={logForm.hours} onChange={e => setLogForm({ ...logForm, hours: Number(e.target.value) })} style={inp()}>
                    {[0.5, 1, 1.5, 2, 2.5, 3].map(h => <option key={h} value={h}>{h}h</option>)}
                  </select>
                </div>
                <div><div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>Subject</div>
                  <select value={logForm.subjectId} onChange={e => { const s = SUBJECTS.find(x => x.id === e.target.value); setLogForm({ ...logForm, subjectId: e.target.value, paperId: s.papers[0].id }); }} style={inp()}>
                    {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}{s.priority ? " 🔴" : ""}</option>)}
                  </select>
                </div>
                <div><div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>Paper</div>
                  <select value={logForm.paperId} onChange={e => setLogForm({ ...logForm, paperId: e.target.value })} style={inp()}>
                    {SUBJECTS.find(s => s.id === logForm.subjectId)?.papers.map(p => <option key={p.id} value={p.id}>{p.label} — {(loaded && topics[p.id]) || p.defaultTopic || "—"}</option>)}
                  </select>
                </div>
                <div><div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>Score / Confidence (0–100)</div><input type="number" min="0" max="100" placeholder="e.g. 75" value={logForm.score} onChange={e => setLogForm({ ...logForm, score: e.target.value })} style={inp()} /></div>
                <div><div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>Notes</div><input type="text" placeholder="What did you cover?" value={logForm.notes} onChange={e => setLogForm({ ...logForm, notes: e.target.value })} style={inp()} /></div>
              </div>
              <button onClick={async () => { await saveSessions([{ ...logForm, id: Date.now() }, ...sessions]); setLogForm({ ...logForm, score: "", notes: "", date: new Date().toISOString().split("T")[0] }); }} style={{ marginTop: 14, background: "#378ADD", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontWeight: 500, cursor: "pointer", fontSize: 14 }}>+ Add session</button>
            </div>
            <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Recent sessions</div>
            {sessions.length === 0 ? <div style={{ color: "#555", textAlign: "center", padding: "40px 0" }}>No sessions yet — start logging! 💪</div> :
              sessions.slice(0, 25).map(s => {
                const subj = SUBJECTS.find(x => x.id === s.subjectId); const paper = subj?.papers.find(p => p.id === s.paperId);
                return (<div key={s.id} style={{ ...card({ marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }) }}>
                  <span style={{ fontSize: 18 }}>{subj?.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{subj?.name} — {paper?.label}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>{s.date} · {s.hours}h{s.notes ? ` · ${s.notes}` : ""}</div>
                  </div>
                  {s.score !== "" && s.score != null && <div style={{ background: scoreBg(Number(s.score)), color: scoreColor(Number(s.score)), borderRadius: 7, padding: "3px 10px", fontWeight: 500, fontSize: 13 }}>{s.score}%</div>}
                  <button onClick={() => saveSessions(sessions.filter(x => x.id !== s.id))} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 16 }}>✕</button>
                </div>);
              })
            }
          </div>
        )}

        {/* STATS */}
        {tab === "stats" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
              {[{ label: "Total hours", value: totalHours + "h", color: "#378ADD" }, { label: "Sessions logged", value: sessions.length, color: "#1D9E75" }, { label: "Today", value: `${todayHours}/${DAILY_GOAL}h`, color: todayHours >= DAILY_GOAL ? "#1D9E75" : "#EF9F27" }].map(c => (
                <div key={c.label} style={{ background: "#161616", border: "0.5px solid #2a2a2a", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 500, color: c.color }}>{c.value}</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Hours per subject</div>
            <div style={card({ marginBottom: 24 })}>
              {SUBJECTS.map(s => {
                const hrs = hoursPerSubject[s.id] || 0, pct = (hrs / maxHrs) * 100; return (
                  <div key={s.id} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}><span>{s.emoji} {s.name} {s.priority ? "🔴" : ""}</span><span style={{ color: "#888" }}>{hrs}h</span></div>
                    <div style={{ background: "#222", borderRadius: 5, height: 8, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: s.color, borderRadius: 5, transition: "width 0.4s" }} /></div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Average score per subject</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: 8, marginBottom: 24 }}>
              {SUBJECTS.map(s => {
                const avg = scoreCnt[s.id] ? Math.round(scoreMap[s.id] / scoreCnt[s.id]) : null; return (
                  <div key={s.id} style={{ background: "#161616", border: `0.5px solid ${s.color}44`, borderRadius: 10, padding: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 20 }}>{s.emoji}</div>
                    <div style={{ fontSize: 11, color: "#888", margin: "4px 0" }}>{s.name}</div>
                    <div style={{ fontSize: 22, fontWeight: 500, color: avg === null ? "#333" : scoreColor(avg) }}>{avg === null ? "—" : avg + "%"}</div>
                  </div>
                );
              })}
            </div>
            {sessions.filter(s => s.score !== "" && s.score != null).length > 1 && (
              <>
                <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Score timeline</div>
                <div style={card({ display: "flex", gap: 5, overflowX: "auto", alignItems: "flex-end", minHeight: 80 })}>
                  {sessions.filter(s => s.score !== "" && s.score != null).slice(0, 30).reverse().map(s => {
                    const subj = SUBJECTS.find(x => x.id === s.subjectId); const sc = Number(s.score);
                    return (<div key={s.id} title={`${subj?.name} · ${s.date} · ${s.score}%`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, minWidth: 28 }}>
                      <div style={{ fontSize: 10, color: "#666" }}>{s.score}</div>
                      <div style={{ width: 18, borderRadius: 3, background: subj?.color, height: Math.max(12, sc * 0.7) + "px", opacity: 0.8 }} />
                      <div style={{ fontSize: 11 }}>{subj?.emoji}</div>
                    </div>);
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* SPEC CHECKLIST */}
        {tab === "spec" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 15, color: "#f0f0f0", marginBottom: 2 }}>Official Edexcel IGCSE Specification Checklist</div>
                <div style={{ fontSize: 12, color: "#666" }}>{checkedSpec} / {totalSpec} spec points covered</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <select value={specSubjectFilter} onChange={e => setSpecSubjectFilter(e.target.value)} style={{ ...inp(), width: "auto", fontSize: 12, padding: "5px 10px" }}>
                  <option value="all">All subjects</option>
                  {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
                </select>
                <button onClick={() => setSpecHideChecked(!specHideChecked)} style={{ background: specHideChecked ? "#378ADD" : "#1a1a1a", color: specHideChecked ? "#fff" : "#888", border: `0.5px solid ${specHideChecked ? "#378ADD" : "#2a2a2a"}`, borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontSize: 12, whiteSpace: "nowrap" }}>
                  {specHideChecked ? "Show all" : "Hide done"}
                </button>
              </div>
            </div>
            <div style={{ background: "#1a1a1a", border: "0.5px solid #2a2a2a", borderRadius: 10, height: 8, overflow: "hidden", marginBottom: 20 }}>
              <div style={{ width: `${totalSpec > 0 ? (checkedSpec / totalSpec * 100) : 0}%`, height: "100%", background: "linear-gradient(90deg,#1D9E75,#378ADD)", transition: "width 0.4s" }} />
            </div>

            {SUBJECTS.filter(s => specSubjectFilter === "all" || s.id === specSubjectFilter).map(s => {
              const specData = SPEC[s.id]; if (!specData) return null;
              const papers = [{ key: "p1", items: specData.p1 || [], paper: s.papers[0] }, { key: "p2", items: specData.p2 || [], paper: s.papers[1] }];
              const allIds = papers.flatMap(({ key, items }) => items.map((_, i) => `spec_${s.id}_${key}_${i}`));
              const doneCount = allIds.filter(id => specChecked.has(id)).length;
              const allDone = doneCount === allIds.length;
              return (
                <div key={s.id} style={{ ...card({ marginBottom: 16 }), border: `0.5px solid ${s.color}33` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: specData.note ? 8 : 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 20 }}>{s.emoji}</span>
                      <span style={{ fontWeight: 500, fontSize: 15, color: s.color }}>{s.name}</span>
                      {s.priority && <span style={{ background: "#E24B4A22", color: "#E24B4A", fontSize: 10, padding: "2px 7px", borderRadius: 4 }}>PRIORITY</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 12, color: "#555" }}>{doneCount}/{allIds.length}</span>
                      <button onClick={() => toggleAll(allIds, !allDone)} style={{ background: "#1a1a1a", border: "0.5px solid #333", borderRadius: 6, padding: "4px 10px", color: "#888", cursor: "pointer", fontSize: 11 }}>
                        {allDone ? "Uncheck all" : "Check all"}
                      </button>
                    </div>
                  </div>
                  {specData.note && <div style={{ fontSize: 11, color: "#666", marginBottom: 12, padding: "6px 10px", background: "#111", borderRadius: 7, border: "0.5px solid #222" }}>{specData.note}</div>}
                  {papers.map(({ key, items, paper }) => {
                    if (!items || !items.length) return null;
                    const pIds = items.map((_, i) => `spec_${s.id}_${key}_${i}`);
                    const pDone = pIds.filter(id => specChecked.has(id)).length;
                    const visibleItems = items.filter((_, i) => !(specHideChecked && specChecked.has(`spec_${s.id}_${key}_${i}`)));
                    if (specHideChecked && visibleItems.length === 0) return (
                      <div key={key} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: s.color + "cc", marginBottom: 4 }}>{paper?.label} <span style={{ color: "#555", fontWeight: 400 }}>({pDone}/{items.length} done — all complete ✓)</span></div>
                      </div>
                    );
                    return (
                      <div key={key} style={{ marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                          <span style={{ fontSize: 12, fontWeight: 500, color: s.color + "cc" }}>{paper?.label}</span>
                          <span style={{ fontSize: 11, color: "#555" }}>{pDone}/{items.length} done · {fmtDate(paper?.date)}</span>
                        </div>
                        <div style={{ display: "grid", gap: 4 }}>
                          {items.map((item, i) => {
                            const id = `spec_${s.id}_${key}_${i}`;
                            const done = specChecked.has(id);
                            if (specHideChecked && done) return null;
                            return (
                              <div key={id} onClick={() => toggleSpec(id)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", borderRadius: 7, cursor: "pointer", background: done ? "#111" : "#1a1a1a", border: `0.5px solid ${done ? s.color + "44" : "#222"}`, userSelect: "none" }}>
                                <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${done ? s.color : "#444"}`, background: done ? s.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                                  {done && <span style={{ color: "#000", fontSize: 10, fontWeight: 700, lineHeight: 1 }}>✓</span>}
                                </div>
                                <span style={{ fontSize: 12.5, color: done ? "#555" : "#d0d0d0", textDecoration: done ? "line-through" : "none", lineHeight: 1.5 }}>{item}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* DB LIST */}
        {tab === "dblist" && (
          <div>
            <div style={{ fontSize: 12, color: "#777", marginBottom: 16 }}>Track topics to revise. Click the status icon to cycle: ⬜ To do → 🔄 In progress → ✅ Done</div>
            <div style={card({ marginBottom: 16, display: "flex", gap: 10, flexWrap: "wrap" })}>
              <select value={newDb.subjectId} onChange={e => setNewDb({ ...newDb, subjectId: e.target.value })} style={{ ...inp(), width: "auto", minWidth: 140 }}>
                {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
              </select>
              <input type="text" placeholder="Topic or task name..." value={newDb.text} onChange={e => setNewDb({ ...newDb, text: e.target.value })} onKeyDown={async e => { if (e.key === "Enter" && newDb.text.trim()) { await saveDb([...dbItems, { id: Date.now(), subjectId: newDb.subjectId, text: newDb.text.trim(), status: "todo" }]); setNewDb({ ...newDb, text: "" }); } }} style={{ ...inp(), flex: 1, minWidth: 140 }} />
              <button onClick={async () => { if (!newDb.text.trim()) return; await saveDb([...dbItems, { id: Date.now(), subjectId: newDb.subjectId, text: newDb.text.trim(), status: "todo" }]); setNewDb({ ...newDb, text: "" }); }} style={{ background: "#378ADD", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 500, cursor: "pointer", fontSize: 13 }}>+ Add</button>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              {["all", "todo", "doing", "done"].map(f => (
                <button key={f} onClick={() => setDbFilter(f)} style={{ background: dbFilter === f ? "#378ADD" : "#1a1a1a", color: dbFilter === f ? "#fff" : "#888", border: `0.5px solid ${dbFilter === f ? "#378ADD" : "#2a2a2a"}`, borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: dbFilter === f ? 500 : 400 }}>
                  {f === "all" ? "All" : f === "todo" ? "⬜ To do" : f === "doing" ? "🔄 In progress" : "✅ Done"}
                </button>
              ))}
              <select value={dbSubjectFilter} onChange={e => setDbSubjectFilter(e.target.value)} style={{ ...inp(), width: "auto", fontSize: 12, padding: "5px 10px" }}>
                <option value="all">All subjects</option>
                {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
              </select>
            </div>
            {(() => {
              const filtered = dbItems.filter(i => (dbFilter === "all" || i.status === dbFilter) && (dbSubjectFilter === "all" || i.subjectId === dbSubjectFilter));
              if (filtered.length === 0) return <div style={{ color: "#555", textAlign: "center", padding: "40px 0" }}>{dbItems.length === 0 ? "Add topics or tasks to get started!" : "Nothing here."}</div>;
              return SUBJECTS.map(s => {
                const items = filtered.filter(i => i.subjectId === s.id); if (!items.length) return null; return (
                  <div key={s.id} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 16 }}>{s.emoji}</span>
                      <span style={{ fontWeight: 500, color: s.color, fontSize: 14 }}>{s.name}</span>
                      {s.priority && <span style={{ background: "#E24B4A22", color: "#E24B4A", fontSize: 10, padding: "2px 7px", borderRadius: 4 }}>PRIORITY</span>}
                      <span style={{ fontSize: 11, color: "#555", marginLeft: 4 }}>{items.filter(i => i.status === "done").length}/{items.length} done</span>
                    </div>
                    {items.map(item => (
                      <div key={item.id} style={{ ...card({ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, padding: "10px 12px" }) }}>
                        <span style={{ fontSize: 16, cursor: "pointer", userSelect: "none" }} onClick={() => saveDb(dbItems.map(i => i.id === item.id ? { ...i, status: i.status === "todo" ? "doing" : i.status === "doing" ? "done" : "todo" } : i))}>
                          {item.status === "done" ? "✅" : item.status === "doing" ? "🔄" : "⬜"}
                        </span>
                        <span style={{ flex: 1, fontSize: 13, textDecoration: item.status === "done" ? "line-through" : "none", color: item.status === "done" ? "#444" : "#d0d0d0" }}>{item.text}</span>
                        <button onClick={() => saveDb(dbItems.filter(i => i.id !== item.id))} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 14 }}>✕</button>
                      </div>
                    ))}
                  </div>
                );
              });
            })()}
          </div>
        )}

        {/* TOPICS */}
        {tab === "topics" && (
          <div>
            <div style={{ fontSize: 12, color: "#777", marginBottom: 16 }}>Set the main topic for each paper — shown on the dashboard and log.</div>
            {SUBJECTS.map(s => (
              <div key={s.id} style={{ ...card({ marginBottom: 12 }), border: `0.5px solid ${s.color}33` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{s.emoji}</span>
                  <span style={{ fontWeight: 500, fontSize: 15, color: s.color }}>{s.name}</span>
                  {s.priority && <span style={{ background: "#E24B4A22", color: "#E24B4A", fontSize: 10, padding: "2px 7px", borderRadius: 4 }}>PRIORITY</span>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {s.papers.map(p => (
                    <div key={p.id}>
                      <div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>{p.label} <span style={{ color: "#555" }}>({fmtDate(p.date)})</span></div>
                      <input type="text" value={loaded ? (topics[p.id] ?? p.defaultTopic) : p.defaultTopic} onChange={e => setTopics({ ...topics, [p.id]: e.target.value })} onBlur={async e => { await saveTopics({ ...topics, [p.id]: e.target.value }); }} placeholder="Enter main topic..." style={inp()} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
