export default function Hero() {
  return (
<section className="relative min-h-screen flex items-center pt-32 lg:pt-40 overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-2xl reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-medium text-muted">Next-Gen AI & IPR Consultancy</span>
            </div>
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
  Engineering Proprietary <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI Assets</span> & Defensible IP.
</h1>

<p className="text-xl text-muted mb-10 max-w-lg leading-relaxed">
  MMA Tradex LLP builds secure, proprietary AI systems. We transform deep-tech R&D into protected intellectual property, monetizing it through elite consultancy and continuous product evolution.
</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="group bg-primary text-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-primary-hover transition-all duration-300 hover:shadow-[0_0_20px_var(--color-primary-glow)] flex items-center justify-center gap-2">
                Partner With Us
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a href="#model" className="bg-white/5 border border-white/10 text-foreground px-8 py-4 rounded-lg font-semibold text-center hover:bg-white/10 transition-colors">
                Explore Our Tech
              </a>
            </div>
          </div>

          {/* Right Side: Interactive Tech Dashboard */}
          {/* Right Side: Modern Tech Card */}
          <div className="relative reveal hidden lg:block w-full max-w-md mx-auto">
            
            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10"></div>

            {/* Main Glass Card */}
            <div className="relative bg-surface/40 backdrop-blur-xl border border-border/80 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] group hover:border-primary/40 transition-all duration-500">
              
              {/* Card Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">IPR Protected</div>
                    <div className="text-xs text-muted">Secure AI Asset</div>
                  </div>
                </div>
                <div className="px-2.5 py-1 bg-success/10 border border-success/20 rounded-md text-[10px] font-mono text-success uppercase tracking-wider">Verified</div>
              </div>

              {/* Main Value Proposition inside Card */}
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-background/80 border border-border/50 rounded-xl">
                  <div className="text-xs text-muted mb-1 font-mono">Primary Asset</div>
                  <div className="text-lg font-serif font-bold text-foreground">Proprietary AI Core</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/80 border border-border/50 rounded-xl">
                    <div className="text-xs text-muted mb-1 font-mono">Strategy</div>
                    <div className="text-sm font-medium text-foreground">Consultancy</div>
                  </div>
                  <div className="p-4 bg-background/80 border border-border/50 rounded-xl">
                    <div className="text-xs text-muted mb-1 font-mono">Growth</div>
                    <div className="text-sm font-medium text-foreground">Product IP</div>
                  </div>
                </div>
              </div>

              {/* Footer of Card (Replacing fake progress bars) */}
              <div className="flex items-center gap-2 text-xs text-muted bg-surface p-3 rounded-lg border border-border/30">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <span>Generating continuous revenue streams</span>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -right-4 bg-background border border-border p-3 rounded-xl shadow-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-ping"></div>
                <span className="text-xs font-mono text-foreground font-medium">100% Owned</span>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}