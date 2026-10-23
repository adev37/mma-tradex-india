const stats = [
  { label: "Core focus", value: "AI Technology (IPR)", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { label: "Revenue stream 1", value: "Consultancy", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { label: "Revenue stream 2", value: "Product Upgrades", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" },
  { label: "Structure", value: "LLP", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <div className="reveal">
            <div className="text-primary font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary"></span> About Us
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-8 leading-tight">
              MMA Tradex <span className="text-primary italic">LLP</span>
            </h2>
            
            <div className="space-y-6 text-muted leading-relaxed text-lg">
              <p>
                MMA Tradex LLP is built around a single idea: <strong className="text-foreground font-medium">technology is worth more when it's owned.</strong> We develop AI technology in-house, secure it under intellectual property rights, and put it to work in two directions.
              </p>
              <p>
                This structure keeps our technology development effort productive on both fronts — as elite consultancy services for clients, and as continuous upgrades to our own products — rather than treating services and product as separate businesses.
              </p>
            </div>

            {/* Quote or Tagline */}
            <div className="mt-10 p-6 border-l-2 border-accent bg-accent/5 rounded-r-xl">
              <p className="text-foreground italic font-serif text-lg">"One core asset. Two revenue streams. Infinite compounding value."</p>
            </div>
          </div>

          {/* Right Side: Modern Stats Dashboard */}
          <div className="reveal relative" style={{ transitionDelay: '100ms' }}>
            {/* Outer Glass Card */}
            <div className="bg-background/60 backdrop-blur-2xl border border-border/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] group hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
              
              {/* Inner decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>

              <div className="flex justify-between items-end mb-8 relative z-10 border-b border-border/50 pb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Company Overview</h3>
                  <p className="text-sm text-muted">Key operational metrics</p>
                </div>
                <div className="px-3 py-1 bg-success/10 border border-success/20 rounded-full text-xs font-mono text-success flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span> Active
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-hover transition-colors group/item cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon Box */}
                      <div className="w-10 h-10 rounded-lg bg-surface border border-border/50 flex items-center justify-center text-muted group-hover/item:text-primary group-hover/item:border-primary/30 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-muted group-hover/item:text-foreground transition-colors">{stat.label}</span>
                    </div>
                    <span className="text-sm font-bold text-foreground text-right group-hover/item:text-primary transition-colors">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Tag */}
              <div className="mt-6 pt-6 border-t border-border/50 text-center relative z-10">
                <p className="text-xs font-mono text-muted">Registered under Limited Liability Partnership Act</p>
              </div>

            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}