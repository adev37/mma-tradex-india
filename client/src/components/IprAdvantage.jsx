const items = [
  {
    id: "A",
    title: "Defensible advantage",
    text: "IPR turns internal know-how into a protected asset competitors can't simply copy.",
  },
  {
    id: "B",
    title: "Two revenue lines, one asset",
    text: "The same technology is licensed out through consultancy and reused internally in products.",
  },
  {
    id: "C",
    title: "Compounding value",
    text: "Each upgrade and each engagement adds to the same underlying IP portfolio.",
  },
];

export default function IprAdvantage() {
  return (
    <section id="advantage" className="block advantage">
      <div className="wrap">
        <div className="section-head">
          <div className="section-tag mono" style={{ color: "#C8944F" }}>
            WHY IPR MATTERS
          </div>
          <h2>Technology that is owned, not just used</h2>
          <p>
            Developing technology under intellectual property rights is what
            lets one core asset support two separate revenue lines without
            competing against itself.
          </p>
        </div>

        <div className="adv-grid">
          {items.map((item) => (
            <div className="adv-item" key={item.id}>
              <div className="num mono">{item.id}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
