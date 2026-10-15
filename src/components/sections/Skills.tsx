import { SKILLS } from '@/data/constants';
import { Code2, Terminal } from 'lucide-react';

interface SkillsProps {
  onSelectTag?: (tag: string) => void;
  activeTag?: string | null;
}

export function Skills({ onSelectTag, activeTag }: SkillsProps) {
  const categories = [
    {
      id: 'frontend',
      title: 'Frontend Architecture',
      skills: SKILLS.filter((s) => s.category === 'frontend'),
    },
    {
      id: 'backend',
      title: 'Backend & Database Systems',
      skills: SKILLS.filter((s) => s.category === 'backend'),
    },
    {
      id: 'tools',
      title: 'DevOps, Tooling & Ecosystem',
      skills: SKILLS.filter((s) => s.category === 'tools'),
    },
  ];

  const handleSkillClick = (skillName: string) => {
    if (onSelectTag) {
      onSelectTag(skillName);
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-zinc-950/80">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
            <Code2 size={13} />
            <span>Skills & Technologies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight">
            Engineering <span className="text-gradient-emerald">Expertise</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Technologies and tooling I use in production to build scalable, robust software systems. Click any technology to filter related projects.
          </p>
        </div>

        {/* Clean Category Bands */}
        <div className="space-y-10 lg:space-y-12">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="grid md:grid-cols-12 gap-4 md:gap-8 items-start pb-10 border-b border-white/5 last:border-0"
            >
              
              {/* Category Label */}
              <div className="md:col-span-4 space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 font-display flex items-center gap-2">
                  <Terminal size={18} className="text-emerald-400" />
                  <span>{cat.title}</span>
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  {cat.skills.length} Production Technologies
                </p>
              </div>

              {/* Tech Cards Grid */}
              <div className="md:col-span-8 flex flex-wrap gap-2.5 sm:gap-3">
                {cat.skills.map((skill) => {
                  const isActive = activeTag?.toLowerCase() === skill.name.toLowerCase();
                  return (
                    <div
                      key={skill.name}
                      onClick={() => handleSkillClick(skill.name)}
                      className={`px-4 py-2.5 rounded-xl border text-sm text-zinc-200 transition-all duration-200 flex items-center gap-2.5 group cursor-pointer active:scale-95 ${
                        isActive
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-lg'
                          : 'bg-zinc-900/80 border-white/10 hover:border-emerald-500/40 hover:bg-zinc-800/90'
                      }`}
                      title={`Click to filter projects by ${skill.name}`}
                    >
                      <span className={`w-2 h-2 rounded-full transition-transform shrink-0 ${isActive ? 'bg-emerald-300 scale-125' : 'bg-emerald-400 group-hover:scale-125'}`} />
                      <div className="flex flex-col">
                        <span className={`font-semibold transition-colors leading-snug ${isActive ? 'text-emerald-300' : 'text-zinc-100 group-hover:text-emerald-400'}`}>
                          {skill.name}
                        </span>
                        {skill.description && (
                          <span className="text-[11px] text-zinc-400 font-normal leading-tight font-sans">
                            {skill.description}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
