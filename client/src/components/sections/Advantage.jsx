const items = [
  {
    id: "A",
    title: "Defensible advantage",
    text: "IPR turns internal know-how into a protected asset competitors can't simply copy.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" // Shield Icon
  },
  {
    id: "B",
    title: "Two revenue lines, one asset",
    text: "The same technology is licensed out through consultancy and reused internally in products.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" // Growth Chart Icon
  },
  {
    id: "C",
    title: "Compounding value",
    text: "Each upgrade and each engagement adds to the same underlying IP portfolio.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" // Layers/Stack Icon
  },
];

export default function IprAdvantage() {
  return (
    <section id="advantage" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            <span className="text-[11px] font-mono font-bold text-accent uppercase tracking-widest">Why IPR Matters</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
            Technology that is owned, <br /> not just used.
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Developing technology under intellectual property rights is what lets one core asset support two separate revenue lines without competing against itself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {items.map((item, index) => (
            <div 
              key={item.id} 
              // NAYA CODE: Yahan box-shadow aur ring add ki hai
              className="reveal group relative bg-surface border-2 border-border/50 p-8 rounded-3xl shadow-sm transition-all duration-300 overflow-hidden
                hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:ring-1 hover:ring-accent/50"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background Glow (Light jaisa effect) - Hover pe dikhega */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon Container with Premium Styling */}
              <div className="w-14 h-14 bg-background border border-border rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all duration-300 relative z-10
                group-hover:border-accent/60 group-hover:bg-accent/10 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] group-hover:scale-105">
                <svg className="w-6 h-6 text-muted group-hover:text-accent transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}