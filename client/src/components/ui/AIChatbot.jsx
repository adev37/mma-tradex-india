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

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Voice Input Logic (Web Speech API)
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Aapka browser voice input support nahi karta. Please use Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; // Default Hindi/English (Hinglish) ke liye
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
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
      // Backend AI API Call (Jo hum next step me banayenge)
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';
      
      const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      // Agar API fail ho jaye to fallback
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, network issue. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen && (
        <div className="bg-surface border border-border rounded-2xl shadow-2xl w-[350px] mb-4 overflow-hidden flex flex-col h-[500px]">
          
          {/* Header */}
          <div className="bg-primary/10 border-b border-border p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-[0_0_15px_var(--color-primary-glow)]">AI</div>
              <div>
                <div className="text-sm font-bold text-foreground">MMA AI Assistant</div>
                <div className="text-[10px] text-success flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span> Online
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted hover:text-foreground">✕</button>
          </div>

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
              
              {/* Voice Mic Button */}
              <button 
                type="button" 
                onClick={startListening}
                className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl transition-all ${isListening ? 'bg-error text-white animate-pulse' : 'bg-background border border-border text-muted hover:text-primary'}`}
              >
                {isListening ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                )}
              </button>

              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or speak..." 
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-all"
              />
              
              <button type="submit" className="bg-primary text-background px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-hover transition-colors">
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-primary text-background w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_var(--color-primary-glow)] hover:scale-105 transition-transform ml-auto"
      >
        {isOpen ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <span className="text-2xl">✨</span>}
      </button>
    </div>
  );
}