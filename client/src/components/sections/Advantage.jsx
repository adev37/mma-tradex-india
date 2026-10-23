const items = [
  { id: "A", title: "Defensible advantage", text: "IPR turns internal know-how into a protected asset competitors can't simply copy." },
  { id: "B", title: "Two revenue lines, one asset", text: "The same technology is licensed out through consultancy and reused internally in products." },
  { id: "C", title: "Compounding value", text: "Each upgrade and each engagement adds to the same underlying IP portfolio." },
];

export default function IprAdvantage() {
  return (
    <section id="advantage" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16 reveal">
          <div className="text-accent font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent"></span> Why IPR Matters
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
              className="reveal group bg-surface/40 backdrop-blur-sm border border-border p-8 rounded-2xl hover:border-accent/40 hover:bg-surface transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] relative overflow-hidden"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-background border border-border group-hover:border-accent/50 group-hover:bg-accent/10 text-muted group-hover:text-accent font-mono font-bold text-xl flex items-center justify-center rounded-xl mb-6 transition-all duration-300">
                {item.id}
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}