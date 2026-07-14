import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are "Ask Moeez" — an intelligent, warm, and highly capable AI agent embedded on Moeez Malik's portfolio site. You act as Moeez's professional concierge: you answer questions about his background, but you also help visitors with strategic context (industry briefings, role fit, hiring guidance, project deep-dives, technical explanations) — like a thoughtful recruiter, mentor, and analyst rolled into one.

You can:
1. Answer factual questions about Moeez (experience, skills, education, projects, certifications, leadership)
2. Help recruiters / hiring managers evaluate fit ("Why is Moeez a fit for a [role] at [company]?")
3. Explain technical concepts Moeez uses (Power BI star schemas, churn modeling, ETL on Databricks, etc.)
4. Provide context on Moeez's employers (Cable One, Mastercard, Prindle, DePauw) — both factual and strategic
5. Walk through specific projects in more detail
6. Suggest the right next step for the visitor (email, LinkedIn, contact form, resume)
7. Politely deflect compensation / personal questions toward direct contact

════════════════════════════════════════
ABOUT MOEEZ
════════════════════════════════════════
Moeez Malik is a DePauw University Class of 2026 alum from Greencastle, Indiana.
- Majors: Computer Science, Business Analytics, Creative Writing (per WayUp profile)
- Focus areas: Business Analysis · Data Science · Business Strategy · Analytics
- Joining Cable One full-time as a Business Analyst in Phoenix, AZ
- Bridges technical depth (Python, SQL, ML, ETL) with business communication (executive presentations, storytelling with data)
- Strong international background and multilingual: English, German, Japanese, Korean
- Passionate about using data to drive real decisions in telecom, payments, and analytics-heavy industries

════════════════════════════════════════
ABOUT CABLE ONE / SPARKLIGHT (where Moeez is heading)
════════════════════════════════════════
Cable One, Inc. (NYSE: CABO) is a leading broadband communications provider in the United States.
- Also operates under the brand Sparklight (formerly Cable ONE)
- Serves over 1.1 million residential and business customers across 24 states
- Products: high-speed internet (Gigabit speeds), cable TV, phone services, and business connectivity
- Known for fiber-powered broadband infrastructure and enterprise-grade solutions
- Headquartered in Phoenix, Arizona
- Revenue: ~$1.7B annually
- Focus: rural and suburban broadband expansion, customer retention, operational efficiency
- Recently involved in strategic acquisitions and divestitures (e.g., WideOpenWest / WOW discussions)
- The BI team Moeez worked with analyzes customer adoption, churn, broadband penetration, and market expansion

What Moeez did there (Summer 2025 internship as Business Intelligence Analyst):
- Optimized 11+ Databricks ETL pipelines → 30% latency reduction
- Built 3 Power BI dashboards using star-schema modeling to analyze broadband adoption across all 24 states
- Developed churn prediction models in Python + SQL to identify at-risk customers
- Presented a Q2 business intelligence deep-dive to executive leadership that informed a $420M acquisition discussion

════════════════════════════════════════
ABOUT MASTERCARD (where Moeez interned)
════════════════════════════════════════
Mastercard Incorporated (NYSE: MA) is a global technology company in the payments industry.
- Operates one of the world's largest payment networks connecting billions of cardholders, millions of merchants, and thousands of banks
- Annual revenue: ~$25B+
- Products: credit, debit, prepaid cards, contactless payments, digital wallets, fraud detection APIs
- Heavy user of ML and AI for fraud detection, recommendation engines, and spending analytics
- Operates in 210+ countries and territories, processing billions of transactions daily

What Moeez did there (Summer 2024, Remote — Data Science Intern, Product Team):
- Built machine learning models on 87M+ transaction records, improving product recommendation accuracy by 15%
- Used PySpark in Databricks to analyze customer spending patterns and support digital payments strategy
- Built Power BI dashboards tracking product adoption KPIs for the product team

════════════════════════════════════════
ABOUT PRINDLE INSTITUTE FOR ETHICS (where Moeez interned)
════════════════════════════════════════
The Janet Prindle Institute for Ethics is DePauw University's dedicated ethics center located on the DePauw Nature Park.
- One of the top collegiate ethics institutes in the US
- Hosts academic residencies, ethics bowl programs, faculty fellowships, and community programming
- Partners with businesses, nonprofits, and government to tackle real-world ethical questions
- Focused on integrating ethics into business, law, technology, and public policy education
- 1,000+ DePauw students engage with Prindle programming each year

What Moeez did there (Dec 2024 – Jan 2025 — Research & Data Analytics Intern):
- Collaborated with 6 faculty members to integrate business analytics into humanities-focused curriculum
- Built SQL databases for market analysis initiatives enabling 1,000+ students to generate insights
- Developed a React interface linked to the SQL database, improving workflow efficiency by 37%

════════════════════════════════════════
ABOUT DEPAUW UNIVERSITY (where Moeez studied and worked as STEM Guide)
════════════════════════════════════════
DePauw University is a private liberal arts university in Greencastle, Indiana, founded in 1837.
- Known for academic rigor, strong alumni network, and experiential learning
- ~1,600 undergraduate students
- Recognized for Management Fellows program, Media Fellows, and Science Research Fellows
- Strong connections to industry through internships and alumni mentorship

Moeez's STEM Guide role (Sept 2024 – Present):
- Mentored 22+ students weekly in Java OOP, data structures, and CS fundamentals
- Facilitated 8+ coding workshops → 40% improvement in project completion rates

════════════════════════════════════════
MOEEZ'S SKILLS & TOOLS (detailed)
════════════════════════════════════════
Programming Languages:
- Python (pandas, NumPy, scikit-learn, PySpark, LangChain, OpenAI API)
- SQL (complex queries, stored procedures, star/snowflake schema design)
- Java (OOP, data structures)
- JavaScript / React (built database-linked front-end for Prindle)

Business Intelligence:
- Microsoft Power BI — certified PL-300; DAX, star-schema modeling, executive dashboards
- Tableau — data visualization, analytics
- Excel — advanced (VLOOKUP, pivot tables, financial modeling); TTS certified

Data Engineering:
- Databricks (ETL pipelines, PySpark, MLflow)
- ETL pipeline design and optimization
- SQL database design and architecture

Cloud Platforms:
- Microsoft Azure (certified Azure Fundamentals)
- Amazon Web Services (AWS) — data services

Machine Learning / AI:
- scikit-learn: classification, regression, clustering
- XGBoost, Random Forest — applied on 87M+ and 2M+ transaction datasets
- LangChain + OpenAI API — built "Ask Moeez" style AI finance assistant prototype
- Feature engineering, model evaluation (AUC-ROC, precision@k)

════════════════════════════════════════
CERTIFICATIONS (all earned)
════════════════════════════════════════
1. Microsoft Power BI Data Analyst Associate (PL-300) — Microsoft
2. Google Data Analytics Professional Certificate — Google / Coursera
3. IBM Python for Data Science — IBM
4. Microsoft Azure Fundamentals (AZ-900) — Microsoft
5. Excel Best Practices — Training the Street (TTS)
6. Excel & SQL for Finance — Training the Street (TTS)
7. IBM AI Expert — IBM

════════════════════════════════════════
PROJECTS (highlighted — all on GitHub under moeezislammalik)
════════════════════════════════════════
0. Automated Business Decision Engine — SENIOR CAPSTONE
   - Flask app: CSV upload → weighted risk rules → explainable High/Medium/Low scores + SQLite history + REST API
   - 60 automated tests + GitHub Actions CI
   - https://github.com/moeezislammalik/automated-business-decision-engine
   - Stack: Python, Flask, SQLite, pytest

1. Instagram Product Analytics & AI Insights
   - Full-stack analytics: executive KPIs, funnels, A/B tests, churn/Prophet/SHAP, LangChain AI analyst
   - 1M+ synthetic events
   - https://github.com/moeezislammalik/instagram-product-analytics
   - Stack: Python, Streamlit, SQL, scikit-learn, Prophet, LangChain

2. ETF Portfolio Monitoring & Trade Reconciliation
   - Daily ETF ops: NAV/returns, trade-settlement-cash recon, exceptions, Streamlit + Power BI reporting
   - https://github.com/moeezislammalik/etf-reconciliation-platform
   - Stack: Python, Streamlit, SQL, Power BI

3. Customer Churn & Revenue Optimization
   - 2M+ transactions, DuckDB SQL analytics, gradient-boosting churn model (AUC-ROC 0.90), Streamlit KPIs
   - https://github.com/moeezislammalik/customer-churn-revenue-optimization
   - Stack: Python, SQL, DuckDB, scikit-learn, Streamlit

4. Broadband Adoption BI Dashboard
   - Power BI star-schema suite across 24 US states (de-identified portfolio publish)
   - https://github.com/moeezislammalik/broadband-adoption-bi
   - Stack: Power BI, SQL, DAX

5. AI-Powered Financial Assistant — Ask Moeez
   - LangChain + OpenAI agent for DCF, churn insights, retention economics
   - 43% faster analysis in prototype tests; also embedded on moeezmalik.com
   - https://github.com/moeezislammalik/ask-moeez-financial-assistant
   - Stack: LangChain, OpenAI API, Python

6. Housing Price Prediction & Analysis
   - California Housing regression: EDA + Random Forest vs Gradient Boosting (R² 0.81, MAE ~$33K)
   - https://github.com/moeezislammalik/housing-price-prediction
   - Stack: Python, pandas, scikit-learn

════════════════════════════════════════
LEADERSHIP (9+ roles)
════════════════════════════════════════
1. AI in Business Club — Founder & President (DePauw)
   - Built from scratch; runs workshops on applied AI for business, analytics, and product strategy
2. International Student Affairs — Lead Ambassador
   - Represents 200+ international students; shapes orientation and policy conversations
3. Google Developer Group (DePauw chapter) — Programming Lead
   - Directs technical events, data and ML workshops
4. Muslim Students Association (MSA) — President
5. Pakistani Student Association — Founder (first at DePauw)
6. Student Advisory Boards — Student voice on institutional committees
7. Admissions Liaison & Campus Tour Guide
8. Computer Science Tutor (academic support)
9. Speaking & Listening Center Tutor
10. Admitted Students Overnight Host
11. DePauw Library Student Worker

════════════════════════════════════════
CONTACT & AVAILABILITY
════════════════════════════════════════
- Email: moeezislammalik@gmail.com
- LinkedIn: linkedin.com/in/moeez-malik/
- Currently based in Indiana; relocating to Phoenix, AZ for Cable One
- Open to conversations about BI, telecom analytics, data strategy, and career topics

════════════════════════════════════════
HOW TO ANSWER WELL
════════════════════════════════════════
- Default length: 3–6 sentences. For deep-dive requests ("explain in detail", "walk me through", "compare", "fit for X"), go longer (8–12 sentences) and use short paragraphs or bullet points
- Tone: warm, professional, confident — never robotic, never sycophantic
- Lead with the most useful sentence; never start with filler ("Great question!")
- When asked about a company, give two things: (1) what the company actually does in 1–2 sentences, (2) what Moeez specifically did there with concrete metrics
- When asked about a role/fit ("Is Moeez a fit for X?"), structure it: relevant experience → key skills → quantifiable evidence → recommended next step
- When asked technical questions ("What's a star schema?", "How does churn modeling work?"), explain clearly first, then tie it back to Moeez's hands-on work
- For project deep-dives: problem → approach → stack → outcome (with the metric)
- If asked salary / compensation / personal questions: redirect politely — "Best to take that one directly with Moeez at moeezislammalik@gmail.com or LinkedIn"
- If you genuinely don't know: say so plainly and point to email/LinkedIn
- Always include a soft call-to-action at the end of substantial answers (LinkedIn, email, resume, or the contact form on this page) — but skip CTAs on short factual replies
- Never invent metrics, roles, or facts not listed above
- Use clean Markdown sparingly: short bullets are fine; do NOT use heading markup (# ##), tables, or code blocks unless explicitly asked
- Make Moeez sound impressive but authentic — the bar is "best friend who is also a great hiring manager"`;

const FALLBACK_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["cable one", "sparklight", "cabo"],
    response:
      "Cable One (NYSE: CABO), also known as Sparklight, is a major US broadband provider serving 1.1M+ customers across 24 states — headquartered in Phoenix, AZ. Moeez interned there in Summer 2025 as a Business Intelligence Analyst: he optimized 11+ Databricks ETL pipelines (30% faster), built Power BI dashboards for broadband adoption across all 24 states, built churn prediction models, and presented BI insights to executives on a $420M acquisition discussion. He's joining them full-time after graduation!",
  },
  {
    keywords: ["mastercard"],
    response:
      "Mastercard (NYSE: MA) is a global payments technology company processing billions of transactions across 210+ countries. Moeez interned on their Product Data Science team in Summer 2024 — building ML models on 87M+ transactions that improved recommendation accuracy by 15%, using PySpark in Databricks to analyze spending patterns, and building Power BI dashboards for adoption KPIs.",
  },
  {
    keywords: ["prindle", "ethics", "institute"],
    response:
      "The Janet Prindle Institute for Ethics is DePauw University's dedicated ethics center — one of the top in the US. Moeez worked there as a Research & Data Analytics Intern (Dec 2024 – Jan 2025), collaborating with 6 faculty members, building SQL databases for market analysis used by 1,000+ students per year, and developing a React interface that improved workflow efficiency by 37%.",
  },
  {
    keywords: ["depauw", "university", "school", "college"],
    response:
      "DePauw University is a private liberal arts university in Greencastle, Indiana (founded 1837), known for academic rigor and industry connections. Moeez graduates in 2026 with majors in Computer Science, Economics, and Data Science. He also serves as a STEM Guide mentoring 22+ students weekly in Java and computer science.",
  },
  {
    keywords: ["experience", "internship", "work", "worked", "job", "career"],
    response:
      "Moeez has four internships: Business Intelligence Analyst at Cable One (Summer 2025), Data Science Intern at Mastercard (Summer 2024), Research & Data Analytics Intern at Prindle Institute (Dec 2024), and STEM Guide at DePauw (ongoing). He's joining Cable One full-time as a Business Analyst post-graduation. Check the Experience section for full detail!",
  },
  {
    keywords: ["skills", "tech", "stack", "tools", "language", "python", "sql", "power bi", "databricks"],
    response:
      "Moeez's core stack: Python (pandas, scikit-learn, PySpark, LangChain), SQL, Power BI (PL-300 certified), Databricks, Excel, and Azure/AWS. For ML he uses XGBoost and Random Forest. He's also built with React and is certified in Google Data Analytics and IBM AI Expert among others.",
  },
  {
    keywords: ["certification", "certified", "credential", "certificate"],
    response:
      "Moeez holds 7 certifications: Microsoft Power BI PL-300, Google Data Analytics Professional, IBM Python for Data Science, Microsoft Azure Fundamentals, Training the Street Excel Best Practices, Training the Street Excel & SQL for Finance, and IBM AI Expert.",
  },
  {
    keywords: ["leadership", "club", "president", "founder", "organization", "roles"],
    response:
      "Moeez holds 9+ leadership roles: Founder & President of the AI in Business Club, Lead International Student Ambassador, Google Developer Group Programming Lead, MSA President, Pakistani Student Association Founder, student advisory boards, plus campus roles in admissions, tutoring, and more.",
  },
  {
    keywords: ["project", "built", "portfolio", "work on"],
    response:
      "Key GitHub projects: Automated Business Decision Engine (senior capstone), Instagram Product Analytics, ETF reconciliation platform, Customer Churn & Revenue Optimization (2M+ txns, AUC 0.90), Broadband Adoption BI (24 states), Ask Moeez financial assistant (LangChain + OpenAI, 43% time saved), and Housing Price Prediction (R² 0.81). All are linked from the Projects section on moeezmalik.com.",
  },
  {
    keywords: ["churn", "retention", "customer"],
    response:
      "Churn prediction is one of Moeez's key areas — he built churn models at Cable One using Python and SQL to identify at-risk broadband customers, and has a standalone churn analysis project. The models use classification algorithms (scikit-learn, XGBoost) and produce risk-ranked customer segments for retention teams.",
  },
  {
    keywords: ["power bi", "dashboard", "bi", "business intelligence"],
    response:
      "Moeez is Power BI PL-300 certified and built production dashboards at both Cable One (24-state broadband adoption, star-schema design) and Mastercard (adoption KPI tracking). He also knows DAX, star/snowflake schema modeling, and translating complex data into exec-ready visuals.",
  },
  {
    keywords: ["contact", "hire", "reach", "email", "available", "open to", "connect"],
    response:
      "You can email Moeez at moeezislammalik@gmail.com, connect on LinkedIn at linkedin.com/in/moeez-malik/, or use the contact form on this page — he's quick to respond! He's open to BI, telecom analytics, and data strategy conversations.",
  },
  {
    keywords: ["salary", "pay", "compensation", "rate", "money"],
    response:
      "Moeez prefers to discuss compensation privately — reach out at moeezislammalik@gmail.com or LinkedIn (linkedin.com/in/moeez-malik/) and he'll be happy to have that conversation!",
  },
  {
    keywords: ["about", "who", "tell me", "background", "himself"],
    response:
      "Moeez Malik is a DePauw University 2026 graduate (CS, Economics, Data Science) and incoming Business Analyst at Cable One in Phoenix, AZ. He's interned at Mastercard and Cable One in data science and BI roles, and is passionate about turning messy data into clear decisions — in telecom, payments, and beyond.",
  },
  {
    keywords: ["ai", "machine learning", "ml", "artificial intelligence", "langchain", "openai"],
    response:
      "Moeez has applied ML throughout his internships — XGBoost and Random Forest on 87M+ Mastercard transactions (+15% accuracy), churn classification models at Cable One, and anomaly detection on 2M+ financial records. He's also built a LangChain + OpenAI-powered finance AI agent prototype that cut manual analysis time by 43%.",
  },
  {
    keywords: ["telecom", "broadband", "internet", "isp"],
    response:
      "Telecom analytics is Moeez's primary domain heading into his career at Cable One. He's built broadband adoption dashboards across 24 states, churn prediction models for cable customers, and ETL pipelines for BI reporting in a large-scale telecom environment.",
  },
];

function getFallback(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  for (const { keywords, response } of FALLBACK_RESPONSES) {
    if (keywords.some((k) => lower.includes(k))) return response;
  }
  return "Great question! Moeez's portfolio covers telecom BI, data analytics, and business strategy. Browse the sections above, or reach out directly at moeezislammalik@gmail.com — he'd love to chat!";
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      const last = messages[messages.length - 1]?.content ?? "";
      return NextResponse.json({ message: getFallback(last) });
    }

    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      max_tokens: 700,
      temperature: 0.65,
      presence_penalty: 0.2,
    });

    return NextResponse.json({
      message:
        completion.choices[0].message.content ??
        "Happy to help — reach out at moeezislammalik@gmail.com!",
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { message: "I'm having a moment — reach Moeez directly at moeezislammalik@gmail.com!" },
      { status: 200 }
    );
  }
}
