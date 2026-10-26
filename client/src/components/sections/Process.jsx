const steps = [
  { no: "01", title: "Develop", text: "Build AI technology internally, with IPR protection considered from the start." },
  { no: "02", title: "Protect", text: "Secure the technology under intellectual property rights before it goes to market." },
  { no: "03", title: "Consult", text: "Offer the technology to clients as advisory and consultancy services." },
  { no: "04", title: "Upgrade", text: "Apply the same technology to improve MMA Tradex's own product line." },
];

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest">Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
            From technology <br/> to revenue.
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            A straightforward path from development to monetisation, repeated across engagements and product cycles.
          </p>
        </div>

        {/* Modern Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          
          {/* Connecting Line (Sirf desktop pe dikhegi) */}
          <div className="hidden lg:block absolute top-[48px] left-8 right-8 h-[2px] bg-gradient-to-r from-border via-primary/50 to-border z-0"></div>

          {steps.map((step, index) => (
            <div key={step.no} className="relative reveal group z-10" style={{ transitionDelay: `${index * 100}ms` }}>
              
              {/* Number Circle */}
              <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                {/* Outer Glow (Hover pe dikhega) */}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Main Circle */}
                <div className="relative w-20 h-20 rounded-full bg-background border-2 border-border group-hover:border-primary flex items-center justify-center shadow-sm group-hover:shadow-[0_0_20px_var(--color-primary-glow)] transition-all duration-500 group-hover:-translate-y-1">
                  <span className="text-2xl font-mono font-bold text-muted group-hover:text-primary transition-colors duration-300">
                    {step.no}
                  </span>
                  
                  {/* Inner Ring Animation */}
                  <div className="absolute inset-1 rounded-full border border-border group-hover:border-primary/30 transition-colors duration-300"></div>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="text-center px-2">
                <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.text}
                </p>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}