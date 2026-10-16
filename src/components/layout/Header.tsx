import { Button } from "@/components/ui";
import { NAV_ITEMS } from "@/data/constants";
import { FileText, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

interface HeaderProps {
  onOpenResume?: () => void;
}

export function Header({ onOpenResume }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Throttled / passive directional scroll detection
  useEffect(() => {
    let ticking = false;

    const handleScrollState = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 20);

          if (currentScrollY < 60) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY.current + 8) {
            if (!isMobileMenuOpen) setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current - 8) {
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScrollState, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollState);
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Zero-cost IntersectionObserver for active navigation highlighting
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = ["home", "about", "projects", "skills", "contact"];
    const observers: IntersectionObserver[] = [];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    observers.push(observer);

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [isHomePage]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href === "#home" || href === "/") {
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (href.startsWith("#")) {
      if (isHomePage) {
        const target = document.querySelector(href);
        if (target) {
          const yOffset = -70;
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      } else {
        navigate(`/${href}`);
      }
    }
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ease-out will-change-transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-zinc-950/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-5 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo & Available Indicator */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleLogoClick}
              className="group cursor-pointer flex items-center gap-2 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs group-hover:border-emerald-400 transition-colors">
                BW
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-100 font-display font-bold text-sm sm:text-base tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">
                  Belal Waheed
                </span>
                <span className="text-[10px] font-mono text-zinc-400 leading-tight">
                  Full-Stack Dev
                </span>
              </div>
            </button>

            {/* Live Availability Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for work
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-zinc-900/80 border border-white/5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isItemActive = isHomePage && activeSection === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    isItemActive
                      ? "text-emerald-400 font-semibold bg-emerald-500/10"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isItemActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Actions (Resume, Contact CTA) */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Resume Button */}
            {onOpenResume ? (
              <button
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-colors cursor-pointer"
              >
                <FileText size={13} className="text-emerald-400" />
                <span>CV</span>
              </button>
            ) : (
              <Link
                to="/resume"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-colors cursor-pointer"
              >
                <FileText size={13} className="text-emerald-400" />
                <span>CV</span>
              </Link>
            )}

            {/* Let's Talk CTA */}
            <Button size="sm" onClick={() => handleNavClick("#contact")}>
              Let's Talk
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200 cursor-pointer active:scale-95 transition-transform"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer with Backdrop Click-to-Close */}
        {isMobileMenuOpen && (
          <>
            {/* Tap backdrop to close */}
            <div
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <div
              ref={menuRef}
              className="md:hidden mt-3 relative z-50 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="p-4 space-y-2 rounded-2xl bg-zinc-900/98 border border-white/10 shadow-2xl backdrop-blur-xl">
                {NAV_ITEMS.map((item) => {
                  const isItemActive = isHomePage && activeSection === item.href;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                        isItemActive
                          ? "bg-emerald-500/15 text-emerald-400 font-semibold"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                <div className="pt-3 mt-2 border-t border-white/10 space-y-2">
                  <Link
                    to="/resume"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 text-zinc-200 text-sm font-medium border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <FileText size={15} className="text-emerald-400" />
                    View Interactive Resume
                  </Link>

                  <Button
                    className="w-full"
                    onClick={() => handleNavClick("#contact")}
                  >
                    Let's Talk
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
