const steps = [
  { no: "01", title: "Develop", text: "Build AI technology internally, with IPR protection considered from the start." },
  { no: "02", title: "Protect", text: "Secure the technology under intellectual property rights before it goes to market." },
  { no: "03", title: "Consult", text: "Offer the technology to clients as advisory and consultancy services." },
  { no: "04", title: "Upgrade", text: "Apply the same technology to improve MMA Tradex's own product line." },
];

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mb-16 reveal">
          <div className="text-primary font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-primary"></span> Methodology
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
            From technology <br/> to revenue.
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            A straightforward path from development to monetisation, repeated across engagements and product cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-primary via-border to-transparent"></div>

          {steps.map((step, index) => (
            <div key={step.no} className="reveal group relative" style={{ transitionDelay: `${index * 100}ms` }}>
              {/* Number Circle */}
              <div className="w-24 h-24 rounded-full bg-surface border-2 border-border flex items-center justify-center mb-6 relative z-10 group-hover:border-primary group-hover:bg-background transition-colors duration-300">
                <span className="text-3xl font-mono font-bold text-muted group-hover:text-primary transition-colors duration-300">
                  {step.no}
                </span>
              </div>
              
              <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}