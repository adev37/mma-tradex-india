const stats = [
  { label: "Core focus", value: "AI Technology (IPR)" },
  { label: "Revenue stream 1", value: "Consultancy" },
  { label: "Revenue stream 2", value: "Product Upgrades" },
  { label: "Structure", value: "LLP" },
];

export default function About() {
  return (
    <section id="about" className="block">
      <div className="wrap about-grid">
        <div>
          <div className="section-tag mono">ABOUT</div>
          <h2 style={{ marginBottom: 18, fontSize: "clamp(24px,3vw,30px)" }}>
            MMA Tradex LLP
          </h2>
          <p>
            MMA Tradex LLP is built around a single idea: technology is worth
            more when it's owned. We develop AI technology in-house, secure
            it under intellectual property rights, and put it to work in two
            directions — as consultancy services for clients, and as
            continuous upgrades to our own products.
          </p>
          <p>
            This structure keeps our technology development effort
            productive on both fronts, rather than treating services and
            product as separate businesses.
          </p>
        </div>

        <div className="stat-list">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="label">{stat.label}</span>
              <span className="value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
