"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

/* ─── Scroll progress bar ────────────────────────────── */
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(Math.min(pct, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      className="scroll-progress fixed left-0 top-0 z-[200] h-[2px] transition-[width] duration-75"
      style={{ width: `${width}%` }}
    />
  );
}

/* ─── Hero analyst snapshot (bar chart) ──────────────── */
const HERO_BARS: { label: string; value: number; display: string }[] = [
  { label: "Internships",        value: 60, display: "4"   },
  { label: "Analytics projects", value: 88, display: "20+" },
  { label: "Leadership roles",   value: 72, display: "9+"  },
  { label: "Certifications",     value: 50, display: "7+"  },
];

const TOP_SKILLS = ["Python", "Power BI", "SQL", "MS Excel", "Generative AI"];

function HeroAnalystPanel() {
  return (
    <div className="analyst-card ml-auto w-full max-w-[420px] p-5 lg:p-6 xl:max-w-[460px]">
      <div className="mb-4 flex items-center justify-between">
        <p className="section-label">At a glance</p>
        <span className="font-mono-label text-[9px] uppercase tracking-widest text-ink-faint">
          2026
        </span>
      </div>
      <div className="space-y-3.5">
        {HERO_BARS.map((bar, i) => (
          <div key={bar.label}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="text-[11px] text-ink-muted">{bar.label}</span>
              <span className="font-mono-label text-xs font-semibold text-ink">
                {bar.display}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-subtle">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="bar-animate h-full origin-left rounded-full bg-ink"
                style={{ width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-border pt-3.5">
        <p className="font-mono-label text-[9px] uppercase tracking-widest text-ink-faint">Top skills</p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">
          {TOP_SKILLS.join(" · ")}
        </p>
      </div>
    </div>
  );
}

/* ─── Animation variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

/* ─── Rotating headline phrases ──────────────────────── */
const rotatingTags = [
  "Data & Business Strategy",
  "Telecom Analytics",
  "Business Intelligence & Insights",
  "Turning Data into Decisions",
];

/* ─── Experience ─────────────────────────────────────── */
type CatColor = "blue" | "emerald" | "amber" | "violet" | "rose";

const experiences: {
  role: string;
  company: string;
  location: string;
  period: string;
  logo: string;
  logoBg: string;
  logoBgDark: string;
  logoAspect: "wide" | "square";
  metrics: string[];
  points: string[];
  link?: string;
  category: CatColor;
  categoryLabel: string;
}[] = [
  {
    role: "Business Analytics Intern, Business Intelligence",
    company: "Cable One (Sparklight)",
    location: "Phoenix, AZ",
    period: "May 2025 – Aug 2025",
    logo: "/logos/cableone.png",
    logoBg: "bg-white",
    logoBgDark: "dark:bg-white",
    logoAspect: "wide",
    metrics: ["11+ ETL pipelines", "30% latency ↓", "24-state BI rollout", "$420M context"],
    points: [
      "Optimized 11+ Databricks ETL pipelines reducing latency by 30% and improving BI dashboard performance.",
      "Built 3 Power BI dashboards with star-schema modeling to analyze broadband adoption across 24 states.",
      "Developed churn prediction models in Python + SQL identifying key customer risk drivers for retention.",
      "Presented Q2 BI deep-dive to executive leadership — directly informing a $420M acquisition discussion.",
    ],
    link: "https://www.cableone.net/",
    category: "blue",
    categoryLabel: "Telecom BI",
  },
  {
    role: "Data Analytics Intern - Product",
    company: "Mastercard",
    location: "Remote",
    period: "June 2024 – Aug 2024",
    logo: "/logos/mastercard.png",
    logoBg: "bg-white",
    logoBgDark: "dark:bg-white",
    logoAspect: "wide",
    metrics: ["87M+ transactions modeled", "+15% accuracy", "PySpark + Databricks"],
    points: [
      "Built ML models on 87M+ transactions improving product recommendation accuracy by 15%.",
      "Applied PySpark in Databricks to identify customer spending patterns supporting digital payments strategy.",
      "Built Power BI dashboards to track adoption KPIs and improve product team decision-making.",
    ],
    link: "https://www.mastercard.com/",
    category: "amber",
    categoryLabel: "Payments DS",
  },
  {
    role: "Research & Data Analytics Intern",
    company: "Prindle Institute of Ethics",
    location: "Greencastle, IN",
    period: "Dec 2024 – Jan 2025",
    logo: "/logos/prindle.png",
    logoBg: "bg-white",
    logoBgDark: "dark:bg-white",
    logoAspect: "wide",
    metrics: ["6 faculty partners", "1,000+ students / yr", "37% efficiency ↑"],
    points: [
      "Collaborated with 6 faculty on analytics-in-humanities curriculum projects.",
      "Built SQL databases for market analysis initiatives, serving 1,000+ students annually.",
      "Developed React interface linked to the database, improving workflow efficiency by 37%.",
    ],
    link: "https://www.depauw.edu/prindle-institute/",
    category: "violet",
    categoryLabel: "Research",
  },
  {
    role: "Software Development STEM Guide",
    company: "DePauw University",
    location: "Greencastle, IN",
    period: "Sept 2024 – Present",
    logo: "/depauw/tigers.png",
    logoBg: "bg-[#F0F4FF]",
    logoBgDark: "dark:bg-white",
    logoAspect: "square",
    metrics: ["22+ students / week", "8+ workshops", "+40% completion ↑"],
    points: [
      "Mentored 22+ students weekly in Java OOP, guiding coursework, projects, and lab-based learning.",
      "Facilitated 8+ coding workshops that increased engagement and project completion by 40%.",
    ],
    link: "https://www.depauw.edu/academics/departments-programs/computer-science/",
    category: "emerald",
    categoryLabel: "Teaching",
  },
];

/* ─── Projects (no charts — clean metric chips) ─────── */
const projects: {
  title: string;
  description: string;
  impact: string;
  tools: string;
  icon: string;
  chips: string[];
  link?: string;
  linkLabel?: string;
}[] = [
  {
    title: "Automated Business Decision Engine",
    description:
      "Senior capstone — Flask web app that ingests CSV business data, applies weighted risk rules, scores each record, and returns explainable High / Medium / Low classifications with SQLite history and a REST API.",
    impact: "Replaces routine manual analyst review with a transparent, testable decision pipeline (60 automated tests + CI).",
    tools: "Python · Flask · SQLite · pytest · GitHub Actions",
    icon: "/logos/python.svg",
    chips: ["Senior capstone", "Explainable scoring", "REST API + CI"],
    link: "https://github.com/moeezislammalik/automated-business-decision-engine",
    linkLabel: "View on GitHub",
  },
  {
    title: "Instagram Product Analytics & AI Insights",
    description:
      "Full-stack product analytics platform inspired by Meta’s Instagram team — executive KPIs, funnels, A/B testing, churn/Prophet forecasting, SHAP explainability, and a LangChain AI analyst over synthetic event data.",
    impact: "One portfolio system covering BI, experimentation, ML, and natural-language analytics end to end.",
    tools: "Python · Streamlit · SQL · scikit-learn · Prophet · LangChain",
    icon: "/logos/python.svg",
    chips: ["1M+ synthetic events", "A/B + forecasting", "AI product analyst"],
    link: "https://github.com/moeezislammalik/instagram-product-analytics",
    linkLabel: "View on GitHub",
  },
  {
    title: "ETF Portfolio Monitoring & Trade Reconciliation",
    description:
      "Operations platform for daily ETF portfolio monitoring — NAV and returns, trade/settlement/cash reconciliation, exception detection, and reporting via Streamlit dashboards and exports.",
    impact: "Automates the ingest → reconcile → exception → report loop used by asset-management ops teams.",
    tools: "Python · Streamlit · SQL · Power BI",
    icon: "/logos/python.svg",
    chips: ["Trade reconciliation", "Exception management", "Ops dashboards"],
    link: "https://github.com/moeezislammalik/etf-reconciliation-platform",
    linkLabel: "View on GitHub",
  },
  {
    title: "Customer Churn & Revenue Optimization",
    description:
      "Analyzed 2M+ transaction records with Python and SQL (DuckDB) to identify churn drivers and revenue leakage, with Streamlit KPI dashboards and a gradient-boosting churn model.",
    impact: "AUC-ROC 0.90 with ~20% fewer false positives — sharper retention targeting and leakage visibility.",
    tools: "Python · SQL · DuckDB · scikit-learn · Streamlit",
    icon: "/logos/python.svg",
    chips: ["2M+ transactions", "AUC-ROC 0.90", "Revenue leakage"],
    link: "https://github.com/moeezislammalik/customer-churn-revenue-optimization",
    linkLabel: "View on GitHub",
  },
  {
    title: "Broadband Adoption BI Dashboard",
    description:
      "Power BI star-schema executive suite for broadband adoption across 24 states — adoption rate, penetration, gap analysis, and trend monitoring (de-identified for portfolio).",
    impact: "Single scalable BI source improving cross-market visibility for leadership.",
    tools: "Power BI · SQL · DAX · star schema",
    icon: "/logos/powerbi.svg",
    chips: ["24 US states", "Star schema BI", "Executive PDF suite"],
    link: "https://github.com/moeezislammalik/broadband-adoption-bi",
    linkLabel: "View on GitHub",
  },
  {
    title: "AI-Powered Financial Assistant — Ask Moeez",
    description:
      "J.P. Morgan–inspired AI agent using LangChain and the OpenAI API to automate financial analysis (DCF, churn insights, retention economics) for faster BI workflows.",
    impact: "Reduced analysis time by 43% while enabling faster, data-driven decision making.",
    tools: "LangChain · OpenAI API · Python",
    icon: "/logos/python.svg",
    chips: ["43% time saved", "DCF + churn tools", "LangChain agent"],
    link: "https://github.com/moeezislammalik/ask-moeez-financial-assistant",
    linkLabel: "View on GitHub",
  },
  {
    title: "Housing Price Prediction & Analysis",
    description:
      "Regression pipeline on the California Housing dataset — EDA, feature engineering, and Random Forest vs Gradient Boosting with ranked price-driver importances.",
    impact: "Best model R² 0.81 with ~$33K MAE — clear story from raw housing features to interpretable drivers (income, occupancy, location).",
    tools: "Python · pandas · scikit-learn",
    icon: "/logos/python.svg",
    chips: ["R² 0.81", "20K+ homes", "Feature importance"],
    link: "https://github.com/moeezislammalik/housing-price-prediction",
    linkLabel: "View on GitHub",
  },
];

/* ─── Certifications ─────────────────────────────────── */
const certifications = [
  { title: "Microsoft Power BI PL-300", issuer: "Microsoft", logo: "/badges/microsoft.svg" },
  { title: "Google Data Analytics", issuer: "Google", logo: "/badges/google.svg" },
  { title: "IBM Python for Data Science", issuer: "IBM", logo: "/badges/ibm.svg" },
  { title: "Microsoft Azure Fundamentals", issuer: "Microsoft", logo: "/badges/microsoft.svg" },
  { title: "Excel Best Practices", issuer: "Training the Street", logo: "/logos/excel.svg" },
  { title: "Excel & SQL for Finance", issuer: "Training the Street", logo: "/logos/sql.svg" },
  { title: "Databricks Lakehouse Fundamentals", issuer: "Databricks", logo: "/logos/databricks.svg" },
  { title: "Tableau Desktop Specialist", issuer: "Tableau", logo: "/logos/tableau.svg" },
];

/* ─── Skills ─────────────────────────────────────────── */
const skillGroups: { title: string; icon: string; tags: string[] }[] = [
  {
    title: "Data Analysis",
    icon: "/logos/sql.svg",
    tags: ["SQL", "Python", "pandas", "NumPy", "Data cleaning", "Exploratory analysis"],
  },
  {
    title: "Business Intelligence",
    icon: "/logos/powerbi.svg",
    tags: ["Power BI", "Tableau", "DAX", "KPI reporting", "Dashboards"],
  },
  {
    title: "Analytics & Modeling",
    icon: "/logos/python.svg",
    tags: ["Predictive modeling", "Churn analysis", "ML pipelines", "ETL design", "Statistics"],
  },
  {
    title: "Tools & Cloud",
    icon: "/logos/databricks.svg",
    tags: ["Databricks", "PySpark", "Azure", "AWS", "Excel", "Git / GitHub"],
  },
];

/* ─── Combined Leadership & Campus Experiences ───────── */
type LeadershipEntry = {
  title: string;
  role: string;
  desc: string;
  abbr: string;
  category: CatColor;
  categoryLabel: string;
  link?: string;
  linkLabel?: string;
};

const leadershipAll: LeadershipEntry[] = [
  {
    title: "AI in Business Club",
    role: "Founder & President",
    desc: "Launched and leads a student organization applying AI to business, analytics, and product strategy — building workshops and industry connections.",
    abbr: "AI",
    category: "blue",
    categoryLabel: "Founder",
    link: "https://www.linkedin.com/in/moeez-malik/",
    linkLabel: "LinkedIn",
  },
  {
    title: "International Student Affairs",
    role: "Lead Ambassador",
    desc: "Represents the international community on key campus initiatives, orientation, and policy discussions — serving 200+ international students annually.",
    abbr: "ISA",
    category: "rose",
    categoryLabel: "International",
    link: "https://www.instagram.com/p/DMwTx4Usgxo/",
    linkLabel: "Ambassador spotlight",
  },
  {
    title: "Google Developer Group",
    role: "Programming Lead",
    desc: "Directs hands-on events and project tracks connecting peers with data, ML, and software skills.",
    abbr: "GDG",
    category: "blue",
    categoryLabel: "Tech Lead",
    link: "https://gdg.community.dev/",
    linkLabel: "GDG",
  },
  {
    title: "Muslim Students Association",
    role: "President",
    desc: "Leads the MSA community at DePauw — coordinating cultural programming, weekly gatherings, and inter-faith dialogue across campus.",
    abbr: "MSA",
    category: "emerald",
    categoryLabel: "President",
  },
  {
    title: "Pakistani Student Association",
    role: "Founder",
    desc: "First-ever Pakistani student organization at DePauw — cultural events, mentorship for incoming international students, and South-Asian community building.",
    abbr: "PSA",
    category: "rose",
    categoryLabel: "Founder",
  },
  {
    title: "Student Advisory Boards",
    role: "Student Voice",
    desc: "Serves on institutional committees representing student perspectives on academic policy, campus life, and strategic initiatives.",
    abbr: "SAB",
    category: "violet",
    categoryLabel: "Governance",
  },
  {
    title: "Admissions Liaison & Campus Tour Guide",
    role: "DePauw Admissions",
    desc: "Led prospective-student tours and represented DePauw's academic and cultural identity to thousands of visiting families.",
    abbr: "DA",
    category: "amber",
    categoryLabel: "Admissions",
    link: "https://www.depauw.edu/admission-aid/",
    linkLabel: "DePauw Admissions",
  },
  {
    title: "Speaking & Listening Center Tutor",
    role: "DePauw S Center",
    desc: "Coached peers on communication, presentation delivery, and interview prep across disciplines — at DePauw's Learning Commons.",
    abbr: "SC",
    category: "violet",
    categoryLabel: "Tutoring",
    link: "https://www.depauw.edu/academics/academic-resources/academic-resource-center/s-center/",
    linkLabel: "S Center",
  },
  {
    title: "DePauw Library Student Worker",
    role: "Roy O. West Library",
    desc: "Supported library operations and research assistance while managing a full academic and internship schedule.",
    abbr: "ROW",
    category: "emerald",
    categoryLabel: "Library",
    link: "https://library.depauw.edu/",
    linkLabel: "DePauw Library",
  },
];

/* ─── Platform icons ─────────────────────────────────── */
const platformIcons = [
  { src: "/logos/databricks.svg", name: "Databricks" },
  { src: "/logos/powerbi.svg", name: "Power BI" },
  { src: "/logos/python.svg", name: "Python" },
  { src: "/logos/sql.svg", name: "SQL" },
  { src: "/logos/tableau.svg", name: "Tableau" },
  { src: "/logos/aws.svg", name: "AWS" },
  { src: "/logos/azure.svg", name: "Azure" },
  { src: "/logos/excel.svg", name: "Excel" },
  { src: "/logos/react.svg", name: "React" },
  { src: "/logos/github.svg", name: "GitHub" },
];

/* ─── Nav ────────────────────────────────────────────── */
const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/* ══════════════════════════════════════════════════════
   Experience flashcard — click to expand
══════════════════════════════════════════════════════ */
function ExperienceFlashCard({
  ex,
  idx,
  isOpen,
  onToggle,
}: {
  ex: typeof experiences[number];
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article variants={fadeUp} className="relative pb-6 last:pb-0">
      <div
        className="absolute left-0 top-3 h-[15px] w-[15px] rounded-full border-2 border-ink bg-surface"
        aria-hidden
      />
      <div
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Collapse" : "Expand"} details for ${ex.role} at ${ex.company}`}
        className={`flashcard group ml-6 overflow-hidden ${isOpen ? "is-open" : ""}`}
      >
        {/* Front face — always visible */}
        <div className="flex items-center gap-4 p-4 md:p-5">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border ${ex.logoBg} ${ex.logoBgDark} p-1.5`}>
            <div className="relative h-full w-full">
              <Image src={ex.logo} alt={ex.company} fill className="object-contain object-center" sizes="48px" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink md:text-base">{ex.role}</p>
            <p className="mt-0.5 truncate text-xs text-ink-muted">
              <span className="font-medium text-ink">{ex.company}</span>
              <span className="mx-1.5 text-ink-faint">&middot;</span>
              {ex.location}
            </p>
            {idx === 0 && (
              <p className="mt-1 font-mono-label text-[10px] uppercase tracking-widest text-ink-faint">
                Most recent
              </p>
            )}
          </div>
          <div className="hidden flex-col items-end gap-1 sm:flex">
            <p className="font-mono-label text-[10px] uppercase tracking-widest text-ink-faint">{ex.period}</p>
            <span className="font-mono-label text-[10px] text-ink-faint transition group-hover:text-ink">
              {isOpen ? "Close \u2191" : "Open \u2193"}
            </span>
          </div>
        </div>

        {/* Back face — expanded details */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border bg-surface-subtle px-4 py-4 md:px-5 md:py-5">
                {ex.metrics.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {ex.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-md border border-border bg-surface px-2 py-1 font-mono-label text-[10px] font-medium text-ink-muted"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                )}
                <ul className="space-y-2">
                  {ex.points.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                      <span className="mt-2 h-px w-3 shrink-0 bg-ink" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {ex.link && (
                  <a
                    href={ex.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink transition hover:underline"
                  >
                    Visit {ex.company}
                    <span className="font-mono-label text-[10px]">&#8599;</span>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════════
   Ask Moeez — floating AI chatbot
══════════════════════════════════════════════════════ */
const QUICK_PROMPTS: string[] = [
  "Why is Moeez a strong fit for a Business Analyst role?",
  "Tell me about his senior capstone project",
  "Walk me through his Cable One BI work",
  "What's his approach to churn modeling?",
  "Explain his Power BI and star-schema work",
  "What are his strongest analytics skills?",
  "What certifications does he hold?",
  "Is he open to data science roles?",
];

const FOLLOW_UPS: string[] = [
  "Tell me more about that project",
  "What stack did he use?",
  "How can I reach him?",
];

function AskMoeez() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [promptsUsed, setPromptsUsed] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Moeez's AI agent — I know his work at Cable One, Mastercard, and Prindle, his projects, his stack, and his career goals. Ask me anything, including:\n\n• How he'd fit a specific role\n• Deep-dives into any project\n• Technical questions (Power BI, churn modeling, ETL, etc.)\n• How to reach him\n\nOr tap a quick prompt below to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 180) setShown(true); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [messages, open]);

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;
    setPromptsUsed(true);
    const userMsg = { role: "user" as const, content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Having trouble connecting — reach Moeez at moeezislammalik@gmail.com!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      role: "assistant",
      content: "Chat cleared! Ask me anything about Moeez's background, skills, or experience 🚀",
    }]);
    setPromptsUsed(false);
  };

  return (
    <>
      {/* Floating trigger — card style with avatar, status, typing indicator */}
      <AnimatePresence>
        {shown && !open && (
          <motion.button
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            onClick={() => setOpen(true)}
            className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-border bg-surface py-2.5 pl-2.5 pr-4 text-left shadow-[0_12px_36px_rgba(0,0,0,0.10)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_18px_50px_rgba(0,0,0,0.16)] dark:bg-surface-elevated dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)] dark:hover:border-surface"
            aria-label="Open Ask Moeez AI chat"
          >
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono-label text-[11px] font-semibold text-surface dark:bg-surface dark:text-ink">
                MM
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-surface bg-ink dark:border-surface-elevated dark:bg-surface">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-surface dark:bg-ink" />
              </span>
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] font-medium leading-none text-ink">Ask my AI</p>
              <div className="mt-1.5 flex items-center gap-1.5 font-mono-label text-[9px] uppercase tracking-widest text-ink-faint">
                <span>Moeez</span>
                <span className="text-ink-faint">&middot;</span>
                <span className="flex items-end gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="block h-1 w-1 rounded-full bg-ink-faint"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
                    />
                  ))}
                </span>
              </div>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 text-ink-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-ink"
              aria-hidden
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.93 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 flex w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-[0_8px_48px_rgba(0,0,0,0.16)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.55)]"
            style={{ maxHeight: "min(640px, calc(100dvh - 40px))" }}
          >
            <div className="relative flex items-center justify-between border-b border-border bg-surface-subtle px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface font-mono-label text-[10px] font-semibold text-ink">
                  MM
                </div>
                <div>
                  <p className="text-sm font-medium leading-none text-ink">Ask Moeez</p>
                  <p className="mt-0.5 font-mono-label text-[10px] text-ink-faint">AI agent &middot; portfolio assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-ink-faint transition hover:bg-surface-subtle hover:text-ink"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
                  </svg>
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-ink-faint transition hover:bg-surface-subtle hover:text-ink"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto bg-surface-subtle p-3">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {m.role === "assistant" && (
                      <div className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-surface font-mono-label text-[9px] text-ink">
                        MM
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] whitespace-pre-wrap rounded-lg px-3 py-2.5 text-xs leading-relaxed ${
                        m.role === "user"
                          ? "bg-ink text-surface dark:bg-surface-elevated dark:text-ink"
                          : "border border-border bg-surface text-ink-muted"
                      }`}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-surface font-mono-label text-[9px]">MM</div>
                  <div className="rounded-lg border border-border bg-surface px-4 py-3">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: d * 0.15, ease: "easeInOut" }}
                          className="block h-1.5 w-1.5 rounded-full bg-accent"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick prompt chips */}
              {!promptsUsed && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2 pt-1"
                >
                  <p className="font-mono-label text-[9px] uppercase tracking-widest text-ink-faint">
                    Suggested prompts
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-medium text-ink-muted transition hover:border-ink hover:text-ink"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Follow-up chips after first answer */}
              {promptsUsed && !loading && messages.length >= 2 && messages[messages.length - 1].role === "assistant" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-1.5 pt-1"
                >
                  {FOLLOW_UPS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-medium text-ink-muted transition hover:border-ink hover:text-ink"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input bar */}
            <div className="border-t border-border bg-surface p-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask anything — projects, fit, skills, Cable One…"
                  className="min-w-0 flex-1 rounded-md border border-border bg-surface-subtle px-3 py-2 text-xs text-ink outline-none transition placeholder:text-ink-faint focus:border-accent"
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-white transition disabled:opacity-35"
                  aria-label="Send"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </motion.button>
              </div>
              <p className="mt-2 text-center font-mono-label text-[9px] uppercase tracking-widest text-ink-faint">
                Trained on Moeez&apos;s portfolio &middot; reach him at{" "}
                <a href="mailto:moeezislammalik@gmail.com" className="text-ink hover:underline">email</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   Contact Form
══════════════════════════════════════════════════════ */
const MSG_LIMIT = 800;
const CONTACT_SUBJECTS = ["Job opportunity", "Collaboration", "Data consulting", "Just saying hi 👋"] as const;
type ContactSubject = typeof CONTACT_SUBJECTS[number];

const SUBJECT_ICONS: Record<ContactSubject, string> = {
  "Job opportunity": "💼",
  "Collaboration": "🤝",
  "Data consulting": "📊",
  "Just saying hi 👋": "✌️",
};

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [subject, setSubject] = useState<ContactSubject | "">("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Builds a mailto: link with the current form contents so the user can
  // hand-deliver the message via their own email app if our server can't
  // reach the mail relay. This is the always-available fallback.
  const mailtoFallback = () => {
    const subj = subject
      ? `[${subject}] Portfolio message from ${form.name || "Visitor"}${form.company ? ` at ${form.company}` : ""}`
      : `Portfolio message from ${form.name || "Visitor"}${form.company ? ` at ${form.company}` : ""}`;
    const lines = [
      `From: ${form.name || "(name)"}`,
      `Email: ${form.email || "(your email)"}`,
      form.company ? `Company: ${form.company}` : "",
      "",
      form.message || "(your message)",
    ].filter(Boolean);
    const params = new URLSearchParams({ subject: subj, body: lines.join("\n") });
    return `mailto:moeezislammalik@gmail.com?${params.toString()}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", message: "" });
        setSubject("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.1 }}
          className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-surface-subtle text-4xl"
        >
          🎉
        </motion.div>
        <h3 className="font-display text-2xl text-ink">Message sent!</h3>
        <p className="mt-2 text-sm text-ink-muted">Moeez will be in touch within 24 hours.</p>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
          <span className="text-accent">✓</span>
          <span>Delivered to moeezislammalik@gmail.com</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-md border border-border bg-surface-subtle px-5 py-2.5 text-xs font-medium text-ink-muted transition hover:border-accent hover:text-accent"
        >
          Send another message →
        </motion.button>
      </motion.div>
    );
  }

  const submitLabel =
    subject === "Job opportunity" ? "Send to Moeez 💼" :
    subject === "Collaboration" ? "Let's collab 🤝" :
    subject === "Data consulting" ? "Request consult 📊" :
    "Send message →";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Subject chips */}
      <div>
        <label className="mb-2 block font-mono-label text-[10px] uppercase tracking-widest text-ink-faint">
          What&apos;s this about?
        </label>
        <div className="flex flex-wrap gap-2">
          {CONTACT_SUBJECTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSubject(s === subject ? "" : s)}
              className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${
                subject === s
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-surface text-ink-muted hover:border-accent hover:text-accent"
              }`}
            >
              <span>{SUBJECT_ICONS[s]}</span>
              <span>{s}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="group">
          <label className="mb-1 block font-mono-label text-[10px] uppercase tracking-widest text-ink-faint">
            Name *
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono-label text-[10px] uppercase tracking-widest text-ink-faint">
            Email *
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-accent"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#4B5563] dark:text-slate-400">
          Company / Organization
        </label>
        <input
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Optional"
          className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-accent"
        />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
        <label className="block font-mono-label text-[10px] uppercase tracking-widest text-ink-faint">
            Message *
          </label>
          <span className={`text-[10px] font-medium ${form.message.length > MSG_LIMIT * 0.9 ? "text-red-500" : "text-[#9CA3AF] dark:text-slate-500"}`}>
            {form.message.length}/{MSG_LIMIT}
          </span>
        </div>
        <textarea
          required
          rows={4}
          maxLength={MSG_LIMIT}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell Moeez what's on your mind…"
          className="w-full resize-none rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-accent"
        />
      </div>
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md border border-amber-300/70 bg-amber-50 p-4 dark:border-amber-400/30 dark:bg-amber-900/20"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-lg" aria-hidden>⚠️</span>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                Our mail relay is temporarily unreachable.
              </p>
              <p className="text-xs leading-relaxed text-amber-800/90 dark:text-amber-200/80">
                Your message hasn&apos;t been lost — you can deliver it instantly through your own email app, or try sending again.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={mailtoFallback()}
                  className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-surface transition hover:bg-accent dark:bg-surface dark:text-ink dark:hover:bg-accent dark:hover:text-white"
                >
                  ✉ Open in email app
                </a>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="inline-flex items-center gap-1.5 rounded-md border border-amber-400/60 px-3 py-1.5 text-xs font-medium text-amber-900 transition hover:bg-amber-100 dark:text-amber-200 dark:hover:bg-amber-900/40"
                >
                  ↻ Try again
                </button>
                <a
                  href="mailto:moeezislammalik@gmail.com"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-900/80 underline-offset-2 hover:underline dark:text-amber-200/80"
                >
                  moeezislammalik@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <motion.button
        whileHover={{ scale: 1.015, y: -1 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "loading"}
        className="w-full justify-center rounded-md bg-ink py-3 text-sm font-medium text-surface transition hover:bg-accent disabled:opacity-60 dark:bg-surface dark:text-ink dark:hover:bg-accent dark:hover:text-white"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
            </svg>
            Sending…
          </span>
        ) : submitLabel}
      </motion.button>
    </form>
  );
}

/* ─── Shared section frame ───────────────────────────── */
function SectionFrame({
  id,
  children,
  bg = "white",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  bg?: "white" | "section";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-b border-border py-16 md:py-24 ${
        bg === "section" ? "bg-surface-subtle" : "bg-surface"
      } ${className}`}
    >
      <div className="section-wrap">{children}</div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   HOME
══════════════════════════════════════════════════════ */
export default function Home() {
  const [t, setT] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [openExperiences, setOpenExperiences] = useState<Set<number>>(new Set([0]));
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const id = setInterval(() => setT((i) => (i + 1) % rotatingTags.length), 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-surface text-ink">
      <ScrollProgress />

      {/* ── Nav ─────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-surface/95 shadow-sm backdrop-blur"
            : "border-transparent bg-surface"
        }`}
      >
        <div className="section-wrap flex items-center justify-between py-3.5">
          <a
            href="#top"
            aria-label="MIM — Moeez Islam Malik, Home"
            className="group inline-flex items-center gap-2.5 text-ink transition hover:text-accent"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md bg-navy font-display text-[13px] font-bold leading-none tracking-tight text-white shadow-sm transition group-hover:scale-[1.03]">
              MIM
            </span>
            <span className="hidden font-display text-base font-normal sm:inline">
              Moeez Malik
            </span>
          </a>
          <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Primary">
            {nav.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="nav-link">
                {l.label}
              </a>
            ))}
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="ml-2 shrink-0 rounded-md p-1.5 text-ink-muted transition hover:bg-surface-subtle hover:text-ink"
            >
              {darkMode ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      <div id="top" />

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border pb-12 pt-16 md:pb-20 md:pt-24">
        <div className="pointer-events-none absolute inset-0 data-grid-bg grid-reveal opacity-40" aria-hidden />
        <div className="section-wrap relative">
          <div className="hero-grid grid items-center gap-10 md:gap-8">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="max-w-2xl space-y-5"
            >
              <motion.p variants={fadeUp} className="section-label">
                Business Analysis &middot; Data Science &middot; Strategy
              </motion.p>

              <motion.div variants={fadeUp}>
                <h1 className="font-display text-5xl font-normal leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-[68px] lg:text-[76px]">
                  Moeez Malik
                </h1>
                <div className="hero-accent-line mt-3 h-px w-20 bg-accent" />
              </motion.div>

              <motion.p variants={fadeUp} className="text-base text-ink-muted md:text-lg">
                DePauw Alum &apos;26 &middot; Business Analyst at Cable One
              </motion.p>

              <motion.div variants={fadeUp} className="flex h-7 items-center gap-1.5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={rotatingTags[t]}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28 }}
                    className="font-mono-label text-sm text-ink-faint"
                  >
                    {rotatingTags[t]}
                  </motion.p>
                </AnimatePresence>
                <span className="inline-block h-4 w-px animate-pulse bg-accent" />
              </motion.div>

              <motion.p variants={fadeUp} className="max-w-lg text-sm leading-relaxed text-ink-muted">
                I turn complex operational and customer data into clear metrics, models, and dashboards,
                connecting analytics to decisions that move telecom and business forward.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <motion.a href="#contact" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="btn-primary">
                  Get in touch
                </motion.a>
                <motion.a
                  href="/MoeezMalik_Resume_2026-2.pdf"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  Download resume
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-full md:ml-auto md:mr-0"
            >
              <HeroAnalystPanel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DePauw spotlight quote band ──────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-navy py-20 md:py-28">
        {/* Subtle inset border + faint pattern for editorial feel */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>
        <div className="section-wrap relative">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14"
          >
            <div className="max-w-3xl">
              <p className="font-mono-label text-[10px] uppercase tracking-widest text-white/55">
                DePauw University &middot; Community Stories
              </p>
              <blockquote className="relative mt-5">
                <span
                  className="pointer-events-none absolute -left-2 -top-7 select-none font-display text-7xl leading-none text-white/15 md:-left-6 md:-top-12 md:text-[110px]"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="font-display text-2xl leading-snug text-white md:text-3xl lg:text-[36px] lg:leading-[1.18]">
                  Leadership should always include two things: initiative and empathy. If you don&rsquo;t show those two things, you cannot be a good leader.
                </p>
              </blockquote>
              <footer className="mt-7 flex items-center gap-3 text-sm text-white/70">
                <span className="h-px w-8 bg-white/40" />
                <span>Moeez Malik &middot; DePauw Spotlight, 2026</span>
              </footer>
            </div>
            <a
              href="https://www.depauw.edu/about/our-community-stories/details/moeez-islam-malik/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-md border border-white/20 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/[0.08] md:self-auto"
            >
              <span>Read the full story</span>
              <span className="font-mono-label text-xs transition group-hover:translate-x-0.5">&#8599;</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────── */}
      <section id="about" className="border-b border-border bg-surface py-16 md:py-24">
        <div className="section-wrap">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="grid items-start gap-12 md:grid-cols-2"
          >
            <motion.div variants={fadeUp} className="space-y-5">
              <p className="section-label">About</p>
              <h2 className="section-title">Data that drives decisions</h2>
              <div className="h-px w-12 bg-accent" />
              <p className="text-sm leading-relaxed text-ink-muted md:text-base">
                I am a DePauw University Class of 2026 graduate with a dual background in Computer Science and
                Business Analytics, focused on using data to drive strategic decision-making.
              </p>
              <p className="text-sm leading-relaxed text-ink-muted">
                My experience spans business analytics and data science across telecom and financial services.
                At Cable One, I worked on ETL optimization, Power BI dashboards, and churn modeling to support
                business intelligence initiatives. At Mastercard, I applied machine learning on large-scale
                transaction data to improve product recommendations and analyze customer behavior.
              </p>
              <p className="text-sm leading-relaxed text-ink-muted">
                Beyond industry, I have led multiple campus initiatives and conducted applied analytics
                research, strengthening my ability to translate data into clear, actionable insights. I am
                particularly interested in roles that combine analytics, data science, and business strategy
                to drive meaningful impact.
              </p>

              <div className="grid grid-cols-3 gap-3 border-t border-border pt-5">
                {[
                  { k: "Class", v: "DePauw 2026" },
                  { k: "Role", v: "Business Analyst" },
                  { k: "Industry", v: "Telecom + BI" },
                ].map((s) => (
                  <div key={s.k}>
                    <p className="font-mono-label text-[10px] uppercase tracking-widest text-ink-faint">{s.k}</p>
                    <p className="mt-1 text-sm font-medium text-ink">{s.v}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#experience" className="btn-accent">View experience</a>
                <a
                  href="https://www.linkedin.com/in/moeez-malik/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mx-auto w-full max-w-sm md:max-w-md">
              <div className="overflow-hidden rounded-lg border border-border">
                <Image
                  src="/images/profile.jpg"
                  alt="Moeez Malik — Business Analyst"
                  width={720}
                  height={900}
                  className="h-auto w-full object-cover transition duration-500 hover:scale-[1.02]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Experience (flashcards) ──────────────────────── */}
      <SectionFrame id="experience" bg="white">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label">Experience</p>
              <h2 className="section-title">Where I&apos;ve worked</h2>
              <p className="mt-2 max-w-xl text-sm text-ink-muted">
                Internships and analytical roles across telecom, payments, and education.
                <span className="ml-1 font-medium text-ink">Click a card</span> to expand details.
              </p>
            </div>
            <button
              onClick={() => {
                const allOpen = openExperiences.size === experiences.length;
                setOpenExperiences(allOpen ? new Set() : new Set(experiences.map((_, i) => i)));
              }}
              className="self-start rounded-md border border-border bg-surface px-3 py-1.5 font-mono-label text-[10px] uppercase tracking-widest text-ink-muted transition hover:border-accent hover:text-accent"
            >
              {openExperiences.size === experiences.length ? "Collapse all" : "Expand all"}
            </button>
          </motion.div>

          <div className="relative pl-0">
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border" aria-hidden />
            {experiences.map((ex, idx) => (
              <ExperienceFlashCard
                key={ex.company}
                ex={ex}
                idx={idx}
                isOpen={openExperiences.has(idx)}
                onToggle={() => {
                  setOpenExperiences((prev) => {
                    const next = new Set(prev);
                    if (next.has(idx)) next.delete(idx);
                    else next.add(idx);
                    return next;
                  });
                }}
              />
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-10 border-t border-border pt-6">
            <p className="mb-4 text-center font-mono-label text-[10px] uppercase tracking-widest text-ink-faint">Tools & platforms</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {platformIcons.map((p) => (
                <div
                  key={p.name}
                  title={p.name}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white p-2 transition hover:-translate-y-0.5 hover:shadow-md dark:border-transparent"
                >
                  <Image src={p.src} alt={p.name} width={24} height={24} className="h-5 w-5" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </SectionFrame>

      {/* ── Projects ─────────────────────────────────────── */}
      <SectionFrame id="projects" bg="section">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <p className="section-label">Projects</p>
            <h2 className="section-title">Analytics work</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-muted">
              BI, analytics, and ML projects spanning telecom, markets, product, and housing — each linked to GitHub.
            </p>
          </motion.div>

          {/* Featured project */}
          <motion.div variants={fadeUp} className="analyst-card mb-5 p-6 md:p-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono-label text-[10px] uppercase tracking-widest text-accent">Featured</p>
                <h3 className="mt-1 font-display text-xl text-ink md:text-2xl">{projects[0].title}</h3>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-white p-1.5 dark:border-transparent">
                <Image src={projects[0].icon} alt="" width={28} height={28} className="h-6 w-6" />
              </div>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-ink-muted">{projects[0].description}</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted">{projects[0].impact}</p>
            <p className="mt-4 font-mono-label text-[10px] text-ink-faint">{projects[0].tools}</p>
            {projects[0].link && (
              <a
                href={projects[0].link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 font-mono-label text-[10px] uppercase tracking-widest text-accent transition hover:underline"
              >
                {projects[0].linkLabel ?? "Project link"} ↗
              </a>
            )}
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {projects.slice(1).map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="analyst-card flex flex-col p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium leading-snug text-ink">{p.title}</h3>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-white p-1 dark:border-transparent">
                    <Image src={p.icon} alt="" width={18} height={18} className="h-4 w-4" />
                  </div>
                </div>
                <p className="flex-1 text-xs leading-relaxed text-ink-muted">{p.description}</p>
                <p className="mt-3 text-xs leading-relaxed text-ink-muted">{p.impact}</p>
                <p className="mt-3 font-mono-label text-[10px] text-ink-faint">{p.tools}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 font-mono-label text-[10px] uppercase tracking-widest text-accent transition hover:underline"
                  >
                    {p.linkLabel ?? "Project link"} ↗
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionFrame>

      {/* ── Certifications ───────────────────────────────── */}
      <SectionFrame id="certifications" bg="white">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <p className="section-label">Credentials</p>
            <h2 className="section-title">Certifications</h2>
            <p className="mt-2 text-sm text-ink-muted">Industry-recognized data, BI, and cloud credentials.</p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                className="analyst-card flex flex-col items-center p-5 text-center"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white p-2 dark:border-transparent">
                  <Image src={c.logo} alt="" width={28} height={28} className="h-6 w-6" />
                </div>
                <p className="text-xs font-medium leading-snug text-ink">{c.title}</p>
                <p className="mt-1 font-mono-label text-[10px] text-ink-faint">{c.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionFrame>

      {/* ── Leadership Experiences (campus + leadership combined) ── */}
      <section id="leadership" className="border-b border-border bg-surface-subtle py-16 md:py-20">
        <div className="section-wrap">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-8 flex items-end justify-between gap-4 md:mb-10">
              <div>
                <p className="section-label">DePauw University · Greencastle, IN</p>
                <h2 className="section-title">Leadership Experiences</h2>
                <p className="mt-2 max-w-2xl text-sm text-ink-muted">
                  {leadershipAll.length} concurrent roles spanning founder positions, international student advocacy,
                  admissions, academic support, and cultural community — held alongside a full academic load and four internships.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/moeez-malik/"
                target="_blank"
                rel="noreferrer"
                className="hidden shrink-0 rounded-md border border-border bg-surface px-3 py-1.5 font-mono-label text-[10px] uppercase tracking-widest text-ink-muted transition hover:border-accent hover:text-accent md:inline-block"
              >
                Full list on LinkedIn ↗
              </a>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {leadershipAll.map((l) => {
                const cardInner = (
                  <>
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface-subtle font-mono-label text-[11px] font-semibold text-ink">
                        {l.abbr}
                      </div>
                      <span className="font-mono-label text-[10px] uppercase tracking-widest text-ink-faint">
                        {l.categoryLabel}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-snug text-ink">{l.title}</p>
                    <p className="mt-0.5 font-mono-label text-[10px] uppercase tracking-widest text-ink-faint">
                      {l.role}
                    </p>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-muted">{l.desc}</p>
                    {l.link && (
                      <div className="mt-3 border-t border-border pt-2.5">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink transition group-hover:text-accent">
                          {l.linkLabel ?? "Visit"}
                          <span className="font-mono-label text-[10px]">&#8599;</span>
                        </span>
                      </div>
                    )}
                  </>
                );

                return l.link ? (
                  <motion.a
                    key={l.title}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    href={l.link}
                    target="_blank"
                    rel="noreferrer"
                    className="analyst-card group flex flex-col p-4 transition-all hover:border-ink"
                    title={`Open ${l.linkLabel ?? l.title}`}
                  >
                    {cardInner}
                  </motion.a>
                ) : (
                  <motion.div
                    key={l.title}
                    variants={fadeUp}
                    whileHover={{ y: -2 }}
                    className="analyst-card flex flex-col p-4"
                  >
                    {cardInner}
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={fadeUp} className="analyst-card mt-6 flex flex-col gap-2 p-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <p className="text-sm text-ink-muted">
                <span className="font-medium text-ink">{leadershipAll.length}+ concurrent roles</span> alongside full academics, four internships, and three org presidencies —
                sustained community commitment at every level.
              </p>
              <a
                href="https://www.linkedin.com/in/moeez-malik/"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary self-center text-xs md:self-auto"
              >
                See full profile on LinkedIn →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────── */}
      <SectionFrame id="skills" bg="section">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <p className="section-label">Skills</p>
            <h2 className="section-title">Core competencies</h2>
            <p className="mt-2 text-sm text-ink-muted">Structured for analytics, BI, and cross-functional impact.</p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {skillGroups.map((g) => (
              <motion.div key={g.title} variants={fadeUp} whileHover={{ y: -2 }} className="analyst-card p-5">
                <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-white p-1.5 dark:border-transparent">
                    <Image src={g.icon} alt="" width={24} height={24} className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-medium text-ink">{g.title}</h3>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {g.tags.map((tag) => (
                    <span key={tag} className="text-xs text-ink-muted">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionFrame>

      {/* ── Contact ──────────────────────────────────────── */}
      <section id="contact" className="border-b border-border bg-surface-subtle py-16 md:py-20">
        <div className="section-wrap">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="analyst-card overflow-hidden md:grid md:grid-cols-[1fr_1.2fr]"
          >
            <motion.div variants={fadeUp} className="flex flex-col justify-between border-b border-border bg-navy p-8 text-white md:border-b-0 md:border-r md:p-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white/80" />
                  <span className="font-mono-label text-[10px] uppercase tracking-widest text-white/70">Open to opportunities</span>
                </div>
                <div>
                  <p className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-white/55">Contact</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight md:text-4xl">Let&apos;s talk data & strategy.</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    Open to conversations on BI, telecom analytics, and data strategy.
                  </p>
                </div>
              </div>
              <div className="mt-8 space-y-2">
                {[
                  { href: "mailto:moeezislammalik@gmail.com", icon: "\u2709", label: "moeezislammalik@gmail.com" },
                  { href: "https://www.linkedin.com/in/moeez-malik/", icon: "in", label: "linkedin.com/in/moeez-malik", external: true },
                  { href: "https://github.com/moeezislammalik", icon: "gh", label: "github.com/moeezislammalik", external: true },
                  { href: "/MoeezMalik_Resume_2026-2.pdf", icon: "\u2197", label: "Download resume (PDF)", external: true },
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 border border-white/15 bg-white/[0.02] px-3 py-2.5 text-xs text-white/85 transition hover:border-white hover:bg-white/[0.06]"
                  >
                    <span className="font-mono-label text-[10px]">{link.icon}</span>
                    <span className="truncate">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-surface p-8 md:p-10">
              <div className="mb-6">
                <h3 className="font-display text-xl text-ink">Send a message</h3>
                <p className="mt-1 text-xs text-ink-muted">Goes straight to my inbox.</p>
              </div>
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="bg-surface py-6">
        <div className="section-wrap flex flex-col items-center justify-between gap-2 text-center font-mono-label text-[10px] uppercase tracking-widest text-ink-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Moeez Malik · Business Analyst</p>
          <p>
            <a href="https://www.linkedin.com/in/moeez-malik/" target="_blank" rel="noreferrer" className="transition hover:text-accent">LinkedIn</a>
            {" · "}
            <a href="https://github.com/moeezislammalik" target="_blank" rel="noreferrer" className="transition hover:text-accent">GitHub</a>
            {" · "}
            <a href="/MoeezMalik_Resume_2026-2.pdf" target="_blank" rel="noreferrer" className="transition hover:text-accent">Resume</a>
          </p>
        </div>
      </footer>

      {/* ── Floating AI chat ─────────────────────────────── */}
      <AskMoeez />
    </div>
  );
}
