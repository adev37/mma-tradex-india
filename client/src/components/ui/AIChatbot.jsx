import { useState } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi, I'm MMA's AI assistant. What tech challenge are you solving today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let aiResponse = "That's an interesting challenge. Our IPR-backed AI models can help streamline that process. Would you like to schedule a consultation?";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes("ai") || lower.includes("machine learning")) {
        aiResponse = "Great! We specialize in proprietary AI development. We can build custom models and secure them under IPR for you. Shall we discuss a roadmap?";
      } else if (lower.includes("patent") || lower.includes("ipr")) {
        aiResponse = "Protecting your tech is crucial. We offer IPR-aware development consulting to ensure your assets are secure. Let's connect for a strategy session.";
      } else if (lower.includes("consulting") || lower.includes("help")) {
        aiResponse = "Our consultancy services are built on years of AI R&D. We can advise your team on AI strategy and implementation. Tell me more about your team's goals.";
      }

      setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-surface border border-border rounded-xl shadow-2xl w-[350px] mb-4 overflow-hidden flex flex-col h-[450px]">
          {/* Header */}
          <div className="bg-primary/10 border-b border-border p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs">AI</div>
              <div>
                <div className="text-sm font-bold text-foreground">MMA AI Assistant</div>
                <div className="text-xs text-success flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span> Online
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted hover:text-foreground">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-background">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-primary text-white self-end rounded-br-none' : 'bg-surface border border-border text-foreground self-start rounded-bl-none'}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="bg-surface border border-border p-3 rounded-lg rounded-bl-none self-start text-sm text-muted flex gap-1">
                <span className="animate-bounce">●</span><span className="animate-bounce delay-100">●</span><span className="animate-bounce delay-200">●</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-border bg-surface">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our tech..." 
                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              />
              <button type="submit" className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-primary-hover">
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_var(--color-primary-glow)] hover:scale-105 transition-transform"
      >
        {isOpen ? "✕" : "✨"}
      </button>
    </div>
  );
}