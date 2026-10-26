import { useState } from "react";

export default function IprAnalyzer() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Lead Capture States
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setShowLeadForm(false); // Naya analysis karne par purana form reset ho jaye
    setLeadSubmitted(false);

    try {
      const res = await fetch(`${API_URL}/api/ai/analyze-ipr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.analysis);
    } catch (err) {
      setError(err.message || "Kuch gadbad ho gayi.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookConsultation = async (e) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email) return;

    try {
      await fetch(`${API_URL}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...leadData, 
          summary: `IPR Analyzer Lead: Client analyzed an idea (Novelty: ${result.noveltyScore}). Idea: ${idea}` 
        }),
      });
      setLeadSubmitted(true);
      setShowLeadForm(false);
    } catch (err) {
      alert("Kuch gadbad ho gayi. Please try again.");
    }
  };

  // Novelty score ke hisaab se color
  const getScoreColor = (score) => {
    const num = parseInt(score);
    if (num >= 70) return "text-success";
    if (num >= 40) return "text-accent";
    return "text-error";
  };

  return (
    <section id="ipr-analyzer" className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-mono text-primary uppercase tracking-wider">IPR Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-foreground mb-6">
            Is Your Idea <span className="text-primary italic">Patentable?</span>
          </h2>
          <p className="text-lg text-muted">
            Describe your technology and our AI will instantly evaluate its novelty and patentability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: Input */}
          <div className="bg-background border border-border rounded-3xl p-6 md:p-8 shadow-xl reveal">
            <form onSubmit={handleAnalyze}>
              <label className="block text-sm font-medium text-foreground mb-3">Describe your invention</label>
              <textarea
                rows="5"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="E.g., An AI-powered smart helmet for miners that detects toxic gases and sends alerts via satellite..."
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all resize-none mb-4"
                required
              />
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-background font-bold py-4 rounded-xl hover:bg-primary-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze IPR Potential"}
              </button>
            </form>
            {error && <p className="text-error text-sm text-center bg-error/10 p-3 rounded-lg mt-4">{error}</p>}
          </div>

          {/* RIGHT: Result */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            {result ? (
              <div className="bg-background border border-primary/30 rounded-3xl p-8 shadow-[0_0_40px_var(--color-primary-glow)] relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/50">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">IPR Analysis Report</h3>
                    <p className="text-sm text-muted mt-1">{result.summary}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`text-3xl font-bold ${getScoreColor(result.noveltyScore)}`}>{result.noveltyScore}</div>
                    <div className="text-[10px] font-mono text-muted uppercase mt-1">Novelty</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-mono text-primary uppercase tracking-wider mb-3">Patentable Areas</div>
                  <ul className="space-y-2">
                    {result.patentableAreas?.map((area, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">🛡️</span> {area}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-mono text-error uppercase tracking-wider mb-3">Potential Risks</div>
                  <ul className="space-y-2">
                    {result.risks?.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted">
                        <span className="text-error mt-1">⚠️</span> {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-surface rounded-xl border border-border/50">
                  <div className="text-xs font-mono text-muted uppercase mb-1">AI Recommendation</div>
                  <p className="text-sm text-foreground font-medium">{result.recommendation}</p>
                </div>

                {/* Consultation Button aur Form (Sahi jagah pe) */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  {!showLeadForm && !leadSubmitted && (
                    <button 
                      onClick={() => setShowLeadForm(true)}
                      className="w-full bg-accent text-background font-bold py-3 rounded-xl hover:bg-accent-hover transition-colors"
                    >
                      Book Free IPR Consultation
                    </button>
                  )}

                  {leadSubmitted && (
                    <div className="bg-success/10 border border-success/20 text-success text-sm p-3 rounded-lg text-center font-medium">
                      ✅ Request sent! Our team will contact you shortly.
                    </div>
                  )}

                  {showLeadForm && (
                    <form onSubmit={handleBookConsultation} className="bg-surface border border-border rounded-xl p-4 space-y-3">
                      <p className="text-xs text-muted mb-2">Enter your details to discuss this analysis with our experts.</p>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        required 
                        value={leadData.name}
                        onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        required 
                        value={leadData.email}
                        onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                      <button 
  type="submit"
  className="w-full bg-accent text-background font-bold py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
>
  Submit Request
</button>
                    </form>
                  )}
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-background/50">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-lg font-bold text-foreground mb-2">Awaiting your invention...</h3>
                <p className="text-sm text-muted max-w-xs">Get a free AI-driven IPR audit before filing a patent.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}