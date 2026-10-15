import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Mail, Phone, MapPin, ExternalLink, Github, Linkedin,
  GraduationCap, Briefcase, Code2, Wrench, Globe,
  Download, ArrowLeft, Printer, Copy, Check
} from 'lucide-react';
import { Link } from 'react-router';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { PROFILE, SEO_CONFIG, PROJECTS } from '@/data/constants';

const contactInfo = [
  { icon: MapPin, value: 'Cairo, Egypt' },
  { icon: Mail, value: 'belalwaheed000@gmail.com', href: 'mailto:belalwaheed000@gmail.com' },
  { icon: Phone, value: '+20 1111004353', href: 'tel:+201111004353' },
  { icon: Globe, value: 'belal.is-a.dev', href: SEO_CONFIG.siteUrl },
];

const profileLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/belal-whaeed' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/belal-waheed' },
];

const skills = {
  'Frontend': ['React.js (React 19)', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Redux Toolkit', 'Next.js', 'Framer Motion', 'GSAP'],
  'Backend': ['Node.js', 'Express.js', 'RESTful APIs', 'ASP.NET Core', 'JWT Authentication', 'bcrypt', 'Role-Based Access Control'],
  'Database': ['MongoDB (Mongoose)', 'SQL Server', 'PostgreSQL'],
  'Tools & DevOps': ['Git', 'GitHub', 'Vercel', 'VS Code', 'Postman', 'Figma', 'Docker basics'],
};

const experienceBullets = [
  'Architected and delivered client-facing production web apps (Tivaq, Moviq, Loop, Obel) with high-aesthetic responsive UIs and robust backend APIs.',
  'Engineered JWT authentication, bcrypt password hashing, and role-based access control across multiple client platforms.',
  'Implemented advanced state management, optimistic caching, and real-time social feeds with responsive dark-mode styling.',
];

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

export function ResumePage() {
  const [copied, setCopied] = useState(false);

  const handleCopyATS = () => {
    const text = `
BELAL WAHEED - FRONT-END DEVELOPER
Cairo, Egypt | belalwaheed000@gmail.com | +20 1111004353 | https://belal.is-a.dev
LinkedIn: https://www.linkedin.com/in/belal-whaeed | GitHub: https://github.com/belal-waheed

SUMMARY:
Front-End Developer with strong hands-on experience building production web applications using React 19, Next.js, and TypeScript. Proficient in responsive design, REST API integration, state management, and agile workflows with Git and Jira.

EDUCATION:
Bachelor of Information Technology, Sinai University - Arish (Sep 2023 - Present) | GPA: 3.3 / 4.0

CORE SKILLS:
- Core & Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3
- Frontend Frameworks: React.js (React 18/19), Next.js (App Router), Vite
- State & APIs: Redux Toolkit, React Context, Custom Hooks, REST API Integration
- Styling: Tailwind CSS (v3/v4), CSS Modules, Flexbox, Grid, Responsive Design
- Tools & Agile: Git, GitHub, Jira, Postman, Figma, Vercel

FEATURED PROJECTS:
1. Markbel (Offline-First Bookmark Archiver & PWA): React 19, TypeScript, Dexie.js IndexedDB, Tailwind CSS v4, Browser Extensions
2. LOOP (AI Customer Feedback & Intelligence Dashboard): Next.js App Router, TypeScript, React, Tailwind CSS, Lucide Icons
3. Tivaq (Luxury Fragrance E-Commerce & Verification): React 19, TypeScript, Redux Toolkit, Tailwind CSS, i18n
4. Moviq (Cinematic Media Discovery Platform): React, Redux Toolkit, TMDB REST API, Tailwind CSS
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <SEO
        title="Resume & Curriculum Vitae | Belal Waheed"
        description="View and download the resume of Belal Waheed — Full-Stack Developer proficient in React, Node.js, TypeScript, and MongoDB."
        canonicalUrl={`${SEO_CONFIG.siteUrl}/resume`}
      />
      <JsonLd />

      <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 sm:py-16 px-4 sm:px-6">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-xl backdrop-blur-md">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyATS}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-white/5 transition-colors cursor-pointer"
              title="Copy plain-text CV for ATS applications"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? 'Copied ATS Text!' : 'Copy ATS Plain Text'}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-white/5 transition-colors cursor-pointer"
            >
              <Printer size={14} /> Print / Save PDF
            </button>

            <a
              href="/Belal_Waheed_Resume.pdf"
              download="Belal_Waheed_Resume.pdf"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all shadow-md"
            >
              <Download size={14} /> Download PDF
            </a>
          </div>
        </div>

        {/* Resume Paper Container */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto p-6 sm:p-12 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-2xl space-y-8 print:bg-white print:text-black print:p-0 print:border-0 print:shadow-none"
        >
          
          {/* Header */}
          <motion.div variants={fadeUp} className="border-b border-white/10 pb-6 print:border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 print:text-black font-display tracking-tight">
                  {PROFILE.name}
                </h1>
                <p className="text-emerald-400 print:text-emerald-700 text-base font-semibold font-mono mt-1">
                  Full-Stack Software Engineer
                </p>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-2">
                {profileLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 print:text-black text-xs font-medium border border-white/5 print:border-gray-300 transition-colors"
                  >
                    <link.icon size={14} />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact metadata row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-zinc-400 print:text-gray-600 font-mono">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <info.icon size={13} className="text-emerald-400 print:text-emerald-700 shrink-0" />
                  {info.href ? (
                    <a href={info.href} className="hover:underline">{info.value}</a>
                  ) : (
                    <span>{info.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={fadeUp} className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-700 flex items-center gap-2">
              <GraduationCap size={15} /> Education
            </h2>
            <div className="p-4 rounded-xl bg-zinc-950/60 print:bg-gray-50 border border-white/5 print:border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-bold text-zinc-100 print:text-black">Bachelor of Information Technology</span>
                <span className="text-xs font-mono text-zinc-400 print:text-gray-500">Sep 2023 – Present (Expected 2027)</span>
              </div>
              <p className="text-xs text-emerald-400 print:text-emerald-700 font-semibold mt-0.5">Sinai University – Arish • GPA: 3.3</p>
              <p className="text-xs text-zinc-400 print:text-gray-600 mt-2 leading-relaxed">
                Core coursework: Data Structures, Algorithms, Database Systems, Web Engineering, Software Architecture.
              </p>
            </div>
          </motion.div>

          {/* Experience Highlights */}
          <motion.div variants={fadeUp} className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-700 flex items-center gap-2">
              <Briefcase size={15} /> Experience & Track Record
            </h2>
            <div className="p-4 rounded-xl bg-zinc-950/60 print:bg-gray-50 border border-white/5 print:border-gray-200 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-bold text-zinc-100 print:text-black">Full-Stack Software Engineer</span>
                <span className="text-xs font-mono text-zinc-400 print:text-gray-500">Aug 2024 – Present</span>
              </div>
              <p className="text-xs text-emerald-400 print:text-emerald-700 font-semibold">Self-Initiated & Client Production Deployments</p>
              <ul className="space-y-1.5 text-xs text-zinc-300 print:text-gray-700">
                {experienceBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 print:bg-emerald-600 shrink-0 mt-1.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Featured Projects */}
          <motion.div variants={fadeUp} className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-700 flex items-center gap-2">
              <Code2 size={15} /> Production Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS.filter((p) => p.featured).map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-zinc-950/60 print:bg-gray-50 border border-white/5 print:border-gray-200 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-100 print:text-black">{proj.title}</span>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 print:text-emerald-700 inline-flex items-center gap-0.5 text-xs hover:underline"
                        >
                          <ExternalLink size={12} /> Live
                        </a>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 print:text-gray-500">
                      {proj.tags.slice(0, 4).join(' • ')}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 print:text-gray-700 leading-relaxed">
                    {proj.description}
                  </p>
                  {proj.features && (
                    <ul className="grid sm:grid-cols-2 gap-1 text-[11px] text-zinc-400 print:text-gray-600 pt-1">
                      {proj.features.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 print:bg-emerald-600" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technical Skills Matrix */}
          <motion.div variants={fadeUp} className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-700 flex items-center gap-2">
              <Wrench size={15} /> Skills & Technologies
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(skills).map(([category, items]) => (
                <div
                  key={category}
                  className="p-3.5 rounded-xl bg-zinc-950/60 print:bg-gray-50 border border-white/5 print:border-gray-200 space-y-1.5"
                >
                  <h3 className="text-xs font-bold text-zinc-200 print:text-black">{category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((it) => (
                      <span
                        key={it}
                        className="px-2 py-0.5 rounded-md bg-zinc-900 print:bg-white print:border print:border-gray-300 text-zinc-300 print:text-black font-mono text-[11px]"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>

      </div>
    </>
  );
}
