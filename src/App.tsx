import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import QaLab from "./components/QaLab";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./styles/components.css";

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <About />
        <QaLab />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
