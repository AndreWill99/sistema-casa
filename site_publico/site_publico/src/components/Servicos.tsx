const graus = [
  {
    titulo: "Grau 1",
    texto:
      "Idosos independentes para atividades diárias (AVD), mas que podem necessitar de uso de equipamentos de autoajuda ou supervisão.",
    destaque: false,
  },
  {
    titulo: "Grau 2",
    texto:
      "Idosos que necessitam de auxílio para algumas atividades da vida diária, como banho, higiene ou locomoção, mas não apresentam alterações cognitivas graves.",
    destaque: true,
  },
  {
    titulo: "Grau 3",
    texto:
      "Precisa de assistência total para todas as atividades diárias, com cuidados de enfermagem 24 horas.",
    destaque: false,
  },
];

export default function Servicos() {
  return (
    <section id="servicos" className="bg-creme">
      <div className="mx-auto max-w-3xl px-6 pb-8 pt-12 text-center">
        <h2 className="text-3xl font-bold text-vinho">Nossos Serviços</h2>
        <p className="mt-6 text-left text-base sm:text-center">
          Entenda a diferença entre os Graus 1, 2 e 3 de dependência e identifique qual
          se aplica ao seu familiar.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-3">
        {graus.map((grau) => (
          <article
            key={grau.titulo}
            className={`px-8 py-8 ${
              grau.destaque ? "bg-pessego text-neutral-900" : "bg-vinho text-creme"
            }`}
          >
            <h3 className="text-xl font-semibold">{grau.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed">{grau.texto}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
