import { useState } from "react";

export default function Estimator() {
  const [idea, setIdea] = useState("");
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

  const handleEstimate = async (e) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    setError("");
    setEstimate(null);

    try {
      const res = await fetch(`${API_URL}/api/ai/estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setEstimate(data.estimate);
    } catch (err) {
      setError(err.message || "Kuch gadbad ho gayi. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="estimator" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-mono text-accent uppercase tracking-wider">AI Powered Tool</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-foreground mb-6">
            Get Instant <span className="text-accent italic">Project Estimate</span>
          </h2>
          <p className="text-lg text-muted">
            Describe your idea below. Our AI will analyze it and generate a professional project scope, timeline, and tech stack instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: Input Form */}
          <div className="bg-surface/50 backdrop-blur-md border border-border rounded-3xl p-6 md:p-8 shadow-2xl reveal">
            <form onSubmit={handleEstimate}>
              <label className="block text-sm font-medium text-foreground mb-3">
                Describe your project idea
              </label>
              <textarea
                rows="6"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="E.g., I want to build an AI-powered healthcare app where patients can upload reports and get instant analysis, along with a dashboard for doctors..."
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none mb-4"
                required
              />
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-accent text-background font-bold py-4 rounded-xl hover:bg-accent-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Generating Estimate...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Generate AI Estimate
                  </>
                )}
              </button>
            </form>
            {error && <p className="text-error text-sm text-center bg-error/10 p-3 rounded-lg mt-4">{error}</p>}
          </div>

          {/* RIGHT: Result Card */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            {estimate ? (
              <div className="bg-surface border border-accent/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(245,158,11,0.1)] relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{estimate.projectName}</h3>
                <p className="text-sm text-muted mb-6">{estimate.overview}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-background border border-border rounded-xl p-4">
                    <div className="text-xs text-muted mb-1">Estimated Timeline</div>
                    <div className="font-bold text-foreground">{estimate.timeline}</div>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-4">
                    <div className="text-xs text-muted mb-1">Estimated Budget</div>
                    <div className="font-bold text-accent">{estimate.budget}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Recommended Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {estimate.techStack?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md text-xs font-mono">{tech}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Core Features</div>
                  <ul className="space-y-2">
                    {estimate.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-accent mt-1">✦</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-border/50">
                  <a href="#contact" className="block w-full text-center bg-primary text-background font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors">
                    Discuss this Project with Us
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-surface/20">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-accent">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Waiting for your idea...</h3>
                <p className="text-sm text-muted max-w-xs">Describe your project on the left and click generate to see the magic happen.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}