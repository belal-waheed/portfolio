import { PROFILE, SOCIAL_LINKS } from "@/data/constants";
import { motion } from "framer-motion";
import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-zinc-950/60 relative">
      <div className="container mx-auto px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Stack info */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                BW
              </div>
              <span className="font-display font-bold text-sm text-zinc-100">
                Belal Waheed
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Crafted with React 19, Tailwind v4 & GSAP
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon];
              return Icon ? (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-zinc-400 hover:text-emerald-400 transition-colors duration-200 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-emerald-500/30"
                  aria-label={link.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                </motion.a>
              ) : null;
            })}

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              className="p-2.5 text-zinc-400 hover:text-zinc-100 transition-colors duration-200 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-white/20 cursor-pointer ml-2"
              aria-label="Back to top"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <p>© {currentYear} {PROFILE.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for 60fps performance & accessibility
          </p>
        </div>
      </div>
    </footer>
  );
}
