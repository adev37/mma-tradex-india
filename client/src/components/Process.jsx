const steps = [
  {
    no: "01",
    title: "Develop",
    text: "Build AI technology internally, with IPR protection considered from the start.",
  },
  {
    no: "02",
    title: "Protect",
    text: "Secure the technology under intellectual property rights before it goes to market.",
  },
  {
    no: "03",
    title: "Consult",
    text: "Offer the technology to clients as advisory and consultancy services.",
  },
  {
    no: "04",
    title: "Upgrade",
    text: "Apply the same technology to improve MMA Tradex's own product line.",
  },
];

export default function Process() {
  return (
    <section id="process" className="block">
      <div className="wrap">
        <div className="section-head">
          <div className="section-tag mono">HOW IT WORKS</div>
          <h2>From technology to revenue</h2>
          <p>
            A straightforward path from development to monetisation,
            repeated across engagements and product cycles.
          </p>
        </div>

        <div className="process">
          {steps.map((step) => (
            <div className="process-step" key={step.no}>
              <div className="step-no mono">{step.no}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
