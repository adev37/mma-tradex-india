import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';
const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEnhance = async () => {
    if (!form.message.trim()) {
      setStatus({ state: "error", message: "Please write something first to enhance." });
      return;
    }

    setIsEnhancing(true);
    setStatus({ state: "idle", message: "" });

    try {
      const res = await fetch(`${API_URL}/api/ai/enhance-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: form.message }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setForm({ ...form, message: data.enhancedText });
    } catch (err) {
      setStatus({ state: "error", message: "AI could not enhance the message. Please try again." });
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus({ state: "success", message: "Message received. Our team will contact you shortly." });
      setForm(initialForm);
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  };

  return (
<section id="contact" className="pt-32 lg:pt-40 pb-24 bg-background relative overflow-hidden scroll-mt-24">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Contact Info */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest">Get In Touch</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Let's discuss your <br className="hidden lg:block"/> next tech milestone.
            </h2>
            <p className="text-muted mb-10 leading-relaxed text-lg">
              Whether you're exploring a consultancy engagement or want to know more about our IPR-backed technology, send us a note and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-4">
              {/* Info Card 1 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface/40 border border-border/50 hover:border-primary/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-muted group-hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <div className="text-xs text-muted mb-1">Company</div>
                  <div className="font-medium text-foreground">MMA Tradex LLP</div>
                </div>
              </div>

              {/* Info Card 2 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface/40 border border-border/50 hover:border-primary/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-muted group-hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <div className="text-xs text-muted mb-1">Focus Area</div>
                  <div className="font-medium text-foreground">AI Technology (IPR)</div>
                </div>
              </div>

              {/* Info Card 3 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface/40 border border-border/50 hover:border-primary/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-muted group-hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <div className="text-xs text-muted mb-1">Direct Email</div>
                  <a href="mailto:mmatradex35@gmail.com" className="font-medium text-primary hover:text-primary-hover transition-colors">mmatradex35@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Modern Form */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <form onSubmit={handleSubmit} className="bg-surface/30 backdrop-blur-xl border border-border/60 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
              
              {/* Form Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

              <div className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <input 
                      id="name" 
                      name="name" 
                      type="text" 
                      value={form.name} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-background transition-all" 
                      placeholder="Your full name" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-background transition-all" 
                      placeholder="you@company.com" 
                    />
                  </div>
                </div>
                
                {/* Message Field with AI Enhance Button */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                    
                    {/* AI Enhance Button */}
                    <button 
                      type="button"
                      onClick={handleEnhance}
                      disabled={isEnhancing}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      {isEnhancing ? (
                        <><svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Enhancing...</>
                      ) : (
                        <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> Enhance with AI</>
                      )}
                    </button>
                  </div>
                  
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={form.message} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-background transition-all resize-none" 
                    placeholder="How can we help you?" 
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status.state === "loading"} 
                  className="group relative w-full bg-primary text-background px-6 py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all duration-300 hover:shadow-[0_0_25px_var(--color-primary-glow)] disabled:opacity-50 overflow-hidden mt-2"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status.state === "loading" ? "Sending..." : "Send Message"}
                    {status.state !== "loading" && (
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    )}
                  </span>
                </button>

                {status.state === "success" && (
                  <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-xl text-success text-sm">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {status.message}
                  </div>
                )}
                {status.state === "error" && (
                  <div className="flex items-center gap-3 p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {status.message}
                  </div>
                )}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}