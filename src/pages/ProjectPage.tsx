import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Share2,
  Check,
  Layers,
  Cpu,
  Activity,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  Image as ImageIcon,
  Server,
  Database,
  Globe,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { PROJECTS } from "@/data/constants";
import { SEO } from "@/components/seo/SEO";
import { JsonLd } from "@/components/seo/JsonLd";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import type { Project } from "@/types";

export const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find project by slug (or fallback by id)
  const project: Project | undefined = PROJECTS.find(
    (p) => p.slug.toLowerCase() === slug?.toLowerCase() || p.id === slug
  );

  if (!project) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-zinc-400">
          <Terminal size={32} />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Case Study Not Found</h1>
        <p className="text-zinc-400 max-w-md mb-8">
          The requested project <code className="text-emerald-400 font-mono">/project/{slug}</code> does not exist or has been relocated.
        </p>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400 transition-colors"
        >
          <ArrowLeft size={18} />
          Return to All Projects
        </Link>
      </div>
    );
  }

  // Key by slug to automatically reset internal states cleanly
  return <ProjectDetailView key={project.slug} project={project} />;
};

interface ProjectDetailViewProps {
  project: Project;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"arch" | "challenges" | "stack" | "metrics">("arch");
  const [mediaMode, setMediaMode] = useState<"video" | "gallery">(
    project.videoUrl ? "video" : "gallery"
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Find currentIndex for Prev/Next navigation
  const currentIndex = PROJECTS.indexOf(project);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options: { immediate: boolean }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    document.title = `${project.title} — Technical Case Study | Belal Waheed`;
  }, [project]);

  const galleryImages = project.images && project.images.length > 0 ? project.images : [project.image];

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Global Lightbox Keyboard Controls and Body Scroll Lock
  useEffect(() => {
    if (!lightboxOpen) return;

    document.body.style.overflow = "hidden";

    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
      if (e.key === "ArrowLeft") setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    window.addEventListener("keydown", handleGlobalKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleGlobalKey);
    };
  }, [lightboxOpen, galleryImages.length]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SEO
        title={`${project.title} — Technical Case Study | Belal Waheed`}
        description={project.description}
        canonicalUrl={`https://belal.is-a.dev/project/${project.slug}`}
        ogImage={`https://belal.is-a.dev${project.image}`}
      />
      <JsonLd type="project" project={project} />
      {/* 1. TOP BREADCRUMB & RETURN */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>All Projects</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Copy share link"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Share2 size={14} />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. PROJECT HERO HEADER */}
      <header className="relative border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl rounded-3xl p-6 sm:p-10 mb-10 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/40 border border-amber-800/40 text-amber-300">
                <Award size={12} />
                Featured Production Case Study
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-lg sm:text-xl text-zinc-300 font-normal max-w-3xl mb-6">
              {project.subtitle}
            </p>
          )}

          <p className="text-base text-zinc-400 leading-relaxed max-w-3xl mb-8">
            {project.longDescription || project.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-zinc-800/60">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <span>Live Demo</span>
                <ExternalLink size={16} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-white font-medium transition-all active:scale-95"
              >
                <Github size={16} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-800/80">
          <div>
            <div className="text-xs font-mono text-zinc-400 mb-1">Role</div>
            <div className="text-sm font-semibold text-zinc-200">{project.role || "Full-Stack Engineer"}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-400 mb-1">Timeline</div>
            <div className="text-sm font-semibold text-zinc-200">{project.timeline || "2024 — 2026"}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-400 mb-1">Scope</div>
            <div className="text-sm font-semibold text-zinc-200">{project.team || "Individual Project"}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-400 mb-1">Core Tech</div>
            <div className="text-sm font-semibold text-emerald-400">{project.tags.slice(0, 3).join(" • ")}</div>
          </div>
        </div>
      </header>

      {/* 3. MEDIA SHOWCASE (VIDEO PLAYER & 3X RETINA GALLERY) */}
      <section className="mb-14">
        <div className="border border-zinc-800 bg-zinc-950/80 rounded-3xl p-4 sm:p-6 overflow-hidden">
          {/* Segmented Media Mode Switcher (if video available) */}
          {project.videoUrl && (
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setMediaMode("video")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  mediaMode === "video"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm"
                    : "bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                }`}
              >
                <Play size={13} className={mediaMode === "video" ? "fill-emerald-400" : ""} />
                <span>Video Walkthrough</span>
              </button>
              <button
                onClick={() => setMediaMode("gallery")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  mediaMode === "gallery"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm"
                    : "bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                }`}
              >
                <ImageIcon size={13} />
                <span>Screenshots ({galleryImages.length})</span>
              </button>
            </div>
          )}

          {/* Media Player or Screenshot Gallery */}
          {mediaMode === "video" && project.videoUrl ? (
            <div className="space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 flex items-center justify-center">
                <video
                  poster={project.image}
                  preload="none"
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                >
                  {project.videoWebmUrl && <source src={project.videoWebmUrl} type="video/webm" />}
                  <source src={project.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
                <span>HD Video Walkthrough Demo</span>
                <span>WebM / MP4 • 1080p</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className="relative aspect-[16/10] sm:aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <picture>
                  {project.imagesMobile && project.imagesMobile[selectedImageIndex] && (
                    <source media="(max-width: 640px)" srcSet={project.imagesMobile[selectedImageIndex]} type="image/webp" />
                  )}
                  <img
                    src={galleryImages[selectedImageIndex]}
                    alt={`${project.title} Preview ${selectedImageIndex + 1}`}
                    width={1200}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </picture>

                {/* Floating Expand Badge (Always clearly visible on Mobile & Desktop) */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono shadow-xl hover:bg-black/95 transition-colors">
                  <Maximize2 size={13} className="text-emerald-400" />
                  <span>Tap to expand</span>
                </div>

                {/* Arrow Controls */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                      }}
                      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-zinc-950/85 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer z-10 shadow-xl"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
                      }}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-zinc-950/85 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer z-10 shadow-xl"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`relative w-20 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                        selectedImageIndex === i
                          ? "border-emerald-500 ring-2 ring-emerald-500/30 opacity-100 scale-105"
                          : "border-zinc-800 opacity-60 hover:opacity-90"
                      }`}
                      aria-label={`Select screenshot ${i + 1}`}
                    >
                      <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 4. INTERACTIVE ENGINEERING DEEP-DIVE TABS */}
      <section className="mb-16">
        {/* Tab Navigation Header */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-950/80 border border-zinc-800 rounded-2xl mb-8 max-w-fit">
          {[
            { id: "arch", label: "System Architecture", icon: Layers },
            { id: "challenges", label: "Engineering Challenges", icon: Cpu },
            { id: "stack", label: "Tech Stack Matrix", icon: Server },
            { id: "metrics", label: "Metrics & Learnings", icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? "text-zinc-950 font-semibold" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="project-tab-pill"
                    className="absolute inset-0 bg-emerald-400 rounded-xl shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="border border-zinc-800/80 bg-zinc-950/60 backdrop-blur rounded-3xl p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {/* TAB 1: SYSTEM ARCHITECTURE */}
            {activeTab === "arch" && (
              <motion.div
                key="arch"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Layered System Architecture</h2>
                  <p className="text-sm text-zinc-400">
                    High-level component breakdown, boundary contracts, and persistent layer data flow.
                  </p>
                </div>

                {/* Layer Cards */}
                {project.architectureLayers && project.architectureLayers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.architectureLayers.map((layer, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>{layer.layer}</span>
                        </div>
                        <div className="text-base font-semibold text-white mb-2">{layer.tech}</div>
                        <p className="text-sm text-zinc-400 leading-relaxed">{layer.details}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {project.architecture?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60"
                      >
                        <div className="p-1 rounded bg-emerald-500/10 text-emerald-400 mt-0.5">
                          <Check size={14} />
                        </div>
                        <span className="text-sm text-zinc-300 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Features List */}
                {project.features && project.features.length > 0 && (
                  <div className="pt-6 border-t border-zinc-800/80">
                    <h3 className="text-base font-bold text-white mb-4">Core Feature Deliverables</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/30 border border-zinc-800/50"
                        >
                          <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-zinc-300 leading-normal">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: CHALLENGES & SOLUTIONS */}
            {activeTab === "challenges" && (
              <motion.div
                key="challenges"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Technical Challenges & Solved Problems</h2>
                  <p className="text-sm text-zinc-400">
                    First-principles deconstruction of real engineering hurdles and how they were resolved.
                  </p>
                </div>

                {project.detailedChallenges && project.detailedChallenges.length > 0 ? (
                  <div className="space-y-6">
                    {project.detailedChallenges.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4"
                      >
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold">
                            Challenge #{idx + 1}
                          </span>
                          <h3 className="text-base font-bold text-white">{item.title}</h3>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/30 text-zinc-300">
                            <span className="font-mono text-xs text-red-400 font-semibold block mb-1">
                              PROBLEM STATEMENT
                            </span>
                            {item.problem}
                          </div>

                          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-zinc-300">
                            <span className="font-mono text-xs text-emerald-400 font-semibold block mb-1">
                              ARCHITECTURAL RESOLUTION
                            </span>
                            {item.solution}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {project.challenges?.map((c, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-300">
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 3: TECH STACK MATRIX */}
            {activeTab === "stack" && (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Technology Stack Matrix</h2>
                  <p className="text-sm text-zinc-400">
                    Comprehensive inventory of libraries, frameworks, and deployment services powering the application.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.techStackMatrix ? (
                    <>
                      <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/30">
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3">
                          <Globe size={16} />
                          <span>FRONTEND & CLIENT STATE</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.techStackMatrix.frontend.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-lg bg-zinc-800/80 text-xs font-medium text-zinc-200 border border-zinc-700/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/30">
                        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-3">
                          <Server size={16} />
                          <span>BACKEND & API LAYER</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.techStackMatrix.backend.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-lg bg-zinc-800/80 text-xs font-medium text-zinc-200 border border-zinc-700/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/30">
                        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
                          <Database size={16} />
                          <span>DATABASE & PERSISTENCE</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.techStackMatrix.database.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-lg bg-zinc-800/80 text-xs font-medium text-zinc-200 border border-zinc-700/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.techStackMatrix.devops && (
                        <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/30">
                          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-3">
                            <Terminal size={16} />
                            <span>CLOUD, CI/CD & TOOLING</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.techStackMatrix.devops.map((t, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 rounded-lg bg-zinc-800/80 text-xs font-medium text-zinc-200 border border-zinc-700/60"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs font-medium text-zinc-200 border border-zinc-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 4: METRICS & OUTCOMES */}
            {activeTab === "metrics" && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Performance Benchmarks & Key Learnings</h2>
                  <p className="text-sm text-zinc-400">
                    Measurable results, latency milestones, and architecture insights gained during implementation.
                  </p>
                </div>

                {/* Metrics Grid */}
                {project.detailedMetrics && project.detailedMetrics.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.detailedMetrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 text-center"
                      >
                        <div className="text-3xl font-bold text-emerald-400 font-mono mb-1">{m.value}</div>
                        <div className="text-sm font-semibold text-white mb-1">{m.label}</div>
                        <div className="text-xs text-zinc-400">{m.detail}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Learnings */}
                {project.learnings && project.learnings.length > 0 && (
                  <div className="pt-6 border-t border-zinc-800">
                    <h3 className="text-base font-bold text-white mb-4">Engineering Takeaways</h3>
                    <div className="space-y-3">
                      {project.learnings.map((l, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800"
                        >
                          <div className="p-1 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                            <Activity size={14} />
                          </div>
                          <span className="text-sm text-zinc-300 leading-relaxed">{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. BOTTOM NAVIGATION CYCLER (PREV / NEXT PROJECT) */}
      <footer className="border-t border-zinc-800 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to={`/project/${prevProject.slug}`}
            className="group p-5 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all text-left flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-mono text-zinc-400 flex items-center gap-1 mb-1">
                <ChevronLeft size={14} />
                <span>PREVIOUS CASE STUDY</span>
              </div>
              <div className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                {prevProject.title}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-800 shrink-0">
              <img src={prevProject.image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </Link>

          <Link
            to={`/project/${nextProject.slug}`}
            className="group p-5 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all text-right flex items-center justify-between"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-800 shrink-0">
              <img src={nextProject.image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-400 flex items-center justify-end gap-1 mb-1">
                <span>NEXT CASE STUDY</span>
                <ChevronRight size={14} />
              </div>
              <div className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                {nextProject.title}
              </div>
            </div>
          </Link>
        </div>
      </footer>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={galleryImages}
        imagesMobile={project.imagesMobile}
        activeIndex={selectedImageIndex}
        title={project.title}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setSelectedImageIndex}
      />
    </div>
  );
};
