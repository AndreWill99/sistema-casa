import { useState } from "react";
import type { FormEvent } from "react";
import { enviarEAbrirWhatsApp } from "../services/api";
import type { GrauDependencia } from "../services/api";

const MAPA_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467.71778698270657!2d-40.44028482267473!3d-20.310931309856507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb83b002b57a24b%3A0xfbb5b146feeae428!2sCasa%20de%20Repouso%20Aconchego%20Santa%20B%C3%A1rbara!5e0!3m2!1spt-BR!2sbr!4v1793664511096!5m2!1spt-BR!2sbr";

type Status = "idle" | "enviando" | "sucesso" | "erro";



function mascararTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const campo =
  "w-full rounded-lg bg-white/70 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-vinho/40";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [grau, setGrau] = useState<GrauDependencia | "">("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!grau) return;

    // Abre a aba no clique, antes do await, senão o celular bloqueia o pop-up
    const janela = window.open("", "_blank");

    setStatus("enviando");
    const salvou = await enviarEAbrirWhatsApp(
      { nome: nome.trim(), telefone, grau_dependencia: grau, origem: "site" },
      janela,
    );

    setStatus(salvou ? "sucesso" : "erro");
    if (salvou) {
      setNome("");
      setTelefone("");
      setGrau("");
    }
  }

  return (
    <section id="contato" className="bg-creme">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-vinho">Simule um Orçamento</h2>
          <p className="mt-4 text-sm">
            Preencha os dados abaixo e receba uma estimativa do valor mensal.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          {/* Canais de contato */}
          <ul className="space-y-8 text-sm text-vinho md:pt-3">
            <li>
              <a
                href="https://wa.me/5527999149785"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:underline"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                  <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21z" strokeLinejoin="round" />
                  <path d="M9 9c0 3 3 6 6 6l1.3-1.3-2-1-1 .8c-.8-.4-1.9-1.5-2.3-2.3l.8-1-1-2L9 9z" />
                </svg>
                27 99914-9785
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/santabarbara.aconchego"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:underline"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" className="fill-current" />
                </svg>
                /santabarbara.aconchego
              </a>
            </li>
            <li className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Casa de Repouso Aconchego Santa Bárbara
            </li>
          </ul>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              required
              minLength={2}
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={campo}
            />

            <input
              type="tel"
              required
              inputMode="tel"
              placeholder="(00) 0000-0000"
              value={telefone}
              onChange={(e) => setTelefone(mascararTelefone(e.target.value))}
              pattern="\(\d{2}\) \d{4,5}-\d{4}"
              title="Informe DDD e telefone"
              className={campo}
            />

            <div>
              <label htmlFor="grau" className="mb-1 block text-xs text-neutral-600">
                Grau de dependência
              </label>
              <select
                id="grau"
                required
                value={grau}
                onChange={(e) => setGrau(e.target.value as GrauDependencia)}
                className={campo}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="1">Grau 1</option>
                <option value="2">Grau 2</option>
                <option value="3">Grau 3</option>
                <option value="nao_sei">Não sei informar</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === "enviando"}
              className="w-full rounded-xl bg-verde px-6 py-3 text-lg font-bold text-creme shadow-md transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "enviando" ? "Enviando..." : "Entre em contato"}
            </button>

            <p role="status" aria-live="polite" className="min-h-5 text-sm">
              {status === "sucesso" && (
                <span className="text-verde">
                  Recebemos seus dados! Entraremos em contato em breve.
                </span>
              )}
              {status === "erro" && (
                <span className="text-vinho">
                  Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.
                </span>
              )}
            </p>
          </form>
        </div>
      </div>

      {MAPA_EMBED_URL && (
        <iframe
          title="Localização da Casa de Repouso Aconchego Santa Bárbara"
          src={MAPA_EMBED_URL}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full border-0 md:h-96"
        />
      )}
    </section>
  );
}
