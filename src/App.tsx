import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { Layout } from '@/components/layout';

import { HomePage } from '@/pages/HomePage';

// Lazy-loaded secondary route views for optimal code-splitting
const ProjectPage = lazy(() => import('@/pages/ProjectPage').then((m) => ({ default: m.ProjectPage })));
const ResumePage = lazy(() => import('@/pages/ResumePage').then((m) => ({ default: m.ResumePage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Helper component to scroll window and Lenis virtual scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If arriving with a section hash, let the section scroll handler manage the offset
    if (hash) return;

    // Reset native DOM scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Reset Lenis virtual scroll state immediately
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: { immediate: boolean }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash]);

  return null;
}

// Minimal Obsidian Loading Skeleton
function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="relative w-12 h-12 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
          BW
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-emerald-500/30 animate-ping pointer-events-none" />
      </div>
      <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
        Loading View...
      </div>
    </div>
  );
}

export function App() {
  useEffect(() => {
    // Only initialize Lenis smooth scroll on non-touch desktop devices with fine pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

    let cleanup: (() => void) | undefined;

    Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 0,
      });

      // Expose lenis instance to window for global scroll synchronization
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(500, 33);

      cleanup = () => {
        gsap.ticker.remove(tickerCallback);
        (window as unknown as { __lenis?: unknown }).__lenis = null;
        lenis.destroy();
      };
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
