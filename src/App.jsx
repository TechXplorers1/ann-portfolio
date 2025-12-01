import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Download,
  Mail,
  Linkedin,
  Phone,
  Sun,
  Moon,
  CheckCircle2,
  Briefcase,
  Layers,
  Globe,
  Shield,
  Zap,
  GraduationCap,
  Award,
  TrendingUp,
  Menu,
  X,
  Database,
  ArrowDown,
  Target,
  CreditCard,
  Lock,
  Network,
  ChevronRight,
  Sparkles,
  LayoutGrid,
  Star,
  BookOpen,
  MessageSquare,
  FileText
} from 'lucide-react';

// --- ASSETS ---
import profileImage from './assets/ann_profile.png';

/** * --- DATA CONSTANTS --- */

const SKILLS_DATA = [
  {
    title: "Product Strategy & Delivery",
    icon: Target,
    skills: [
      "Product Roadmaps",
      "MVP Definition",
      "PRDs & User Stories",
      "Agile/Scrum",
      "Backlog Prioritisation (RICE, MoSCoW)",
      "Cross-functional Delivery",
      "Customer Discovery & UX Workshops"
    ]
  },
  {
    title: "Payments & Banking",
    icon: CreditCard,
    skills: [
      "SEPA / SWIFT / Faster Payments",
      "Virtual Accounts & Safeguarding",
      "Cross-border FX Flows",
      "Treasury & Reconciliation Models",
      "Open Banking (PIS / AIS / VRP)",
      "ISO 20022 concepts"
    ]
  },
  {
    title: "FinCrime & Compliance",
    icon: Lock,
    skills: [
      "AML/KYC (CDD, EDD, Risk Scoring)",
      "Transaction Monitoring",
      "Sanctions Screening",
      "Fraud Detection Journeys",
      "MiCA / PSD2 / FCA Rules",
      "Data Privacy (GDPR)"
    ]
  },
  {
    title: "Tools & Platforms",
    icon: Layers,
    skills: [
      "ComplyAdvantage",
      "Sumsub",
      "Chainalysis",
      "TRM Labs",
      "Jira / Confluence",
      "Azure DevOps",
      "Miro / Figma",
      "LucidChart",
      "Monday.com"
    ]
  },
  {
    title: "Data & Analytics",
    icon: Database,
    skills: [
      "SQL (Intermediate)",
      "Power BI",
      "Tableau",
      "Excel (Advanced)",
      "BI Dashboards (AML/Payments/Risk)"
    ]
  },
  {
    title: "API & Integrations",
    icon: Network,
    skills: [
      "API Lifecycle (Design/Test/Monitor)",
      "Postman",
      "Swagger / OpenAPI",
      "Bank & PSP Integrations",
      "AML/KYC Provider Integrations",
      "Webhooks / Callback flows"
    ]
  }
];

const CASE_STUDIES = [
  {
    id: "01",
    title: "Real-Time Cross-Border Payments Platform (SEPA Instant & SWIFT GPI)",
    role: "Senior Product Manager",
    tags: ["Payments", "ISO 20022", "Treasury", "API Design"],
    outcome_highlight: "45% Latency Reduction",
    isFlagship: true,
    content: {
      problem: "A financial platform needed faster cross-border GBP/EUR settlement. Existing rails created delays, reconciliation gaps, and operational overhead.",
      approach: [
        "Designed the end-to-end cross-border payments flow using SEPA Instant, SEPA Credit Transfer, and SWIFT GPI.",
        "Mapped ledger movements across fee accounts, settlement accounts, and virtual IBANs.",
        "Created reconciliation rules, exception handling paths, and liquidity visibility dashboards.",
        "Collaborated with engineering, treasury, and compliance to align with PSD2, FCA safeguarding, and ISO 20022 formats."
      ],
      outcome: [
        "45% reduction in transaction latency.",
        "Real-time settlement visibility for operations and treasury.",
        "Automated reconciliation and exception reporting, cutting manual checks by 30%."
      ],
      tools: ["SEPA", "SWIFT GPI", "ISO 20022", "vIBANs", "Kafka events", "Treasury Ops", "PSD2", "Product Strategy"]
    }
  },
  {
    id: "02",
    title: "Euro Stablecoin & Digital Assets Settlement Layer",
    role: "Senior PM – Digital Assets",
    tags: ["Crypto", "MiCA", "Stablecoins", "Blockchain"],
    outcome_highlight: "MiCA Compliant",
    isFlagship: true,
    content: {
      problem: "The platform needed a compliant way to support crypto-fiat settlement, stablecoins, and programmable payments under MiCA-style oversight.",
      approach: [
        "Defined product requirements for a Euro stablecoin backed by safeguarded fiat reserves.",
        "Designed on/off-ramp flows connecting fiat accounts, stablecoins, and blockchain settlement layers.",
        "Worked with compliance to map MiCA, AML5, and GDPR obligations into technical requirements.",
        "Designed AML/KYC checks for crypto transactions (chain analytics, risk scoring)."
      ],
      outcome: [
        "Delivered a compliant digital asset settlement layer aligned to MiCA expectations.",
        "Improved transparency of fiat-to-crypto movements.",
        "Reduced operational load with automated AML/chain-analysis checks."
      ],
      tools: ["Stablecoins", "Chainalysis/TRM Labs", "MiCA", "AML Controls", "Smart Contracts", "API Integrations"]
    }
  },
  {
    id: "06",
    title: "Multi-Currency Virtual Account System (vIBANs)",
    role: "Payments Product Manager",
    tags: ["vIBANs", "CASS 7", "Reconciliation"],
    outcome_highlight: "100% Auto Reconciliation",
    isFlagship: false,
    content: {
      problem: "Customers required GBP, EUR, and USD virtual accounts with automated reconciliation and full AML/KYC coverage.",
      approach: [
        "Designed the account issuance engine for multi-currency vIBANs (GBP/EUR/USD).",
        "Defined AML/KYC modules embedded into onboarding and ongoing monitoring.",
        "Built reconciliation logic for statements, ledger movements, and settlement accounts.",
        "Aligned safeguarding flows with FCA CASS 7 principles."
      ],
      outcome: [
        "Scalable vIBAN product used across retail, crypto, FX, and merchant users.",
        "100% automated reconciliation for incoming/outgoing payments.",
        "Strengthened compliance posture for EMI licensing."
      ],
      tools: ["vIBANs", "CASS 7", "Reconciliation Automation", "AML/KYC", "Ledger Architecture"]
    }
  },
  {
    id: "04",
    title: "AI-Powered Financial Crime Detection Framework",
    role: "FinCrime Product Manager",
    tags: ["AI/ML", "Fraud Detection", "Risk Engine"],
    outcome_highlight: "35% Fraud Reduction",
    isFlagship: false,
    content: {
      problem: "Fraud and AML alerts were high-volume, inconsistent, and required manual reviews.",
      approach: [
        "Defined an AI-powered risk engine using anomaly detection, behavioural scoring, and ML models.",
        "Partnered with data science to create explainable features for AML/CTF.",
        "Introduced case-management tools with investigation workflows.",
        "Embedded model governance: bias testing, back testing, drift monitoring."
      ],
      outcome: [
        "35%+ improvement in fraud detection accuracy.",
        "30% faster AML/KYC decisioning.",
        "Investigators handled 40% fewer false positives."
      ],
      tools: ["ML Models", "Risk Scoring", "Anomaly Detection", "Data Pipelines", "Explainable AI"]
    }
  },
  {
    id: "05",
    title: "Safeguarding, Treasury Controls & EMI Readiness",
    role: "Product Lead",
    tags: ["EMI Licensing", "Safeguarding", "Treasury"],
    outcome_highlight: "50% Faster Audits",
    isFlagship: false,
    content: {
      problem: "The organisation needed compliance alignment for EMI licensing and cross-jurisdiction regulatory readiness (UK/EU).",
      approach: [
        "Built safeguarding flows across customer accounts, settlement accounts, and treasury.",
        "Designed audit-ready controls for liquidity, reconciliation, and operational reporting.",
        "Delivered governance frameworks mapping PSD2, MiCA, GDPR, and ISO 20022 requirements.",
        "Created dashboards for C-level stakeholders covering regulatory KPIs."
      ],
      outcome: [
        "Successful readiness for licence application review.",
        "Strengthened compliance posture and internal audit capability.",
        "50% faster evidence generation for FCA/EBA audits."
      ],
      tools: ["PSD2", "MiCA", "FCA CASS", "Treasury Ops", "Reconciliation", "Audit Reporting"]
    }
  },
  {
    id: "03",
    title: "AI-Enhanced AML Case Management & Investigation Platform",
    role: "FinCrime Product Manager",
    tags: ["AI/ML", "AML/KYC", "Risk Scoring", "RegTech"],
    outcome_highlight: "40% Fewer False Positives",
    isFlagship: true,
    content: {
      problem: "Analysts were struggling with high alert volumes, duplicate cases, and inconsistent triage decisions across AML, sanctions, and fraud alerts.",
      approach: [
        "Designed an AI-driven case triage engine that scores alerts using behavioural patterns, customer risk, and anomaly history.",
        "Built an investigation workspace combining KYC data, transactional footprints, device intelligence, sanctions hits, and blockchain traces.",
        "Introduced explainable AI to clearly justify why an alert scored high/low (model transparency).",
        "Defined workflows for escalation, QA, SAR filing, and audit trails."
      ],
      outcome: [
        "40% reduction in false positives, allowing analysts to focus on real threats.",
        "30–50% decrease in investigation time through consolidated data and automated triage.",
        "Stronger regulatory posture with full auditability and governance."
      ],
      tools: ["Machine Learning", "Risk Scoring", "NLP", "Case Management UX", "SAR Processes", "Model Governance", "TRM/Chainalysis"]
    }
  },
  {
    id: "07",
    title: "Automated Merchant Onboarding",
    role: "PM – FinTech Platform",
    tags: ["KYB/KYC", "Onboarding", "Automation"],
    outcome_highlight: "60% Faster Onboarding",
    isFlagship: false,
    content: {
      problem: "Merchant onboarding was slow, manual, and inconsistent. KYB, screening, and risk scoring required several teams.",
      approach: [
        "Designed a risk-tiering framework for merchants based on business model, geography, volume, and AML exposure.",
        "Automated KYB collection through integrated checks (registry data, UBO verification, sanctions, PEPs).",
        "Built dynamic onboarding flows that request more/less information depending on risk level.",
        "Digitised document collection, review workflows, and decision logs."
      ],
      outcome: [
        "60% faster onboarding for low/medium-risk merchants.",
        "Consistent compliance decisions with full auditability.",
        "Drop-off rate significantly reduced due to smoother UX and clearer requirements."
      ],
      tools: ["KYB/KYC", "SumSub", "ComplyAdvantage", "AMLD5", "Risk Scoring", "Workflow Automation"]
    }
  },
  {
    id: "08",
    title: "Open Banking Payments (VRP / PIS / AIS)",
    role: "Product Manager – Open Banking",
    tags: ["Open Banking", "VRP", "PSD2"],
    outcome_highlight: "Higher Conversion",
    isFlagship: false,
    content: {
      problem: "Merchants and users wanted faster account-to-account payments, recurring payments, and instant verification without cards.",
      approach: [
        "Designed PIS (Payment Initiation Services) flows for single payments including SCA, consent, redirection, and webhook notifications.",
        "Implemented AIS (Account Information Services) for balance checks, income verification, and transaction analytics.",
        "Defined the VRP (Variable Recurring Payments) product — sweeping, merchant-initiated payments.",
        "Created dashboards for merchants to view payment status, retries, settlement, and failures."
      ],
      outcome: [
        "Higher payment conversion due to instant settlement and no card declines.",
        "New revenue streams through VRP subscription and sweeping models.",
        "Strong user trust due to consent transparency and FCA-aligned controls."
      ],
      tools: ["Open Banking", "PSD2", "VRP Sweeping", "PIS/AIS", "OAuth2", "SCA", "API Design"]
    }
  },
  {
    id: "09",
    title: "Buy-Now-Pay-Later (BNPL) Product Design",
    role: "Payments Product Manager",
    tags: ["BNPL", "Credit Risk", "Lending"],
    outcome_highlight: "Real-time Risk Scoring",
    isFlagship: false,
    content: {
      problem: "Users needed access to BNPL options with transparent repayment schedules, while the platform needed to control lending risk.",
      approach: [
        "Defined BNPL user journeys: eligibility check, credit assessment, instalment options, fees, and repayment plans.",
        "Designed a credit-risk decision engine using affordability data, open banking insights, and behavioural patterns.",
        "Created merchant-side APIs to embed BNPL into checkout flows.",
        "Designed collections workflows, repayment reminders, dispute handling, and arrears management."
      ],
      outcome: [
        "Higher merchant conversion due to flexible payment options.",
        "Controlled credit risk through automated real-time risk scoring.",
        "Improved user repayment behaviour through structured nudges and reminders."
      ],
      tools: ["Credit Scoring", "Open Banking Data", "BNPL Modelling", "Collections", "FCA Consumer Credit"]
    }
  },
  {
    id: "10",
    title: "Core Banking Migration",
    role: "Senior PM",
    tags: ["Core Banking", "Migration", "Cloud Native"],
    outcome_highlight: "99% Error Reduction",
    isFlagship: false,
    content: {
      problem: "The legacy core banking system had slow batch processes, limited API capabilities, and high operational risk.",
      approach: [
        "Led discovery across operations, engineering, treasury, and compliance to map all account types and posting rules.",
        "Defined target architecture with real-time posting, event streams, modular ledgers, and automated reconciliation.",
        "Created migration playbooks: data mapping, ledger transitions, historical balance reconstruction.",
        "Ensured regulatory alignment across safeguarding, AML monitoring, and audit trails."
      ],
      outcome: [
        "99% reduction in operational errors due to automated postings and reconciliation.",
        "Faster delivery of new features — APIs instead of batch jobs.",
        "Stable, compliant, cloud-native foundation supporting multi-rail payments and digital assets."
      ],
      tools: ["Core Banking", "Ledger Architecture", "Data Migration", "Kafka", "Cloud (AWS/Azure)"]
    }
  }
];

/** * --- CUSTOM HOOKS --- */
const useScrollObserver = (threshold = 0.1) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, [threshold]);

  return [ref, isIntersecting];
};

/**
 * --- SUB-COMPONENTS ---
 */

// 1. Tech Stack Category
const TechCategory = ({ title, icon: Icon, skills, isDark, delay }) => {
  const [ref, inView] = useScrollObserver(0.1);

  return (
    <div
      ref={ref}
      className={`p-6 rounded-2xl border transition-all duration-700 hover:shadow-xl hover:-translate-y-1 h-full
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-200'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${isDark ? 'bg-neutral-800 text-emerald-400' : 'bg-neutral-100 text-emerald-600'}`}>
          <Icon size={20} />
        </div>
        <h4 className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span key={i} className={`px-3 py-1 text-xs font-medium rounded-full border transition-all hover:scale-105 cursor-default
            ${isDark
              ? 'border-neutral-700 text-neutral-400 hover:border-emerald-500 hover:text-white'
              : 'border-neutral-200 text-neutral-600 hover:border-emerald-500 hover:text-black'
            }
          `}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

// 2. Impact Metric Box
const ImpactBox = ({ value, label, subtext, isDark, delay }) => {
  const [ref, inView] = useScrollObserver(0.1);
  return (
    <div
      ref={ref}
      className={`p-6 md:p-8 border flex flex-col justify-between h-full group transition-all duration-700 hover:-translate-y-2
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${isDark ? 'border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900' : 'border-neutral-200 bg-white hover:bg-neutral-50'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{value}</div>
      <div>
        <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`}>{label}</div>
        <p className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>{subtext}</p>
      </div>
    </div>
  );
}

// 3. STICKY PROJECT CARD (Universal Style)
const StickyProjectCard = ({ study, isDark, onClick }) => {
  const [ref, inView] = useScrollObserver(0.2);

  return (
    <div
      ref={ref}
      onClick={() => onClick(study)}
      className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-24 cursor-pointer group transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >

      {/* Sticky Number/ID */}
      <div className="md:col-span-2 md:sticky md:top-32 h-fit">
        <h3 className={`text-4xl md:text-6xl font-black tracking-tighter opacity-10 mb-2 transition-colors group-hover:opacity-30 ${isDark ? 'text-white' : 'text-black'}`}>
          {study.id}
        </h3>
        {study.isFlagship && (
          <div className={`mb-4 inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${isDark ? 'border-emerald-500 text-emerald-400' : 'border-emerald-600 text-emerald-700'}`}>
            Flagship
          </div>
        )}
        <div className={`hidden md:block w-px h-24 ml-4 mt-4 transition-colors ${isDark ? 'bg-neutral-800 group-hover:bg-emerald-500' : 'bg-neutral-200 group-hover:bg-emerald-500'}`}></div>
      </div>

      {/* Content */}
      <div className={`md:col-span-10 p-6 md:p-10 rounded-3xl border transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1
        ${isDark ? 'bg-neutral-900/40 border-neutral-800 hover:bg-neutral-900 hover:border-emerald-500/30' : 'bg-white border-neutral-200 hover:bg-neutral-50 hover:border-emerald-300'}
      `}>

        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <span className={`inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold uppercase tracking-wider ${isDark ? 'bg-neutral-800 text-emerald-400' : 'bg-neutral-100 text-emerald-700'}`}>
              {study.role}
            </span>
            <span className={`p-2 rounded-full border transition-colors ${isDark ? 'border-neutral-700 bg-neutral-800 text-white group-hover:bg-emerald-500' : 'border-neutral-200 bg-white text-black group-hover:bg-emerald-600 group-hover:text-white'}`}>
              <ArrowUpRight size={20} />
            </span>
          </div>

          <h4 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>{study.title}</h4>

          <div className="flex flex-wrap gap-2 mt-4">
            {study.tags.map((tag, i) => (
              <span key={i} className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${isDark ? 'border-neutral-700 text-neutral-500' : 'border-neutral-200 text-neutral-500'}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Short Summary (Problem only) */}
        <div className="mb-6">
          <p className={`text-base leading-relaxed line-clamp-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {study.content.problem}
          </p>
        </div>

        {/* Impact Teaser */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
          <TrendingUp size={16} /> {study.outcome_highlight}
        </div>

      </div>
    </div>
  );
};

// 4. Case Study Modal (Popup)
const CaseStudyModal = ({ study, isDark, onClose }) => {
  if (!study) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className={`relative w-full max-w-4xl max-h-full overflow-y-auto rounded-3xl shadow-2xl animate-fade-in-up scroll-hidden
        ${isDark ? 'bg-neutral-900 border border-neutral-800 text-white' : 'bg-white text-black'}
      `}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <button onClick={onClose} className="sticky top-4 right-4 float-right z-10 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
          <X size={24} />
        </button>

        <div className="p-6 md:p-12 clear-both">
          {/* Header */}
          <span className={`inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold uppercase tracking-wider ${isDark ? 'bg-neutral-800 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`}>
            {study.role}
          </span>
          <h2 className="text-2xl md:text-4xl font-black mb-6 leading-tight">{study.title}</h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {study.tags.map((tag, i) => (
              <span key={i} className={`text-xs font-bold px-3 py-1 rounded border ${isDark ? 'border-neutral-700 text-neutral-400' : 'border-neutral-200 text-neutral-500'}`}>
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2 space-y-8">
              {/* Problem */}
              <div>
                <h5 className="text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-emerald-500">
                  <Shield size={16} /> Challenge
                </h5>
                <p className={`text-base leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {study.content.problem}
                </p>
              </div>

              {/* Approach */}
              <div>
                <h5 className="text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-emerald-500">
                  <Target size={16} /> Approach
                </h5>
                <ul className="space-y-3">
                  {study.content.approach.map((point, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-neutral-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              {/* Outcome Box */}
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-neutral-800/50' : 'bg-emerald-50'}`}>
                <h5 className={`text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  <TrendingUp size={16} /> Impact
                </h5>
                <div className="mb-4 text-2xl font-black">{study.outcome_highlight}</div>
                <ul className="space-y-3">
                  {study.content.outcome.map((point, i) => (
                    <li key={i} className={`flex items-start gap-2 text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5 text-emerald-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-widest mb-3 text-neutral-500">Tech & Tools</h5>
                <div className="flex flex-wrap gap-2">
                  {study.content.tools.map((tool, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600'}`}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Education Item
const EducationItem = ({ title, school, year, status, isDark }) => (
  <div className={`flex flex-col md:flex-row md:items-center justify-between py-4 border-b transition-colors ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
    <div>
      <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>{title}</h4>
      <p className={`text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{school}</p>
      {status && (
        <p className={`text-xs mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Focus: {status}</p>
      )}
    </div>
    <div className="mt-2 md:mt-0 text-right shrink-0">
      <span className={`text-xs font-mono px-2 py-1 rounded ${isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-700'}`}>
        {year}
      </span>
    </div>
  </div>
);

// Navigation Configuration
const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Sparkles },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'expertise', label: 'Expertise', icon: Shield },
  { id: 'impact', label: 'Impact', icon: TrendingUp },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
];

/**
 * --- MAIN APP ---
 */
export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for Modal
  const [selectedProject, setSelectedProject] = useState(null);

  // For Intro Animations
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  // --- SCROLL SPY LOGIC ---
  useEffect(() => {
    const sections = ['home', 'skills', 'expertise', 'impact', 'work', 'education'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setMobileMenuOpen(false); // Close mobile menu after click
  };

  // --- SORTING LOGIC ---
  // Sort ALL by numeric ID first to ensure any list we generate is ordered.
  const sortedStudies = [...CASE_STUDIES].sort((a, b) => parseInt(a.id) - parseInt(b.id));

  // Separate Flagships and Selected Works
  const flagshipProjects = sortedStudies.filter(s => s.isFlagship);
  const otherProjects = sortedStudies.filter(s => !s.isFlagship);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);


  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 selection:bg-emerald-500 selection:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>

      {/* --- MODAL --- */}
      {selectedProject && (
        <CaseStudyModal
          study={selectedProject}
          isDark={isDark}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* --- DESKTOP NAVIGATION (Floating Pill - Hidden on Mobile) --- */}
      <div className={`hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-40 items-center gap-1 px-2 py-2 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-700 ease-out transform
        ${loaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}
        ${isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-neutral-200'}`}>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95
              ${activeSection === item.id
                ? (isDark ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-black text-white shadow-lg shadow-black/20')
                : (isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-neutral-500 hover:text-black hover:bg-black/5')}
            `}
          >
            {item.label}
          </button>
        ))}

        <div className={`w-px h-5 mx-3 ${isDark ? 'bg-neutral-700' : 'bg-neutral-200'}`}></div>

        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-90 active:rotate-12 ${isDark ? 'hover:bg-neutral-800 text-white' : 'hover:bg-neutral-100 text-black'}`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* UPDATED: Desktop Nav Request CV - No target blank */}
        <a
          href="mailto:a.fowosere485@gmail.com?subject=Request%20for%20CV%20-%20Portfolio"
          title="Request CV"
          className={`p-2.5 ml-1 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-90 active:shadow-sm
            ${isDark ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20' : 'bg-[#00a67e] hover:bg-[#008c6a] shadow-emerald-600/20'}
          `}
        >
          <Mail size={18} strokeWidth={2.5} />
        </a>
      </div>

      {/* --- MOBILE NAVIGATION - THE "APP LAUNCHER" BOTTOM SHEET --- */}

      {/* 1. The Trigger Button (Visible only on Mobile) */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className={`md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90
          ${isDark ? 'bg-neutral-800 text-white shadow-white/5 border border-neutral-700' : 'bg-white text-black shadow-black/10 border border-neutral-100'}
          ${mobileMenuOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}
        `}
      >
        <Menu size={24} strokeWidth={2.5} />
      </button>

      {/* 2. The Bottom Sheet Overlay & Container */}
      <div className={`md:hidden fixed inset-0 z-[60] transition-all duration-500
        ${mobileMenuOpen ? 'bg-black/60 backdrop-blur-sm visible' : 'bg-black/0 invisible pointer-events-none'}
      `} onClick={() => setMobileMenuOpen(false)}>

        {/* 3. The Sheet Content (Slides up) */}
        <div
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sheet
          className={`absolute bottom-0 left-0 right-0 rounded-t-[32px] p-6 pb-10 transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1)
            ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}
            ${isDark ? 'bg-neutral-900 border-t border-neutral-800' : 'bg-white border-t border-neutral-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]'}
        `}>

          {/* Sheet Header (Close + Actions) */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2 rounded-full transition-colors ${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600'}`}
            >
              <X size={24} />
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-3 rounded-full border transition-colors ${isDark ? 'border-neutral-700 bg-neutral-800 text-yellow-400' : 'border-neutral-200 bg-neutral-50 text-neutral-600'}`}
              >
                {isDark ? <Sun size={20} fill="currentColor" /> : <Moon size={20} />}
              </button>
              
              {/* UPDATED: Mobile Nav Request CV - No target blank */}
              <a
                href="mailto:a.fowosere485@gmail.com?subject=Request%20for%20CV%20-%20Portfolio"
                className={`p-3 rounded-full border transition-colors ${isDark ? 'border-neutral-700 bg-neutral-800 text-emerald-400' : 'border-neutral-200 bg-neutral-50 text-emerald-600'}`}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Sheet Grid (The "App Launcher" look) */}
          <div className="grid grid-cols-2 gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all duration-200 active:scale-95
                  ${activeSection === item.id
                    ? (isDark ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700')
                    : (isDark ? 'bg-neutral-800/50 border-neutral-800 text-neutral-300' : 'bg-neutral-50 border-neutral-100 text-neutral-600')
                  }
                `}
              >
                <item.icon size={32} strokeWidth={1.5} />
                <span className="text-sm font-bold uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* --- HERO SECTION --- */}
      {/* CHANGE: Added 'pt-[10px]' to the className below */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[25px]">
        {/* Background */}
        <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? 'bg-neutral-950' : 'bg-white'}`}></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-[1400px]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

            {/* LEFT: CONTENT (Now 2nd on Mobile) */}
            <div className="flex-1 text-left order-2 lg:order-1">
              <div className={`transition-all duration-1000 delay-100 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                <div className={`text-xl lg:text-3xl font-serif italic mb-4
                  ${isDark ? 'text-emerald-400' : 'text-emerald-600'}
                `}>
                  Hi, I'm Ann
                </div>

                <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6
                  ${isDark ? 'text-white' : 'text-black'}
                `}>
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-emerald-400 to-cyan-400' : 'from-emerald-600 to-cyan-600'}`}>
                    Senior Product Manager
                  </span> <br />
                  <span className={`font-light text-2xl md:text-4xl ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    (FinTech, Payments & Digital Assets)
                  </span>
                </h1>

                <div className={`space-y-6 text-base lg:text-lg leading-relaxed max-w-2xl
                  ${isDark ? 'text-neutral-300' : 'text-neutral-700'}
                `}>
                  <p>
                    I build <span className="font-bold">compliant, scalable products</span> across Payments, Open Banking, Crypto, and Financial Crime.
                  </p>
                  <p>
                    My work spans API-led infrastructures, AML automation, settlement systems, and end-to-end product delivery across regulated environments.
                  </p>
                  <p>
                    I specialise in turning complex regulatory and technical requirements into simple, usable products that scale across multiple markets.
                  </p>
                </div>

                {/* Skills */}
                <div className="mt-8 mb-10 flex flex-wrap gap-2">
                  {[
                    "Payments", "Open Banking", "AML/KYC", "AI/ML",
                    "Crypto/Stablecoins", "Risk & Compliance",
                    "API Product Management", "Product Strategy", "Enterprise Integrations"
                  ].map((skill, i) => (
                    <span key={i} className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border
                      ${isDark
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                        : 'border-emerald-600/20 bg-emerald-50 text-emerald-800'
                      }
                    `}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* UPDATED: HERO BUTTONS WITH FIX - No target blank */}
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Option 1: Request CV */}
                  <a href="mailto:a.fowosere485@gmail.com?subject=Request%20for%20CV%20-%20Portfolio" 
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5
                    ${isDark ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-emerald-600 text-white hover:bg-emerald-700'}
                  `}>
                    <FileText size={18} /> Request CV
                  </a>

                  {/* Option 2: Book a Chat */}
                  <a href="mailto:a.fowosere485@gmail.com?subject=Book%20a%20Chat%20-%20Portfolio" 
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border transition-all hover:-translate-y-0.5
                    ${isDark 
                      ? 'border-neutral-700 hover:border-white text-white hover:bg-neutral-800' 
                      : 'border-neutral-300 hover:border-black text-black hover:bg-neutral-50'
                    }
                  `}>
                    <MessageSquare size={18} /> Book a Chat
                  </a>
                </div>

              </div>
            </div>

            {/* RIGHT: IMAGE (Now 1st on Mobile) */}
            <div className={`flex-shrink-0 relative transition-all duration-1000 delay-300 transform order-1 lg:order-2 mb-8 lg:mb-0 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
                <img
                  src={profileImage}
                  alt="Ann Fowosere"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-3xl opacity-20
                ${isDark ? 'bg-emerald-900' : 'bg-emerald-100'}
              `}></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce
           ${isDark ? 'text-neutral-600' : 'text-neutral-400'}
        `}>
          <ArrowDown size={16} />
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className={`py-16 md:py-24 px-6 border-y transition-colors ${isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-neutral-50 border-neutral-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <h2 className={`text-3xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>Strategic Arsenal</h2>
            <p className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Full-stack product & compliance capabilities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS_DATA.map((category, index) => (
              <TechCategory
                key={index}
                title={category.title}
                icon={category.icon}
                skills={category.skills}
                isDark={isDark}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERTISE --- */}
      <section id="expertise" className={`py-20 md:py-32 px-6 md:px-24 transition-colors ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 border-neutral-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className={`text-4xl md:text-7xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>CORE<br />EXPERTISE</h2>
            <p className={`max-w-md text-sm font-medium uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
              Architecting secure, compliant, and scalable financial products across payments, digital banking, and financial crime prevention.
            </p>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border transition-colors ${isDark ? 'bg-neutral-800 border-neutral-800' : 'bg-neutral-200 border-neutral-200'}`}>
            {[
              {
                icon: Globe,
                title: "Payments & Banking",
                desc: "Open Banking (PIS/AIS), VRP, BNPL, virtual IBANs, CASS 7 safeguarding, reconciliation frameworks, treasury operations, SEPA Instant, SWIFT GPI, FX and cross-border flows, ISO 20022 alignment. (Relevant Bodies: FCA, EBA, ECB/SEPA Council, SWIFT, Bank of England, HMRC)."
              },
              {
                icon: Shield,
                title: "FinCrime & RegTech",
                desc: "AML/KYC (CDD/EDD), sanctions screening, transaction monitoring, SAR processes, risk tiering frameworks, fraud detection (AI-driven), model governance, audit trails. (Relevant Bodies: FATF, FinCEN, FCA, OFAC, HM Treasury, EBA)."
              },
              {
                icon: Layers,
                title: "Crypto & Web3",
                desc: "Stablecoins (MiCA-ready), crypto on/off-ramp flows, blockchain payment journeys, chain analytics alignment, VASP compliance, risk controls for crypto-fiat settlement. (Relevant Bodies: ESMA, FCA, EU Commission, FATF Travel Rule)."
              },
              {
                icon: Briefcase,
                title: "Leadership & Delivery",
                desc: "Product strategy & roadmap, OKRs, Agile/Scrum/SAFe delivery, stakeholder management, vendor selection, cross-functional execution, change leadership, regulatory alignment across engineering, compliance, and operations teams."
              },
              {
                icon: Zap,
                title: "Data & Platforms",
                desc: "SQL, product analytics, BI dashboards (Power BI, Tableau), event-driven data concepts, predictive analytics, risk modelling exposure, data-driven decision-making frameworks."
              },
              {
                icon: CheckCircle2,
                title: "Governance & Standards",
                desc: "PSD2, MiCA, ISO 20022, GDPR, ISO 27001, AMLD5/6, CASS 7, SOX, IFRS 17, ITIL fundamentals. (Relevant Bodies: FCA, ICO, ISO Standards Committees, EBA, ESMA, NIST)."
              }
            ].map((item, i) => (
              <div key={i} className={`p-8 md:p-12 flex flex-col items-start gap-6 group transition-colors duration-300 ${isDark ? 'bg-black hover:bg-neutral-900' : 'bg-white hover:bg-neutral-100'}`}>
                <item.icon className={`w-8 h-8 md:w-10 md:h-10 ${isDark ? 'text-neutral-600 group-hover:text-emerald-400' : 'text-neutral-300 group-hover:text-emerald-600'} transition-colors`} strokeWidth={1} />
                <div>
                  <h3 className={`text-lg md:text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>{item.title}</h3>
                  <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STRATEGIC IMPACT --- */}
      <section id="impact" className="py-20 md:py-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-black tracking-tighter mb-12 text-center ${isDark ? 'text-white' : 'text-black'}`}>
            MEASURABLE IMPACT
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ImpactBox
              value="45%"
              label="Latency Reduction"
              subtext="Optimised cross-border payment processing latency through SEPA Instant & SWIFT GPI workflow redesign."
              isDark={isDark}
              delay={0}
            />
            <ImpactBox
              value="35%"
              label="Fraud Reduced"
              subtext="Delivered AI-driven transaction monitoring and AML rule optimisation to strengthen fraud-risk controls."
              isDark={isDark}
              delay={100}
            />
            <ImpactBox
              value="50%"
              label="Audit Readiness"
              subtext="Implemented automated evidence generation and compliance mapping, accelerating FCA/EBA audit preparation."
              isDark={isDark}
              delay={200}
            />
            <ImpactBox
              value="96%"
              label="Delivery Rate"
              subtext="Maintained a consistent 96% sprint delivery rate across cross-functional squads by tightening ceremonies."
              isDark={isDark}
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* --- WORK (SEPARATED FLAGSHIPS) --- */}
      <section id="work" className={`py-20 md:py-32 px-6 md:px-24 transition-colors ${isDark ? 'bg-neutral-950' : 'bg-neutral-50'}`}>
        <div className="max-w-5xl mx-auto">

          <div className="mb-16 md:mb-24 text-center md:text-left">
            <h2 className={`text-4xl md:text-7xl font-black tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-black'}`}>PROJECT<br />PORTFOLIO</h2>
            <div className={`h-2 w-24 mx-auto md:mx-0 ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`}></div>
            <p className={`mt-6 max-w-2xl ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Deep dive into 10 key projects demonstrating end-to-end delivery in regulated environments.
              <br />
              <span className="text-emerald-500 font-bold">Click any project to view full case study.</span>
            </p>
          </div>

          {/* 1. Flagship Projects */}
          <div className="mb-20">
            <div className={`mb-8 flex items-center gap-3 pb-4 border-b ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <Star className="text-emerald-500" fill="currentColor" size={24} />
              <h3 className={`text-2xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>Flagship Case Studies</h3>
            </div>

            <div className="space-y-4">
              {flagshipProjects.map((study) => (
                <StickyProjectCard
                  key={study.id}
                  study={study}
                  isDark={isDark}
                  onClick={setSelectedProject}
                />
              ))}
            </div>
          </div>

          {/* 2. Other Projects */}
          <div>
            <div className={`mb-8 flex items-center gap-3 pb-4 border-b ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <LayoutGrid className={isDark ? 'text-neutral-400' : 'text-neutral-600'} size={24} />
              <h3 className={`text-2xl font-black uppercase tracking-tight ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Selected Works</h3>
            </div>
            <div className="space-y-4">
              {otherProjects.map((study) => (
                <StickyProjectCard
                  key={study.id}
                  study={study}
                  isDark={isDark}
                  onClick={setSelectedProject}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- EDUCATION & CERTIFICATIONS --- */}
      <section id="education" className="py-20 md:py-32 px-6 md:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Certifications & Training Column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className={isDark ? 'text-emerald-400' : 'text-emerald-600'} size={32} />
                <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-black'}`}>CERTIFICATIONS</h3>
              </div>

              {/* UPDATED: Certifications List */}
              <div className="flex flex-col gap-4 mb-10">
                {[
                  "Certified Scrum Product Owner (CSPO) – Scrum Alliance",
                  "SAFe Product Owner / Product Manager (POPM) — Scaled Agile",
                  "PRINCE2® Foundation & Practitioner — Axelos",
                  "ITIL Foundation (Service Management)"
                ].map((cert, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 border rounded-lg ${isDark ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-white'}`}>
                    <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`}></div>
                    <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{cert}</span>
                  </div>
                ))}
              </div>

              {/* UPDATED: Professional Training Subsection */}
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className={isDark ? 'text-emerald-400' : 'text-emerald-600'} size={24} />
                <h3 className={`text-xl font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>Professional Training</h3>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  "Advanced Business Analysis Training – IIBA-aligned",
                  "AML Training Program – ACAMS pathway (In Progress)",
                  "Data Privacy Training (CIPP/E track) – IAPP (Ongoing)",
                  "Treasury & Payments Learning Program – ACT (Ongoing)"
                ].map((training, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 border border-dashed rounded-lg ${isDark ? 'border-neutral-800 bg-neutral-900/30' : 'border-neutral-300 bg-white/50'}`}>
                    <div className={`w-2 h-2 rounded-full border ${isDark ? 'border-emerald-500' : 'border-emerald-600'}`}></div>
                    <span className={`text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{training}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* Education Column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className={isDark ? 'text-emerald-400' : 'text-emerald-600'} size={32} />
                <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-black'}`}>EDUCATION</h3>
              </div>
              <div className="flex flex-col gap-6">
                {/* UPDATED: MBA Details */}
                <EducationItem
                  title="MBA"
                  school="Olabisi Onabanjo University"
                  year="2018"
                  status="Business Strategy, Technology & Operations, Financial Management"
                  isDark={isDark}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- STRATEGIC ENGAGEMENTS (Partners) --- */}
      <section className={`py-20 border-t transition-colors ${isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-neutral-50 border-neutral-200'}`}>
        <div className="container mx-auto px-6 text-center">
          <p className={`text-xs font-bold uppercase tracking-widest mb-10 ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Strategic Engagements & Collaborations
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* UPDATED: Partners List */}
            {['Adyen', 'PayPal', 'ComplyAdvantage', 'ClearBank', 'Modulr', 'Currencycloud', 'Thredd', 'Santander', 'JP Morgan', '10x Banking', 'NatWest', 'Aon', 'BMW Financial Services'].map((partner, i) => (
              <span key={i} className={`text-xl md:text-2xl font-black uppercase tracking-tight cursor-default hover:scale-110 transition-transform ${isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'}`}>
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className={`py-32 px-6 md:px-24 flex flex-col items-center justify-center text-center transition-colors ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
        <div className="max-w-3xl">
          <p className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
            {/* UPDATED: Contact Header */}
            Let's Connect
          </p>
          <h2 className={`text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none ${isDark ? 'text-white' : 'text-black'}`}>
            LET'S SCALE<br />COMPLIANTLY.
          </h2>

          {/* UPDATED: Availability Text */}
          <p className={`text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Available for <span className={`${isDark ? 'text-white' : 'text-black'} font-bold`}>Product Manager & Senior Product Manager</span> roles across FinTech, Payments, RegTech, and Digital Assets.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <a href="mailto:a.fowosere485@gmail.com" className={`flex items-center gap-3 text-lg font-bold hover:underline ${isDark ? 'text-white' : 'text-black'}`}>
              <Mail className="w-5 h-5" /> a.fowosere485@gmail.com
            </a>
            <a href="tel:+447557906586" className={`flex items-center gap-3 text-lg font-bold hover:underline ${isDark ? 'text-white' : 'text-black'}`}>
              <Phone className="w-5 h-5" /> +44 7557 906586
            </a>
            <a
              href="https://www.linkedin.com/in/annpeju-fowosere/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 text-lg font-bold hover:underline ${isDark ? 'text-white' : 'text-black'}`}
            >
              <Linkedin className="w-5 h-5" /> Ann Fowosere
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      {/* Added bottom padding to prevent nav overlap */}
      <footer className={`py-16 px-6 border-t relative z-10 transition-colors ${isDark ? 'bg-gradient-to-b from-neutral-900 to-black border-neutral-900 text-neutral-500' : 'bg-gradient-to-b from-neutral-50 to-white border-neutral-200 text-neutral-400'} pb-40 md:pb-48`}>
        <div className="container mx-auto flex flex-col items-center justify-center text-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Ann Fowosere. All rights reserved.
            </div>
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-wide mt-1">
              Built by Techxplorers PVT Limited
            </div>
          </div>
        </div>
      </footer>

      {/* --- STYLES --- */}
      <style>{`
        /* --- SCROLLBAR HIDING --- */
        html, body {
          scrollbar-width: none;  /* Firefox */
          -ms-overflow-style: none;  /* IE and Edge */
        }
        
        /* Chrome, Safari, Opera */
        ::-webkit-scrollbar {
          display: none;
        }

        @keyframes reveal-curtain {
          0% { height: 100%; }
          100% { height: 0%; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }

        /* Custom Cubic Bezier for smoother sheet animation */
        .cubic-bezier {
            transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
        }
      `}</style>
    </div>
  );
}