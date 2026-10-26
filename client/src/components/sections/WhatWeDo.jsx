export default function WhatWeDo() {
  return (
    <section id="model" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mb-16 reveal">
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
  <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest">Our Model</span>
</div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
            Two ways one technology <br className="hidden sm:block"/> creates value.
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Every engagement starts from the same base: AI technology we develop and hold under IPR. From there, value flows in two directions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1 */}
          <div className="reveal group bg-surface/50 backdrop-blur-sm border border-border p-8 md:p-10 rounded-2xl hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_var(--color-primary-glow)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="text-primary font-mono text-sm tracking-wider mb-6 pb-4 border-b border-border/50 flex justify-between items-center">
              <span>01 / CONSULTANCY</span>
              <span className="text-2xl opacity-20 group-hover:opacity-100 transition-opacity">💼</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              Revenue through consultancy services
            </h3>
            <p className="text-muted mb-8 leading-relaxed">
              We advise organisations on applying our IPR-backed technology development methods to their own AI initiatives — generating recurring services revenue.
            </p>
            <ul className="space-y-4">
              {["AI technology strategy and roadmap advisory", "IPR-aware technology development consulting", "Applied engineering support on client engagements"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="text-primary mt-0.5 bg-primary/10 p-1 rounded-full">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div className="reveal group bg-surface/50 backdrop-blur-sm border border-border p-8 md:p-10 rounded-2xl hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden" style={{ transitionDelay: '100ms' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="text-accent font-mono text-sm tracking-wider mb-6 pb-4 border-b border-border/50 flex justify-between items-center">
              <span>02 / PRODUCT</span>
              <span className="text-2xl opacity-20 group-hover:opacity-100 transition-opacity">🚀</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
              Product upgrades using our technology
            </h3>
            <p className="text-muted mb-8 leading-relaxed">
              The same IP that powers our consultancy work is fed back into our own products, keeping them ahead through continuous, protected technology upgrades.
            </p>
            <ul className="space-y-4">
              {["AI-driven feature upgrades to existing products", "Technology reuse across the product line", "IP-protected improvements that compound over time"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="text-accent mt-0.5 bg-accent/10 p-1 rounded-full">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}