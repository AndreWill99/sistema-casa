import corredor from "../assets/img_casa_corredor.jpeg";
import espaco from "../assets/img_casa_espaço.jpeg";
import fachada from "../assets/img_casa_fachada1.jpeg"

// Para ter 3 fotos como no Figma, adicione mais uma imagem aqui.
const fotos = [
  { src: corredor, alt: "Corredor da casa" },
  { src: espaco, alt: "Espaço de convivência da casa" },
  { src: fachada, alt: "Fachada da casa" }
];

export default function Sobre() {
  return (
    <section id="sobre" className="bg-pessego">
      <div className="mx-auto max-w-3xl px-6 pb-10 pt-12 text-center">
        <h2 className="text-3xl font-bold text-vinho">Sobre nós</h2>
        <p className="mt-6 text-left text-base leading-relaxed sm:text-center">
          Oferecemos atendimento especializado, carinho e respeito para a melhor idade.
          Nossa estrutura é preparada para atender diferentes graus de dependência com
          uma equipe multidisciplinar.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
        {fotos.map((foto) => (
          <img
            key={foto.alt}
            src={foto.src}
            alt={foto.alt}
            className="h-48 w-full object-cover sm:h-56"
          />
        ))}
      </div>
      <div className="h-8" />
    </section>
  );
}
