import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#model", label: "What We Do" },
    { href: "#advantage", label: "IPR Advantage" },
    { href: "#process", label: "How It Works" },
    { href: "#about", label: "About" },
  ];

  return (
    <header>
      <div className="wrap nav">
        <div className="brand">
          <div className="brand-mark">M</div>
          <div>
            <div className="brand-name">MMA TRADEX LLP</div>
            <div className="brand-sub">AI Technology Development · IPR</div>
          </div>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="nav-cta">
          Get in touch
        </a>
      </div>
    </header>
  );
}
