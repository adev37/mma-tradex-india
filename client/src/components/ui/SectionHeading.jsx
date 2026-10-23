export default function SectionHeading({ tag, title, description }) {
  return (
    <div className="max-w-3xl mb-16 reveal">
      <div className="inline-block bg-accent/10 text-accent font-mono text-xs tracking-widest uppercase px-3 py-1 mb-4 rounded-full border border-accent/20">
        {tag}
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}