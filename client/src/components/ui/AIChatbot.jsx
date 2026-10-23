import { useState, useRef, useEffect } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi, I'm MMA's AI assistant. What tech challenge are you solving today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  // Lead Capture States
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Aapka browser voice input support nahi karta. Please use Google Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, network issue. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Jab user close button dabaye
  const handleClose = () => {
    // Agar chat me 2 se zyada messages hain aur lead nahi aaya, to form dikhao
    if (messages.length > 2 && !leadSubmitted) {
      setShowLeadForm(true);
    } else {
      setIsOpen(false);
    }
  };

  // Lead Form Submit
  const submitLead = async (e) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email) return;

    // AI se chat ka summary nikalwao
    try {
      const summaryRes = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Summarize this chat in 1 short line for a sales lead: ${messages.map(m => m.text).join(" ")}` }),
      });
      const summaryData = await summaryRes.json();
      
      const summary = summaryData.reply || "User interacted with AI assistant.";

      // Lead Save karo
      await fetch(`${API_URL}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...leadData, summary }),
      });

      setLeadSubmitted(true);
      setShowLeadForm(false);
      setIsOpen(false);
    } catch (err) {
      alert("Kuch gadbad ho gayi. Please try again.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen && (
        <div className="bg-surface border border-border rounded-2xl shadow-2xl w-[350px] mb-4 overflow-hidden flex flex-col h-[500px]">
          
          {/* Header */}
          <div className="bg-primary/10 border-b border-border p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
              <div>
                <div className="text-sm font-bold text-foreground">MMA AI Assistant</div>
                <div className="text-[10px] text-success flex items-center gap-1"><span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span> Online</div>
              </div>
            </div>
            <button onClick={handleClose} className="text-muted hover:text-foreground">✕</button>
          </div>

          {/* Lead Form UI */}
          {showLeadForm ? (
            <div className="flex-1 p-6 flex flex-col justify-center bg-background">
              <h3 className="text-lg font-bold text-foreground mb-2">Before you go!</h3>
              <p className="text-sm text-muted mb-4">Leave your details, and our team will reach out to help you.</p>
              <form onSubmit={submitLead} className="space-y-3">
                <input type="text" placeholder="Your Name" required value={leadData.name} onChange={(e) => setLeadData({...leadData, name: e.target.value})} className="w-full bg-surface border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                <input type="email" placeholder="Your Email" required value={leadData.email} onChange={(e) => setLeadData({...leadData, email: e.target.value})} className="w-full bg-surface border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                <button type="submit" className="w-full bg-primary text-background font-bold py-2.5 rounded-xl hover:bg-primary-hover transition-colors">Submit & Close</button>
              </form>
            </div>
          ) : (
            <>
              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-background">
                {messages.map((msg, i) => (
                  <div key={i} className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-background self-end rounded-br-sm' : 'bg-surface border border-border text-foreground self-start rounded-bl-sm'}`}>
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="bg-surface border border-border p-3 rounded-2xl rounded-bl-sm self-start text-sm text-muted flex gap-1 w-16 justify-center">
                    <span className="animate-bounce">●</span><span className="animate-bounce delay-100">●</span><span className="animate-bounce delay-200">●</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="p-3 border-t border-border bg-surface">
                <div className="flex gap-2 items-center">
                  <button type="button" onClick={startListening} className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl transition-all ${isListening ? 'bg-error text-white animate-pulse' : 'bg-background border border-border text-muted hover:text-primary'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  </button>
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or speak..." className="flex-1 bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
                  <button type="submit" className="bg-primary text-background px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-hover">Send</button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

{/* Toggle Button */}
<button onClick={() => isOpen ? handleClose() : setIsOpen(true)} className="bg-primary text-background w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_var(--color-primary-glow)] hover:scale-105 transition-transform ml-auto">
  {isOpen ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <span className="text-2xl">✨</span>}
</button>
    </div>
  );
}