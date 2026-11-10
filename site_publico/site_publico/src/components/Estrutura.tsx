import fachada from "../assets/IMG_abertacasa.jpg";

export default function Estrutura() {
  return (
    <section id="estrutura">
      <img
        src={fachada}
        alt="Fachada da casa de repouso"
        className="h-56 w-full object-cover sm:h-80 md:h-[26rem]"
      />
    </section>
  );
}
