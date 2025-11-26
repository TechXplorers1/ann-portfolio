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
  Building2,
  Menu,
  X,
  Code2,
  Database,
  Layout,
  ArrowDown,
  ExternalLink,
  Cpu
} from 'lucide-react';

// --- ASSETS ---
// Ensure this path matches your project structure
import profileImage from './assets/ann_profile.png';

/** * --- CUSTOM HOOKS ---
 */
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
 * --- ASSETS (SVGs) ---
 */
const BrandIcon = ({ name, className }) => {
  const icons = {
    Python: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z M8 12h8v2H8z" fill="currentColor"/>,
    AWS: <path d="M12 2L2 19h20L12 2zm0 3.5L18.5 17H5.5L12 5.5z" fill="currentColor"/>,
    Snowflake: <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" stroke="currentColor" strokeWidth="2" />,
    Jira: <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>,
    SQL: <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />,
    PowerBI: <><rect x="6" y="10" width="4" height="10" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/></>,
    Docker: <><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="3" fill="currentColor"/></>,
    Adyen: <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>,
    PayPal: <path d="M14 2h-6L4 22h4l1.5-6h3c3.5 0 6-2.5 6-6s-2.5-8-6-8z" fill="currentColor"/>,
    Generic: <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
  };
  return <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">{icons[name] || icons.Generic}</svg>;
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
      className={`p-6 rounded-2xl border transition-all duration-700 hover:shadow-xl hover:-translate-y-1
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

// 2. Sticky Experience Card
const JobCard = ({ year, title, company, type, bullets, stack, isDark }) => {
  const [ref, inView] = useScrollObserver(0.2);
  
  return (
    <div ref={ref} className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-24 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      {/* Sticky Year */}
      <div className="md:col-span-3 md:sticky md:top-32 h-fit">
        <h3 className={`text-5xl md:text-6xl font-black tracking-tighter opacity-20 mb-2 transition-colors ${isDark ? 'text-white' : 'text-black'}`}>
          {year}
        </h3>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isDark ? 'bg-neutral-800 text-emerald-400' : 'bg-neutral-200 text-emerald-700'}`}>
          {type}
        </span>
      </div>
      
      {/* Content */}
      <div className={`md:col-span-9 p-6 md:p-8 border-l-2 transition-colors ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
        <h4 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{title}</h4>
        <p className={`text-lg font-medium mb-6 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{company}</p>
        
        <ul className="space-y-4 mb-8">
          {bullets.map((bullet, i) => (
            <li key={i} className={`flex items-start gap-4 text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-neutral-600' : 'text-neutral-300'}`} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {stack.map((tech, i) => (
            <span key={i} className={`text-xs font-mono px-2 py-1 border ${isDark ? 'border-neutral-800 text-neutral-500' : 'border-neutral-300 text-neutral-500'}`}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Impact Metric Box
const ImpactBox = ({ value, label, subtext, isDark, delay }) => {
  const [ref, inView] = useScrollObserver(0.1);
  return (
    <div 
      ref={ref}
      className={`p-8 border flex flex-col justify-between h-full group transition-all duration-700 hover:-translate-y-2
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${isDark ? 'border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900' : 'border-neutral-200 bg-white hover:bg-neutral-50'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`text-5xl md:text-6xl font-black mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{value}</div>
      <div>
        <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`}>{label}</div>
        <p className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>{subtext}</p>
      </div>
    </div>
  );
}

// 4. Education Item
const EducationItem = ({ title, school, year, status, isDark }) => (
  <div className={`flex flex-col md:flex-row md:items-center justify-between py-4 border-b transition-colors ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
    <div>
      <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>{title}</h4>
      <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{school}</p>
    </div>
    <div className="mt-2 md:mt-0 text-right">
      <span className={`text-xs font-mono px-2 py-1 rounded ${isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-700'}`}>
        {year} {status && `• ${status}`}
      </span>
    </div>
  </div>
);

/**
 * --- MAIN APP ---
 */
export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // For Intro Animations
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  // --- SCROLL SPY LOGIC (Added Feature) ---
  useEffect(() => {
    // These IDs match the <section id="..."> tags and the nav array
    const sections = ['home', 'skills', 'expertise', 'impact', 'work', 'education'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // rootMargin creates a 'detection line' in the middle of the viewport
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 selection:bg-emerald-500 selection:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      
      {/* --- FLOATING NAVIGATION (Desktop) --- */}
      <div className={`hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 items-center gap-1 px-2 py-2 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-700 ease-out transform
        ${loaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}
        ${isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-neutral-200'}`}>
        
        {['home', 'skills', 'expertise', 'impact', 'work', 'education'].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95
              ${activeSection === item 
                ? (isDark ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-black text-white shadow-lg shadow-black/20') 
                : (isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-neutral-500 hover:text-black hover:bg-black/5')}
            `}
          >
            {item}
          </button>
        ))}
        
        <div className={`w-px h-5 mx-3 ${isDark ? 'bg-neutral-700' : 'bg-neutral-200'}`}></div>

        <button 
          onClick={() => setIsDark(!isDark)}
          className={`p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-90 active:rotate-12 ${isDark ? 'hover:bg-neutral-800 text-white' : 'hover:bg-neutral-100 text-black'}`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <a 
          href="Ann_Fowosere_Senior_Product_Manager_FinTech_Payments_Compliance_2025.pdf" 
          download 
          className={`p-2.5 ml-1 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-90 active:shadow-sm
            ${isDark ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20' : 'bg-[#00a67e] hover:bg-[#008c6a] shadow-emerald-600/20'}
          `}
        >
          <Download size={18} strokeWidth={2.5} />
        </a>
      </div>

      {/* --- MOBILE HEADER & NAV --- */}
      <div className={`md:hidden fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b backdrop-blur-md
        ${isDark ? 'bg-black/80 border-neutral-800' : 'bg-white/80 border-neutral-200'}`}>
        <span className="font-bold tracking-tight">ANN.F</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-40 pt-24 px-6 flex flex-col gap-6 md:hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
          {['home', 'skills', 'expertise', 'impact', 'work', 'education'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`text-3xl font-black uppercase tracking-tighter text-left ${isDark ? 'text-white' : 'text-black'}`}
            >
              {item}
            </button>
          ))}
          <div className="flex gap-4 mt-8">
            <button onClick={() => setIsDark(!isDark)} className={`p-4 rounded-full border ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
               {isDark ? <Sun /> : <Moon />}
            </button>
            <a href="Ann_Fowosere_Senior_Product_Manager_FinTech_Payments_Compliance_2025.pdf" download className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold rounded-full">
               <Download size={20} /> Download CV
            </a>
          </div>
        </div>
      )}

      {/* --- HERO SECTION (Executive Bio Layout) --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 md:py-0 overflow-hidden">
        
        {/* Dynamic Background */}
        <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? 'bg-black' : 'bg-neutral-50'}`}>
           <div className={`absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none`}></div>
           
           {/* Soft Orbs */}
           <div className={`absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[150px] opacity-20 animate-pulse-slow 
             ${isDark ? 'bg-emerald-900' : 'bg-emerald-200'}`}></div>
           <div className={`absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[150px] opacity-20 animate-pulse-slow animation-delay-2000 
             ${isDark ? 'bg-blue-900' : 'bg-blue-200'}`}></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
            
            {/* 1. Left Column: Image & Status */}
            <div className={`flex-shrink-0 relative transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
               {/* Profile Container */}
               <div className="relative w-64 h-64 lg:w-80 lg:h-80 group">
                 {/* Rotating Border Effect */}
                 <div className={`absolute -inset-4 rounded-full border border-dashed animate-spin-slow opacity-30 
                   ${isDark ? 'border-neutral-700' : 'border-neutral-300'}
                 `}></div>
                 
                 <div className={`relative w-full h-full rounded-full overflow-hidden border-4 shadow-2xl
                   ${isDark ? 'border-neutral-800' : 'border-white'}
                 `}>
                   {/* Using the imported image path from assets */}
                   <img 
                     src={profileImage} 
                     alt="Ann Fowosere" 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                 </div>

                 {/* Status Badge */}
                 <div className={`absolute bottom-2 right-2 md:right-0 px-4 py-2 rounded-full shadow-lg border backdrop-blur-md flex items-center gap-2 animate-bounce-slow
                   ${isDark ? 'bg-neutral-900/90 border-neutral-800 text-white' : 'bg-white/90 border-neutral-100 text-black'}
                 `}>
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                     <span className="text-[10px] font-bold uppercase tracking-wider">Online</span>
                 </div>
               </div>
            </div>

            {/* 2. Right Column: Text Content */}
            <div className="text-center md:text-left max-w-2xl">
               
               {/* Fade-in Stagger Group */}
               <div className={`transition-all duration-1000 delay-100 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <p className={`text-lg font-medium mb-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Hello, I'm
                  </p>
                  <h1 className={`text-5xl lg:text-7xl font-bold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                    Ann Fowosere.
                  </h1>
                  <h2 className={`text-2xl lg:text-3xl font-light mb-8 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Building the <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Future of FinTech</span> & <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Compliance</span>.
                  </h2>
               </div>

               <div className={`transition-all duration-1000 delay-300 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <p className={`text-base lg:text-lg leading-relaxed mb-10 max-w-xl mx-auto md:mx-0 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                    Senior Product Leader bridging the gap between traditional banking rails (SEPA/SWIFT) and modern crypto infrastructure. 12+ years driving regulated ecosystems across UK & EU.
                  </p>
               </div>

               {/* Buttons */}
               <div className={`flex flex-wrap gap-4 justify-center md:justify-start transition-all duration-1000 delay-500 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                 <a 
                   href="Ann_Fowosere_Senior_Product_Manager_FinTech_Payments_Compliance_2025.pdf" 
                   download
                   className={`group flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:-translate-y-1
                   ${isDark ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-emerald-600 text-white hover:bg-emerald-700'}
                 `}>
                   Download CV 
                   <Download size={18} className="group-hover:translate-y-1 transition-transform"/>
                 </a>
                 <a href="#contact" className={`px-8 py-4 rounded-full font-bold text-sm border transition-all hover:shadow-lg hover:-translate-y-1
                   ${isDark ? 'border-neutral-700 text-white hover:bg-white/10 hover:border-white' : 'border-neutral-300 text-black hover:bg-black/5 hover:border-black'}
                 `}>
                   Contact Me
                 </a>
               </div>

            </div>

          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce transition-opacity duration-1000 delay-1000
           ${loaded ? 'opacity-100' : 'opacity-0'}
           ${isDark ? 'text-neutral-600' : 'text-neutral-400'}
        `}>
           <span className="text-[10px] uppercase tracking-widest">Scroll</span>
           <ArrowDown size={20} />
        </div>

      </section>

      {/* --- SKILLS SECTION (Categorized Pills) --- */}
      <section id="skills" className={`py-16 md:py-24 px-6 border-y transition-colors ${isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-neutral-50 border-neutral-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
              <h2 className={`text-3xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>Strategic Arsenal</h2>
              <p className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Full-stack product & compliance capabilities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TechCategory 
              title="Code & Cloud" 
              icon={Code2}
              skills={['Python', 'AWS', 'Azure Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'Kafka', 'REST/GraphQL APIs', 'Java Microservices']}
              isDark={isDark}
              delay={0}
            />
            <TechCategory 
              title="Data & Analytics" 
              icon={Database}
              skills={['SQL', 'Snowflake', 'Power BI', 'Tableau', 'BigQuery', 'Google Data Studio', 'Excel (Advanced)', 'SAS', 'SPSS']}
              isDark={isDark}
              delay={100}
            />
            <TechCategory 
              title="Product & Design" 
              icon={Layout}
              skills={['Jira', 'Confluence', 'Azure DevOps', 'Trello', 'Monday.com', 'Figma', 'Miro', 'Lucidchart', 'Slack', 'Feishu (Lark)']}
              isDark={isDark}
              delay={200}
            />
            <TechCategory 
              title="Compliance & Infra" 
              icon={Shield}
              skills={['ISO 20022', 'PSD2', 'MiCA', 'GDPR', 'AML D6', 'CASS 7', 'ComplyAdvantage', 'SumSub', 'Chainalysis', 'TRM Labs']}
              isDark={isDark}
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* --- EXPERTISE (Grid Layout) --- */}
      <section id="expertise" className={`py-20 md:py-32 px-6 md:px-24 transition-colors ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 border-neutral-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className={`text-4xl md:text-7xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>CORE<br/>EXPERTISE</h2>
            <p className={`max-w-md text-sm font-medium uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
              Architecting secure, compliant, and scalable financial solutions.
            </p>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border transition-colors ${isDark ? 'bg-neutral-800 border-neutral-800' : 'bg-neutral-200 border-neutral-200'}`}>
            {[
              { icon: Globe, title: "Payments & Banking", desc: "Open Banking (PIS/AIS), VRP, BNPL, CASS 7 safeguarding, reconciliation, treasury ops, SEPA Instant, SWIFT GPI, virtual IBANs." },
              { icon: Shield, title: "FinCrime & RegTech", desc: "AML/KYC, CDD/EDD, sanctions screening, transaction monitoring, SAR processes, model governance, AI fraud detection." },
              { icon: Layers, title: "Crypto & Web3", desc: "Stablecoins (MiCA-ready), on/off-ramp flows, chain analytics alignment, risk controls for crypto-fiat settlement." },
              { icon: Briefcase, title: "Leadership & Delivery", desc: "Product strategy & roadmap, OKRs, Agile/SAFe/Scrum, stakeholder management, vendor selection, change & communications." },
              { icon: Zap, title: "Data & Platforms", desc: "SQL, product analytics, Snowflake, Kafka, dashboards (Power BI, Tableau), event-driven architecture, predictive analytics." },
              { icon: CheckCircle2, title: "Governance & Stds", desc: "PSD2, MiCA, ISO 20022, GDPR, ISO 27001, IFRS 17, SOX, ITIL." }
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
                subtext="Optimized cross-border payment flows via SEPA/SWIFT integrations." 
                isDark={isDark} 
                delay={0}
              />
              <ImpactBox 
                value="35%" 
                label="Fraud Reduced" 
                subtext="Implemented AI-powered transaction monitoring & AML rules." 
                isDark={isDark} 
                delay={100}
              />
              <ImpactBox 
                value="50%" 
                label="Audit Readiness" 
                subtext="Automated end-to-end evidence generation for FCA/EBA audits." 
                isDark={isDark} 
                delay={200}
              />
              <ImpactBox 
                value="96%" 
                label="Delivery Rate" 
                subtext="Consistent sprint completion managing cross-functional squads." 
                isDark={isDark} 
                delay={300}
              />
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE --- */}
      <section id="work" className={`py-20 md:py-32 px-6 md:px-24 transition-colors ${isDark ? 'bg-neutral-950' : 'bg-neutral-50'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 md:mb-24">
              <h2 className={`text-4xl md:text-7xl font-black tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-black'}`}>CAREER<br/>HISTORY</h2>
              <div className={`h-2 w-24 ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`}></div>
          </div>

          <JobCard 
            year="2024"
            title="Senior Product Manager - Payment & Infra"
            company="MiCA-Licensed FinTech Platform"
            type="Full Time"
            isDark={isDark}
            bullets={[
              "Led cross-border payment product design, including SEPA Instant and SWIFT GPI integrations, enabling real-time euro and GBP settlements and reducing cross-border transaction latency by 45%.",
              "Defined the product roadmap for MiCA-regulated Euro stablecoin, collaborating with engineering, legal, and compliance teams to ensure seamless interaction between fiat accounts, stablecoins, and DeFi settlement layers.",
              "Architected multi-currency virtual account systems (vIBANs) supporting GBP, EUR, and USDC, with embedded AML/KYC modules, reconciliation automation, and safeguarding processes aligned with FCA CASS 7 principles.",
              "Coordinated regulatory readiness across jurisdictions (UK, Lithuania, Czech Republic), ensuring compliance with PSD2, MiCA, GDPR, and ISO 20022 standards.",
              "Designed and implemented an AI- and ML-powered risk control and transaction monitoring framework, enhancing fraud detection, anomaly scoring, and AML/KYC decision efficiency by 30%.",
              "Partnered with blockchain and banking providers to build programmable APIs connecting fiat rails to smart contracts, improving settlement transparency and interoperability.",
              "Instituted governance and audit frameworks for safeguarding, reconciliation, and treasury reporting to support forthcoming UK EMI licence application.",
              "Delivered C-level product reporting dashboards, providing real-time insight into volume, liquidity, reconciliation, and regulatory KPIs.",
              "Mentored business analysts and product associates, introducing Agile rituals (stand-ups, retrospectives, backlog grooming) to accelerate delivery cycles by 25%."
            ]}
            stack={['SEPA', 'SWIFT', 'vIBANs', 'Odoo ERP', 'Kafka', 'Snowflake', 'Feishu/Lark', 'AWS']}
          />

          <JobCard 
            year="2022"
            title="Product Manager - Payments, FX & Crypto"
            company="FinTech Consulting Firm"
            type="Contract"
            isDark={isDark}
            bullets={[
              "Led the product roadmap for a unified FX and cross-border payments platform, integrating Open Banking APIs, modular KYC, and automated reconciliation for multi-currency transactions (GBP, EUR, USD).",
              "Delivered integrations with ClearBank, Modulr, and Currencycloud, enabling instant settlements and regulatory reporting for EU and UK customers.",
              "Designed compliance workflows (KYC/CDD/EDD) and AML alert automation, cutting manual review time by 65% and improving false positive resolution by 40%.",
              "Introduced a crypto onboarding module with wallet analytics and risk scoring, enabling secure fiat-to-stablecoin transactions under MiCA and FCA crypto-asset registration guidelines.",
              "Collaborated with regulators, PSPs, and internal compliance teams to strengthen CASS 7 safeguarding, audit readiness, and operational resilience.",
              "Managed multiple product squads across UX, engineering, and operations, aligning Agile delivery with strategic goals and maintaining a 96% sprint delivery rate.",
              "Implemented Power BI dashboards to track product adoption, reconciliation exceptions, and regulatory metrics across multiple regions."
            ]}
            stack={['Odoo ERP', 'REST/GraphQL', 'SEPA', 'SWIFT', 'Power BI', 'Kafka', 'Snowflake', 'Miro']}
          />

          <JobCard 
            year="2019"
            title="Product Manager - Open Banking & Compliance"
            company="Global Automotive Finance Group"
            type="Full Time"
            isDark={isDark}
            bullets={[
              "Delivered an Open Banking API upgrade (v3.1.9 -> v3.1.11) across multiple regions, improving integration reliability, fraud prevention, and customer onboarding efficiency by 40%.",
              "Designed and deployed a Variable Recurring Payments (VRP) module that reduced payment failures by 35% and supported seamless recurring financing payments for dealers and retail clients.",
              "Automated reconciliation and safeguarding workflows using Odoo ERP and Power BI, reducing manual effort by 70% and achieving full CASS 7 audit compliance.",
              "Implemented machine-learning fraud detection leveraging AML rules and behavioural analytics, cutting unauthorised transactions by 35% and false positives by 25%.",
              "Collaborated with ComplyAdvantage, ClearBank, and Open Banking partners to deliver PSD2-compliant APIs and unified transaction monitoring dashboards.",
              "Enhanced customer data protection and GDPR compliance, embedding privacy-by-design principles across product lifecycle stages.",
              "Led Agile ceremonies and sprint governance, enabling faster cross-functional delivery and alignment between engineering, risk, and compliance teams.",
              "Reported directly to the Head of Product, managing stakeholder expectations across the UK, Germany, and EMEA markets."
            ]}
            stack={['Power BI', 'SQL', 'Azure DevOps', 'Snowflake', 'PSD2', 'CASS 7', 'ISO 20022']}
          />

          <JobCard 
            year="2018"
            title="Product Manager - FinCrime Automation"
            company="AI-Driven RegTech Provider"
            type="Full Time"
            isDark={isDark}
            bullets={[
              "Delivered next-generation AML/KYC automation tools, reducing manual review volumes by 50% and false positives by 40%, improving overall screening accuracy.",
              "Led the development of a unified sanctions and PEP screening engine, integrating external data providers and increasing alert triage speed by 60%.",
              "Built a digital onboarding module supporting real-time verification, risk scoring, and AML policy enforcement across multiple client APIs.",
              "Enhanced transaction monitoring (TM) platform with AI/ML anomaly detection, improving fraud identification precision and cutting false alerts by 35%.",
              "Partnered with global clients (Tier-1 banks, payment processors, and digital lenders) to configure custom risk thresholds and align with their compliance frameworks.",
              "Collaborated cross-functionally with engineering, data science, and compliance teams to translate regulatory requirements into scalable product features.",
              "Drove Open Banking readiness initiatives, embedding AML logic into PIS/AIS API flows for real-time identity verification and risk flagging.",
              "Delivered regulatory reporting dashboards aligned with FCA and EBA audit requirements, improving transparency and governance."
            ]}
            stack={['Python', 'SQL', 'APIs', 'Snowflake', 'PowerBI', 'AWS', 'AMLD5/6']}
          />

          <JobCard 
            year="2018"
            title="Product Manager - Core Banking & Lending"
            company="Cloud-Native Core Banking Platform"
            type="Contract"
            isDark={isDark}
            bullets={[
              "Owned the Core Banking API roadmap spanning accounts, transactions, and lending services; delivered over 30 microservices supporting secure payment initiation and balance management.",
              "Implemented Variable Recurring Payments (VRP) and BNPL capabilities, reducing transaction latency by 40% and enabling real-time repayment schedules.",
              "Collaborated with engineering and compliance teams to embed Strong Customer Authentication (SCA) and KYC workflows, ensuring PSD2 alignment across all API endpoints.",
              "Delivered partner API integrations with Visa, Mastercard, and ClearBank for instant payments and multi-currency settlements.",
              "Improved reconciliation accuracy by 50% through automated ledger updates and audit-ready reporting within the platform's payments module.",
              "Enhanced developer experience by standardising OpenAPI documentation and sandbox testing environments, cutting third-party integration time by 30%.",
              "Introduced product-level analytics and feedback loops using Power BI dashboards to measure API adoption, error trends, and partner performance.",
              "Worked within Agile (SAFe) frameworks, managing cross-functional delivery squads and sprint reviews to maintain >95% on-time delivery rate."
            ]}
            stack={['REST/GraphQL', 'Java Microservices', 'Power BI', 'Kafka', 'PSD2', 'FCA']}
          />

        </div>
      </section>

      {/* --- EDUCATION & CERTIFICATIONS --- */}
      <section id="education" className="py-20 md:py-32 px-6 md:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Education Column */}
            <div>
               <div className="flex items-center gap-3 mb-8">
                 <GraduationCap className={isDark ? 'text-emerald-400' : 'text-emerald-600'} size={32} />
                 <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-black'}`}>EDUCATION</h3>
               </div>
               <div className="flex flex-col gap-6">
                 <EducationItem 
                   title="MBA (Application in Progress)" 
                   school="London Business School" 
                   year="Current" 
                   status="FinTech Innovation, Strategic Product Leadership"
                   isDark={isDark} 
                 />
                 <EducationItem 
                   title="MBA" 
                   school="Olabisi Onabanjo University" 
                   year="2018" 
                   status="Business Strategy, Tech & Operations"
                   isDark={isDark} 
                 />
               </div>
            </div>

            {/* Certifications Column */}
            <div>
               <div className="flex items-center gap-3 mb-8">
                 <Award className={isDark ? 'text-emerald-400' : 'text-emerald-600'} size={32} />
                 <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-black'}`}>CERTIFICATIONS</h3>
               </div>
               <div className="flex flex-col gap-4">
                  {[
                    "SAFe Product Owner / Product Manager (POPM)",
                    "Certified Scrum Product Owner (CSPO)",
                    "PRINCE2 Practitioner",
                    "Certified Business Analysis Professional (CBAP)",
                    "Certified Data Protection Officer (CDPO)",
                    "ISTQB Foundation Level",
                    "Certified Anti-Money Laundering Specialist (CAMS) - Target 2026",
                    "Certified Information Privacy Professional - Europe (CIPP/E) - Planned 2026",
                    "Associate Member of Association of Corporate Treasurers (AMCT) - Planned 2026/27"
                  ].map((cert, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 border rounded-lg ${isDark ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-white'}`}>
                      <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`}></div>
                      <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{cert}</span>
                    </div>
                  ))}
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
             {['Adyen', 'PayPal', 'ComplyAdvantage', 'ClearBank', 'Modulr', 'Currencycloud', 'Thredd', 'Santander', 'JP Morgan', 'NatWest', 'Aon'].map((partner, i) => (
               <span key={i} className={`text-xl md:text-2xl font-black uppercase tracking-tight cursor-default hover:scale-110 transition-transform ${isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'}`}>
                 {partner}
               </span>
             ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT (Minimal Footer) --- */}
      <section id="contact" className={`py-32 px-6 md:px-24 flex flex-col items-center justify-center text-center transition-colors ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
        <div className="max-w-3xl">
          <p className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
            Open For Opportunities
          </p>
          <h2 className={`text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-none ${isDark ? 'text-white' : 'text-black'}`}>
            LET'S SCALE<br/>COMPLIANTLY.
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <a href="mailto:a.fowosere485@gmail.com" className={`flex items-center gap-3 text-lg font-bold hover:underline ${isDark ? 'text-white' : 'text-black'}`}>
              <Mail className="w-5 h-5" /> a.fowosere485@gmail.com
            </a>
            <a href="tel:+447918919261" className={`flex items-center gap-3 text-lg font-bold hover:underline ${isDark ? 'text-white' : 'text-black'}`}>
              <Phone className="w-5 h-5" /> +44 7918 919 261
            </a>
            <a href="#" className={`flex items-center gap-3 text-lg font-bold hover:underline ${isDark ? 'text-white' : 'text-black'}`}>
              <Linkedin className="w-5 h-5" /> Ann Fowosere
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
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
      `}</style>
    </div>
  );
}