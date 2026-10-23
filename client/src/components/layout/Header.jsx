import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- 1. Naya Import

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // <-- 2. Navigate hook initialize kiya

  // Scroll hone par navbar ka look change karne ke liye
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#model", label: "What We Do" },
    { href: "#advantage", label: "IPR Advantage" },
    { href: "#process", label: "How It Works" },
    { href: "#about", label: "About" },
  ];

  // Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  // Theme change hone par HTML tag pe class lagao
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // 3. Secret Admin Access Function (Double Click Logic)
  const handleLogoClick = (e) => {
    // Agar user 2 baar click karta hai (Double Click)
    if (e.detail === 2) {
      navigate("/admin");
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 flex justify-center ${scrolled ? 'pt-4' : 'pt-6'}`}>
      
      {/* Floating Pill Container */}
      <div className={`w-[95%] max-w-6xl transition-all duration-500 rounded-full border flex items-center justify-between px-4 md:px-6 py-3
        ${scrolled 
          ? 'bg-background/70 backdrop-blur-xl border-border/50 shadow-lg shadow-black/20' 
          : 'bg-transparent border-transparent'
        }`}
      >
        
        {/* Brand - Premium Logo (Updated with onClick) */}
        <a 
          href="#" 
          onClick={handleLogoClick} // <-- Double click event yahan lagaya
          className="flex items-center gap-3 group select-none cursor-pointer"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-surface to-background border border-border group-hover:border-primary/50 rounded-xl flex items-center justify-center shadow-xl transition-all duration-300 overflow-hidden">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary z-10 group-hover:scale-110 transition-transform duration-300">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-sm tracking-wide group-hover:text-primary transition-colors duration-300">
              MMA TRADEX LLP
            </span>
            <span className="text-[10px] text-muted font-mono tracking-widest uppercase mt-0.5">
              AI Technology · IPR
            </span>
          </div>
        </a>

        {/* Desktop Nav with Animated Underline */}
        <nav className="hidden md:flex items-center gap-2">
          <ul className="flex gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  className="relative px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors group"
                >
                  {link.label}
                  <span className="absolute left-4 right-4 bottom-1 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out rounded-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border/50 text-muted hover:text-foreground hover:bg-surface transition-all duration-300 hover:rotate-12"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          {/* Premium Glowing CTA Button */}
          <a 
            href="#contact" 
            className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-background bg-primary overflow-hidden rounded-full group transition-all duration-300 hover:shadow-[0_0_25px_var(--color-primary-glow)] hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center gap-2">
              Get in touch
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground focus:outline-none"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-[2px] bg-foreground transition-all duration-300 ${open ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
            <span className={`w-full h-[2px] bg-foreground transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-[2px] bg-foreground transition-all duration-300 ${open ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <div 
        className={`fixed inset-0 top-[72px] bg-background/90 backdrop-blur-2xl z-40 transition-all duration-300 md:hidden flex flex-col
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="p-6 flex flex-col gap-2">
          {links.map((link, i) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={() => setOpen(false)}
              className={`text-xl font-serif font-medium text-foreground py-4 border-b border-border/50 hover:text-primary transition-colors flex items-center justify-between group
                ${open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'} transition-all duration-300`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
              <span className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
            </a>
          ))}

          {/* Mobile Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className={`flex items-center justify-between w-full mt-6 p-4 rounded-xl bg-surface border border-border text-foreground transition-colors
              ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} duration-300 delay-150`}
          >
            <span className="font-medium">{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          
          {/* Mobile CTA Button */}
          <a 
            href="#contact" 
            onClick={() => setOpen(false)}
            className={`mt-4 bg-gradient-to-r from-primary to-accent text-white text-center px-5 py-4 rounded-2xl font-bold shadow-[0_0_20px_var(--color-primary-glow)] text-lg flex items-center justify-center gap-2
              ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-300 delay-200`}
          >
            Get in touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}