import { useEffect, useState } from "react";

import abertura from "../assets/IMG_abertacasa.jpg";
import corredor from "../assets/img_casa_corredor.jpeg";
import espaco from "../assets/img_casa_espaço.jpeg";
import fachada from "../assets/img_casa_fachada1.jpeg";

// "posicao" controla qual parte da foto fica visível ao cortar (object-position).
const slides = [
  {
    img: abertura,
    alt: "Idoso sorrindo ao lado de um cuidador",
    frase: "Cuidado e carinho para quem você ama",
    apoio: "Um ambiente familiar, seguro e acolhedor.",
    posicao: "center 20%",
  },
  {
    img: corredor,
    alt: "Corredor da casa de repouso",
    frase: "Aqui, cada dia é feito com atenção",
    apoio: "Equipe multidisciplinar ao seu lado, todos os dias.",
    posicao: "center",
  },
  {
    img: espaco,
    alt: "Espaço de convivência da casa",
    frase: "Espaços pensados para o bem-estar",
    apoio: "Conforto, convivência e tranquilidade para a melhor idade.",
    posicao: "center",
  },
  {
    img: fachada,
    alt: "Fachada da casa de repouso",
    frase: "Venha conhecer a nossa casa",
    apoio: "Será um prazer receber você e sua família.",
    posicao: "center 60%",
  },
];

const INTERVALO_MS = 6000;

export default function Hero() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  const proximo = () => setAtual((a) => (a + 1) % slides.length);
  const anterior = () => setAtual((a) => (a - 1 + slides.length) % slides.length);

  useEffect(() => {
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pausado || reduzirMovimento) return;

    const id = setInterval(proximo, INTERVALO_MS);
    return () => clearInterval(id);
  }, [pausado]);

  return (
    <section id="inicio">
      <div
        className="relative mt-16 h-[60vh] max-h-[640px] min-h-[360px] overflow-hidden bg-vinho"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Imagens da casa"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocus={() => setPausado(true)}
        onBlur={() => setPausado(false)}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.frase}
            aria-hidden={i !== atual}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === atual ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
          >
            <img
              src={slide.img}
              alt={slide.alt}
              style={{ objectPosition: slide.posicao }}
              className="h-full w-full object-cover"
            />
            {/* Escurece a foto para o texto ficar legível */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-16 text-white sm:pb-20">
              <p className="max-w-2xl text-3xl font-bold leading-tight drop-shadow sm:text-4xl md:text-5xl">
                {slide.frase}
              </p>
              <p className="mt-3 max-w-xl text-base text-white/90 sm:text-lg">{slide.apoio}</p>
            </div>
          </div>
        ))}

        {/* Setas */}
        <button
          type="button"
          onClick={anterior}
          aria-label="Imagem anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white transition hover:bg-black/55"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={proximo}
          aria-label="Próxima imagem"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white transition hover:bg-black/55"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Indicadores */}
        <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.frase}
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Ir para a imagem ${i + 1}`}
              aria-current={i === atual}
              className={`h-2.5 rounded-full transition-all ${i === atual ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Bloco do Figma abaixo do carrossel */}
      <div className="mx-auto max-w-3xl px-6 py-14 text-center">
        <h1 className="text-3xl font-bold text-vinho sm:text-4xl md:text-5xl">
          Cuidado e carinho para quem você ama
        </h1>

        <p className="mt-8 text-base text-neutral-800">
          Um ambiente familiar, seguro e acolhedor para quem você ama.
        </p>

        <a
          href="#contato"
          className="mt-10 inline-block rounded-xl bg-verde px-10 py-3 text-lg font-bold text-creme shadow-md transition hover:brightness-110"
        >
          Agende uma visita
        </a>
      </div>
    </section>
  );
}