import { useState } from 'react';
import { Link } from 'react-router';
import { ExternalLink, Github, Play, ArrowUpRight, Check, RotateCcw, ArrowRight, FolderGit2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { PROJECTS } from '@/data/constants';

interface ProjectsProps {
  selectedTag?: string | null;
  onTagSelect?: (tag: string | null) => void;
}

const FILTER_TAGS = ['All', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'ASP.Net MVC'];

export function Projects({ selectedTag: externalTag, onTagSelect }: ProjectsProps) {
  const [internalTag, setInternalTag] = useState<string>('All');
  const activeFilter = externalTag || internalTag;

  const handleFilterChange = (tag: string) => {
    if (onTagSelect) {
      onTagSelect(tag === 'All' ? null : tag);
    } else {
      setInternalTag(tag);
    }
  };

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-zinc-950">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
              <FolderGit2 size={13} />
              <span>Featured Projects</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight">
              Production <span className="text-gradient-emerald">Work</span>
            </h2>
          </div>

          {/* Interactive Stack Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-900/80 border border-white/5 backdrop-blur-md">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleFilterChange(tag)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer active:scale-95 ${
                  activeFilter.toLowerCase() === tag.toLowerCase()
                    ? 'bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.length === 0 ? (
            <div
              key="empty-state"
              className="col-span-full py-16 text-center studio-card border border-white/10 p-8 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
                <FolderGit2 size={22} />
              </div>
              <h3 className="text-lg font-bold text-zinc-200">No projects found with filter "{activeFilter}"</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Try selecting another technology or clear the active filter to view all production projects.
              </p>
              <Button size="sm" onClick={() => handleFilterChange('All')} className="inline-flex items-center gap-1.5">
                <RotateCcw size={14} /> Clear Active Filter
              </Button>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="studio-card group flex flex-col justify-between border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-2xl animate-fade-in"
              >
                  <div>
                    {/* Framed Media Preview Container */}
                    <Link
                      to={`/project/${project.slug}`}
                      className="block relative aspect-[16/10] overflow-hidden bg-zinc-900/90 border-b border-white/10"
                    >
                      <picture>
                        {project.imageMobile && (
                          <source media="(max-width: 640px)" srcSet={project.imageMobile} type="image/webp" />
                        )}
                        <img
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={375}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </picture>

                      {/* Gradient scrim overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        {project.videoUrl ? (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                            <Play size={11} className="fill-emerald-400" /> Video Demo
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300">
                            Architecture Stills
                          </span>
                        )}

                        {project.liveUrl && (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Site
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Project Details */}
                    <div className="p-6 sm:p-7 space-y-4">
                      <div className="space-y-1.5">
                        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
                          <Link
                            to={`/project/${project.slug}`}
                            className="group-hover:text-emerald-400 transition-colors flex items-center justify-between"
                          >
                            <span>{project.title}</span>
                            <ArrowUpRight size={18} className="text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </h3>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Key features bullet points */}
                      {project.features && project.features.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          {project.features.slice(0, 2).map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                              <Check size={13} className="text-emerald-400 shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-zinc-900 border border-white/5 text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 sm:p-7 pt-0 flex flex-wrap items-center gap-2.5 border-t border-white/5 mt-4">
                    <Link
                      to={`/project/${project.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/30 text-xs font-semibold text-zinc-200 hover:text-white transition-all"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight size={14} className="text-emerald-400" />
                    </Link>
                    
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                        title="Open Live Website"
                        aria-label={`Open ${project.title} live site`}
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                        title="View GitHub Repository"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github size={15} />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
        </div>

      </div>
    </section>
  );
}

export default Projects;
