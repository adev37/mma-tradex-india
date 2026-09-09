export default function Hero() {
  return (
    <section className="hero-section">
      <div className="wrap hero-grid">
        <div>
          <div className="filing-no mono">TECHNOLOGY · IPR · CONSULTANCY</div>
          <h1>
            We build AI technology, protect it as IP, and turn that IP into
            revenue.
          </h1>
          <p className="lede">
            MMA Tradex LLP develops proprietary AI technology under
            intellectual property rights, then monetises it two ways —
            through consultancy services built on that technology, and by
            using it to upgrade our own product line.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn-primary">
              Talk to us
            </a>
            <a href="#model" className="btn-secondary">
              See how it works
            </a>
          </div>
        </div>

        <div>
          <svg
            className="diagram"
            viewBox="0 0 420 360"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="419"
              height="359"
              fill="none"
              stroke="#D8D2C4"
            />
            <circle
              cx="210"
              cy="90"
              r="46"
              fill="none"
              stroke="#1C3D5A"
              strokeWidth="1.5"
            />
            <text
              x="210"
              y="85"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize="10"
              fill="#1C3D5A"
            >
              TECH / IPR
            </text>
            <text
              x="210"
              y="99"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize="9"
              fill="#A9702F"
            >
              CORE ASSET
            </text>

            <line
              x1="210"
              y1="136"
              x2="120"
              y2="210"
              stroke="#5C6B75"
              strokeWidth="1"
            />
            <line
              x1="210"
              y1="136"
              x2="300"
              y2="210"
              stroke="#5C6B75"
              strokeWidth="1"
            />

            <rect
              x="55"
              y="212"
              width="130"
              height="70"
              fill="none"
              stroke="#1C3D5A"
              strokeWidth="1.5"
            />
            <text
              x="120"
              y="240"
              textAnchor="middle"
              fontFamily="Source Serif 4"
              fontSize="13"
              fill="#0E1B26"
            >
              Consultancy
            </text>
            <text
              x="120"
              y="258"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize="9"
              fill="#5C6B75"
            >
              REVENUE STREAM 1
            </text>

            <rect
              x="235"
              y="212"
              width="130"
              height="70"
              fill="none"
              stroke="#1C3D5A"
              strokeWidth="1.5"
            />
            <text
              x="300"
              y="240"
              textAnchor="middle"
              fontFamily="Source Serif 4"
              fontSize="13"
              fill="#0E1B26"
            >
              Product Upgrade
            </text>
            <text
              x="300"
              y="258"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize="9"
              fill="#5C6B75"
            >
              REVENUE STREAM 2
            </text>

            <circle cx="210" cy="90" r="4" fill="#A9702F" />
            <circle
              cx="120"
              cy="320"
              r="18"
              fill="none"
              stroke="#A9702F"
              strokeWidth="1"
            />
            <text
              x="120"
              y="317"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize="8"
              fill="#A9702F"
            >
              IPR
            </text>
            <text
              x="120"
              y="327"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize="8"
              fill="#A9702F"
            >
              FILED
            </text>

            <circle
              cx="300"
              cy="320"
              r="18"
              fill="none"
              stroke="#A9702F"
              strokeWidth="1"
            />
            <text
              x="300"
              y="317"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize="8"
              fill="#A9702F"
            >
              IPR
            </text>
            <text
              x="300"
              y="327"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize="8"
              fill="#A9702F"
            >
              APPLIED
            </text>

            <line
              x1="120"
              y1="282"
              x2="120"
              y2="302"
              stroke="#5C6B75"
              strokeWidth="1"
            />
            <line
              x1="300"
              y1="282"
              x2="300"
              y2="302"
              stroke="#5C6B75"
              strokeWidth="1"
            />
          </svg>
          <div className="diagram-caption">
            One core technology asset, two revenue paths.
          </div>
        </div>
      </div>
    </section>
  );
}
