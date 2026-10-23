export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`bg-surface/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_var(--color-primary-glow)] ${className}`}>
      {children}
    </div>
  );
}