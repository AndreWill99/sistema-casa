import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Estrutura from "./components/Estrutura";
import Sobre from "./components/Sobre";
import Servicos from "./components/Servicos";
import Contato from "./components/Contato";
import Footer from "./components/Footer";
import Instagram from "./components/Instagram"
import Chatbot from "./components/Chatbox";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Estrutura />
        <Sobre />
        <Servicos />
        <Instagram />
        <Contato />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
