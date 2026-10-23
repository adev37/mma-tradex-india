import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import WhatWeDo from "./components/sections/WhatWeDo";
import Advantage from "./components/sections/Advantage";
import Process from "./components/sections/Process";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import AIChatbot from "./components/ui/AIChatbot";
import AdminDashboard from "./pages/AdminDashboard"; // <-- Naya Import
import useScrollAnimation from "./hooks/useScrollAnimation";

export default function App() {
  useScrollAnimation();

  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary/30">
      <Routes>
        {/* Main Website Route */}
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Hero />
              <WhatWeDo />
              <Advantage />
              <Process />
              <About />
              <Contact />
            </main>
            <Footer />
            <AIChatbot />
          </>
        } />
        
        {/* Admin Route */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}