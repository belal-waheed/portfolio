import { PROFILE } from "@/data/constants";
import {
  Briefcase,
  Calendar,
  Code2,
  GraduationCap,
  Layers,
  MapPin,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useRef } from "react";

const experiences = [
  {
    title: "Bachelor of Information Technology",
    company: "Sinai University – Arish",
    period: "Sep 2023 – Present",
    description:
      "Specializing in software engineering, database systems, and full-stack development. Current GPA: 3.3",
    icon: GraduationCap,
    accent: "text-emerald-400",
    badgeBg: "bg-emerald-500/10",
  },
  {
    title: "Full-Stack Software Engineer",
    company: "Client & Production Systems (Tivaq, Moviq, Loop, Obel)",
    period: "Aug 2024 – Present",
    description:
      "Architecting scalable web applications, REST APIs, JWT authentication, and high-performance React frontends with modern state management.",
    icon: Briefcase,
    accent: "text-cyan-400",
    badgeBg: "bg-cyan-500/10",
  },
];

const pillars = [
  {
    icon: Code2,
    label: "Clean Architecture",
    desc: "Layered, modular frontend and backend systems (Router → Service → DB)",
    accent: "text-emerald-400",
  },
  {
    icon: Zap,
    label: "60fps Performance",
    desc: "Optimized bundle size, lazy evaluation, and buttery smooth animations",
    accent: "text-amber-400",
  },
  {
    icon: ShieldCheck,
    label: "Security & Auth",
    desc: "JWT authentication, bcrypt password hashing, and role-based access",
    accent: "text-cyan-400",
  },
  {
    icon: Layers,
    label: "Design Craftsmanship",
    desc: "Pixel-perfect interfaces, WCAG AA accessibility, and tactile micro-interactions",
    accent: "text-rose-400",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          leftColRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          rightColRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, sectionRef);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden bg-zinc-950/80"
    >
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="mb-12 lg:mb-16 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
            <User size={13} />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight">
            Background & <span className="text-gradient-emerald">Philosophy</span>
          </h2>
        </div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Bio & Core Pillars */}
          <div ref={leftColRef} className="lg:col-span-6 space-y-6">
            <div className="studio-card p-6 sm:p-8 space-y-4 border border-white/10 hover:border-emerald-500/30">
              <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <span>About Belal</span>
              </h3>
              <p className="text-zinc-300 text-base leading-relaxed">
                {PROFILE.bio}
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I build end-to-end web products with a focus on maintainable software design, fast load times, and fluid responsive interactions.
              </p>
              <div className="flex items-center gap-2.5 pt-2 text-emerald-400 font-mono text-xs">
                <MapPin size={15} className="shrink-0" />
                <span>{PROFILE.location} • Available Worldwide</span>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {pillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="studio-card p-5 group hover:border-emerald-500/40 transition-all"
                >
                  <div className={`w-9 h-9 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform ${pillar.accent}`}>
                    <pillar.icon size={18} />
                  </div>
                  <p className="font-bold text-zinc-100 text-sm mb-1">
                    {pillar.label}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Experience Timeline */}
          <div ref={rightColRef} className="lg:col-span-6 space-y-6">
            <div className="studio-card p-6 sm:p-8 space-y-6 border border-white/10">
              <h3 className="text-xl font-bold font-display text-zinc-100">
                Experience & Education Track
              </h3>

              <div className="relative space-y-6">
                {/* Timeline vertical bar */}
                <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-emerald-500/20" />

                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-11 group">
                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center bg-zinc-900 border border-emerald-500/40 text-emerald-400 shadow-md group-hover:scale-110 transition-transform">
                      <exp.icon size={15} />
                    </div>

                    <div className="bg-zinc-900/60 rounded-xl p-4.5 border border-white/5 group-hover:border-emerald-500/30 transition-all space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-emerald-400/80 font-mono">
                        <Calendar size={12} />
                        <span>{exp.period}</span>
                      </div>
                      <h4 className="font-bold text-zinc-100 text-base">
                        {exp.title}
                      </h4>
                      <p className={`text-xs font-semibold ${exp.accent}`}>
                        {exp.company}
                      </p>
                      <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
