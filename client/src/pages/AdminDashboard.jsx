import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState("messages");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Popups ke states
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null); // Naya lead popup state

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Contact Messages fetch karo
      const res = await fetch(`${API_URL}/api/contact/messages`, {
        headers: { "x-admin-key": password }
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        setIsAuthenticated(true);
        localStorage.setItem("admin_key", password);

        // 2. AI Leads fetch karo
        const leadsRes = await fetch(`${API_URL}/api/lead`, {
          headers: { "x-admin-key": password }
        });
        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          setLeads(leadsData);
        }

      } else {
        setError("Galat Password! Access denied.");
      }
    } catch (err) {
      setError("Server se connect nahi ho paya. Backend chalu hai kya?");
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIN SCREEN UI ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground">Admin Portal</h2>
            <p className="text-sm text-muted mt-1">Enter your secret key to access messages</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                placeholder="Enter Admin Secret Key" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-all"
                required
              />
            </div>
            {error && <p className="text-error text-sm text-center bg-error/10 p-2 rounded-lg">{error}</p>}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-background font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors"
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-muted hover:text-primary transition-colors">← Back to Website</Link>
          </div>
        </div>
      </div>
    );
  }

  // --- ADMIN DASHBOARD UI ---
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-surface border border-border p-6 rounded-2xl">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted mt-1">Manage contact inquiries & AI leads</p>
          </div>
          <div className="flex gap-4">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">View Site</Link>
            <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 text-sm font-medium text-error bg-error/10 rounded-lg hover:bg-error/20 transition-colors">Logout</button>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex border-b border-border mb-6">
          <button 
            onClick={() => setActiveTab("messages")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "messages" ? "border-primary text-primary" : "border-transparent text-muted hover:text-foreground"}`}
          >
            Contact Inquiries
          </button>
          <button 
            onClick={() => setActiveTab("leads")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "leads" ? "border-primary text-primary" : "border-transparent text-muted hover:text-foreground"}`}
          >
            AI Chat Leads
          </button>
        </div>

        {/* TABLE 1: Contact Messages */}
        {activeTab === "messages" && (
          <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background/50 border-b border-border">
                    <th className="p-4 text-xs font-mono text-muted uppercase tracking-wider">Name</th>
                    <th className="p-4 text-xs font-mono text-muted uppercase tracking-wider">Email</th>
                    <th className="p-4 text-xs font-mono text-muted uppercase tracking-wider w-1/2">Message</th>
                    <th className="p-4 text-xs font-mono text-muted uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-muted">No messages found.</td>
                    </tr>
                  ) : (
                    messages.map((msg) => (
                      <tr 
                        key={msg._id} 
                        onClick={() => setSelectedMessage(msg)}
                        className="hover:bg-surface-hover cursor-pointer transition-colors group"
                      >
                        <td className="p-4 text-sm font-medium text-foreground group-hover:text-primary transition-colors">{msg.name}</td>
                        <td className="p-4 text-sm text-primary"><a href={`mailto:${msg.email}`} onClick={(e) => e.stopPropagation()}>{msg.email}</a></td>
                        <td className="p-4 text-sm text-muted leading-relaxed truncate max-w-xs">{msg.message}</td>
                        <td className="p-4 text-xs text-muted whitespace-nowrap">{new Date(msg.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TABLE 2: AI Chat Leads */}
        {activeTab === "leads" && (
          <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background/50 border-b border-border">
                    <th className="p-4 text-xs font-mono text-muted uppercase tracking-wider">Name</th>
                    <th className="p-4 text-xs font-mono text-muted uppercase tracking-wider">Email</th>
                    <th className="p-4 text-xs font-mono text-muted uppercase tracking-wider w-1/2">Chat Summary</th>
                    <th className="p-4 text-xs font-mono text-muted uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-muted">No AI leads found yet.</td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr 
                        key={lead._id} 
                        onClick={() => setSelectedLead(lead)}
                        className="hover:bg-surface-hover cursor-pointer transition-colors group"
                      >
                        <td className="p-4 text-sm font-medium text-foreground group-hover:text-accent transition-colors">{lead.name}</td>
                        <td className="p-4 text-sm text-primary"><a href={`mailto:${lead.email}`} onClick={(e) => e.stopPropagation()}>{lead.email}</a></td>
                        <td className="p-4 text-sm text-muted leading-relaxed truncate max-w-xs">{lead.summary}</td>
                        <td className="p-4 text-xs text-muted whitespace-nowrap">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* --- MESSAGE MODAL POPUP --- */}
      {selectedMessage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedMessage(null)}
        >
          <div 
            className="bg-surface border border-border rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

            <div className="flex justify-between items-start p-6 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold uppercase">
                  {selectedMessage.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedMessage.name}</h3>
                  <p className="text-sm text-muted">{selectedMessage.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="p-2 text-muted hover:text-foreground bg-background rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono text-muted uppercase tracking-wider">Message Received</span>
                <span className="text-xs text-muted">{new Date(selectedMessage.createdAt).toLocaleString()}</span>
              </div>
              <div className="bg-background border border-border/50 rounded-xl p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                {selectedMessage.message}
              </div>
            </div>

            <div className="p-6 bg-background/50 border-t border-border/50 flex gap-3">
              <a 
                href={`mailto:${selectedMessage.email}?subject=Reply to your inquiry - MMA Tradex LLP`}
                className="flex-1 bg-primary text-background font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Reply via Email
              </a>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="px-6 py-3 text-sm font-medium text-foreground bg-surface border border-border rounded-xl hover:bg-surface-hover transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- LEAD MODAL POPUP --- */}
      {selectedLead && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedLead(null)}
        >
          <div 
            className="bg-surface border border-border rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

            <div className="flex justify-between items-start p-6 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent text-xl font-bold uppercase">
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedLead.name}</h3>
                  <p className="text-sm text-muted">{selectedLead.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 text-muted hover:text-foreground bg-background rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono text-accent uppercase tracking-wider">AI Chat Summary</span>
                <span className="text-xs text-muted">{new Date(selectedLead.createdAt).toLocaleString()}</span>
              </div>
              <div className="bg-background border border-border/50 rounded-xl p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                {selectedLead.summary}
              </div>
            </div>

            <div className="p-6 bg-background/50 border-t border-border/50 flex gap-3">
              <a 
                href={`mailto:${selectedLead.email}?subject=Following up on your AI chat - MMA Tradex LLP`}
                className="flex-1 bg-accent text-white font-bold py-3 rounded-xl hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Reply via Email
              </a>
              <button 
                onClick={() => setSelectedLead(null)}
                className="px-6 py-3 text-sm font-medium text-foreground bg-surface border border-border rounded-xl hover:bg-surface-hover transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}