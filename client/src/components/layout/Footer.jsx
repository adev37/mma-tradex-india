export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-sm text-muted">© {new Date().getFullYear()} MMA Tradex LLP. All rights reserved.</p>
        <p className="text-sm font-mono text-muted tracking-widest uppercase">AI Technology · IPR · Consultancy</p>
      </div>
    </footer>
  );
}