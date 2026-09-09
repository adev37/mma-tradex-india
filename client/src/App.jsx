import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import WhatWeDo from "./components/WhatWeDo.jsx";
import IprAdvantage from "./components/IprAdvantage.jsx";
import Process from "./components/Process.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <WhatWeDo />
      <IprAdvantage />
      <Process />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
