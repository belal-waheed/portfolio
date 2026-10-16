import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Code2, Download } from 'lucide-react';
import { PROFILE, PROJECTS } from '@/data/constants';
import { Button } from '@/components/ui';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const mobilePhotoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const cardTopRightRef = useRef<HTMLDivElement>(null);
  const cardBottomRightRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gsapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: { revert: () => void } | undefined;

    import('gsap').then(({ default: gsap }) => {
      gsapRef.current = gsap;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from(watermarkRef.current, {
          opacity: 0,
          y: -30,
          duration: 1.0,
        })
        .from([cardTopRightRef.current, cardBottomRightRef.current], {
          opacity: 0,
          scale: 0.9,
          x: 20,
          stagger: 0.12,
          duration: 0.7,
        }, '-=0.7')
        .from(scrollIndicatorRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.5,
        }, '-=0.2');

        // Subtle ambient float on desktop cards
        if (cardTopRightRef.current) {
          gsap.to(cardTopRightRef.current, {
            y: -8,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        if (cardBottomRightRef.current) {
          gsap.to(cardBottomRightRef.current, {
            y: 6,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.5,
          });
        }
      }, containerRef);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  // Desktop Mouse Move Depth Parallax (Disabled on touch / coarse pointer)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;
    const gsap = gsapRef.current;
    if (!gsap || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    if (photoRef.current) {
      gsap.to(photoRef.current, {
        x: x * 15,
        y: y * 15,
        rotateY: x * 4,
        rotateX: -y * 4,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    if (cardTopRightRef.current) {
      gsap.to(cardTopRightRef.current, {
        x: x * 20,
        y: y * 20,
        duration: 0.7,
        ease: 'power2.out',
      });
    }

    if (cardBottomRightRef.current) {
      gsap.to(cardBottomRightRef.current, {
        x: x * -16,
        y: y * -16,
        duration: 0.7,
        ease: 'power2.out',
      });
    }

    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        x: x * -10,
        duration: 1,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;
    const gsap = gsapRef.current;
    if (!gsap) return;
    [photoRef.current, cardTopRightRef.current, cardBottomRightRef.current, watermarkRef.current].forEach(
      (el) => {
        if (el) {
          gsap.to(el, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        }
      }
    );
  };

  const featuredProject = PROJECTS[0];

  return (
    <section
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[auto] md:min-h-screen flex flex-col justify-between pt-24 md:pt-28 pb-10 px-5 sm:px-10 lg:px-16 overflow-hidden perspective-1000 select-none bg-zinc-950"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full grid grid-cols-4 grid-rows-3 border-collapse">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border border-white/10 relative">
              <span className="absolute -top-1 -left-1 text-[10px] text-emerald-500/40 font-mono">+</span>
            </div>
          ))}
        </div>
      </div>

      {/* Giant Background Watermark */}
      <div
        ref={watermarkRef}
        className="absolute top-12 left-0 right-0 flex justify-center pointer-events-none z-0"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 240"
          className="w-full max-w-7xl h-auto select-none pointer-events-none"
        >
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-extrabold text-[180px] tracking-tighter uppercase font-display fill-white/[0.03]"
          >
            BELAL
          </text>
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between gap-8 md:gap-0">
        
        {/* Top Row / Hero Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-6">
          
          {/* Top Left Statement & Info */}
          <div ref={statementRef} className="md:col-span-7 space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <Code2 size={13} />
              <span>Full-Stack Software Engineer</span>
            </div>

            {/* Mobile Header Title */}
            <div className="block md:hidden space-y-1">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-100 uppercase font-display">
                Belal Waheed
              </h1>
              <p className="text-xs font-mono text-emerald-400">
                Cairo, Egypt • Open for work
              </p>
            </div>

            <p className="text-sm sm:text-base font-normal text-zinc-300 leading-relaxed font-sans">
              Crafting high-performance web applications with <span className="text-zinc-100 font-semibold">React 19</span>, <span className="text-zinc-100 font-semibold">TypeScript</span>, and scalable <span className="text-zinc-100 font-semibold">Node.js / MongoDB</span> backends.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button size="sm" onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Projects
              </Button>
              <a
                href="/Belal_Waheed_Resume.pdf"
                download="Belal_Waheed_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-all active:scale-95"
              >
                <Download size={13} className="text-emerald-400" />
                Resume PDF
              </a>
            </div>
          </div>

          {/* Desktop Top Right Mini Featured Card */}
          <div className="hidden md:flex md:col-span-5 justify-end">
            <div
              ref={cardTopRightRef}
              className="w-52 sm:w-60 p-3.5 rounded-2xl glass hover:border-emerald-500/40 shadow-2xl space-y-2.5 group cursor-pointer transition-all active:scale-[0.98]"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-900 border border-white/10 relative">
                <picture>
                  <source media="(max-width: 640px)" srcSet={featuredProject?.imageMobile || featuredProject?.image} type="image/webp" />
                  <img
                    src={featuredProject?.image || '/projects/tivaq/1.webp'}
                    alt={featuredProject?.title || 'Featured Project'}
                    width={240}
                    height={150}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                  Featured
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-mono font-medium text-zinc-300">
                <span className="text-zinc-100 font-bold truncate max-w-[130px]">{featuredProject?.title?.split('—')[0] || 'Tivaq'}</span>
                <span className="text-emerald-400 text-[11px]">Full-Stack</span>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Dedicated Portrait Avatar - Naturally positioned with zero empty gap */}
        <div ref={mobilePhotoRef} className="flex md:hidden items-center justify-center my-2">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-900/60">
            {/* Ambient emerald backlight glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30 blur-2xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.7) 0%, rgba(6, 182, 212, 0.3) 60%, transparent 80%)' }}
            />
            <img
              src="/profile-m.webp"
              alt="Belal Waheed - Full-Stack & Systems Software Engineer"
              width={320}
              height={320}
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Desktop Center Portrait Photo */}
        <div className="hidden md:flex absolute inset-0 items-end justify-center pointer-events-none z-10">
          <div
            ref={photoRef}
            className="relative w-[280px] sm:w-[360px] lg:w-[440px] h-[50vh] sm:h-[60vh] lg:h-[70vh] pointer-events-auto"
          >
            {/* Ambient emerald backlight glow */}
            <div
              className="absolute inset-0 rounded-[3rem] opacity-25 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 70%)' }}
            />
            {/* Portrait Image */}
            <picture>
              <source media="(max-width: 640px)" srcSet="/profile-m.webp" type="image/webp" />
              <img
                src="/profile.webp"
                alt={PROFILE.name}
                width={440}
                height={580}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top rounded-[2.5rem] border border-white/15 shadow-2xl"
              />
            </picture>
          </div>
        </div>

        {/* Desktop Bottom Row: Name on Left & Quick Contact Widget on Right */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-12 items-end pb-2 gap-6 z-20">
          
          {/* Bottom Left Name */}
          <div ref={nameRef} className="md:col-span-7 space-y-1">
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase block font-semibold">
              Cairo, Egypt • Open for full-time & contract roles
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-100 uppercase leading-none font-display">
              BELAL WAHEED
            </h1>
          </div>

          {/* Bottom Right Contact Card */}
          <div className="md:col-span-5 flex justify-end">
            <div
              ref={cardBottomRightRef}
              className="w-full sm:w-80 p-3.5 rounded-2xl glass hover:border-emerald-500/40 shadow-2xl flex items-center justify-between group cursor-pointer transition-all active:scale-[0.98]"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-emerald-500/30 shrink-0">
                  <img
                    src="/profile-m.webp"
                    alt={PROFILE.name}
                    width={44}
                    height={44}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-[11px] text-zinc-400 font-mono">Get in Touch</p>
                  <p className="text-xs font-bold text-zinc-100">{PROFILE.name}</p>
                  <p className="text-[11px] text-emerald-400 font-medium">{PROFILE.email}</p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="w-full flex items-center justify-center pt-4 text-zinc-400 text-[11px] font-mono gap-1 pointer-events-none"
      >
        <ArrowDown size={12} className="animate-bounce text-emerald-500/60" />
        <span>Scroll to explore projects & skills</span>
      </div>
    </section>
  );
}

export default Hero;
