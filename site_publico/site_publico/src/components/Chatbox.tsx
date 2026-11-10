import { useEffect, useRef, useState } from "react";
import { enviarEAbrirWhatsApp, ROTULO_GRAU } from "../services/api";
import type { GrauDependencia } from "../services/api";

type Etapa = "nome" | "telefone" | "grau" | "duvida" | "fim";

interface Mensagem {
    de: "bot" | "user";
    texto: string;
}

function mascararTelefone(valor: string) {
    const d = valor.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const INICIO: Mensagem[] = [
    { de: "bot", texto: "Olá! 😊 Sou o assistente da casa. Vou te ajudar a simular um orçamento." },
    { de: "bot", texto: "Para começar, qual é o seu nome?" },
];

export default function Chatbot() {
    const [aberto, setAberto] = useState(false);
    const [etapa, setEtapa] = useState<Etapa>("nome");
    const [mensagens, setMensagens] = useState<Mensagem[]>(INICIO);
    const [entrada, setEntrada] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [dados, setDados] = useState({ nome: "", telefone: "" });
    const fimRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fimRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensagens, aberto]);

    const add = (...novas: Mensagem[]) => setMensagens((m) => [...m, ...novas]);

    async function finalizar(grau: GrauDependencia, duvida: string) {
        // Abre a aba no clique para não ser bloqueada
        const janela = window.open("", "_blank");
        setEnviando(true);

        const salvou = await enviarEAbrirWhatsApp(
            { nome: dados.nome, telefone: dados.telefone, grau_dependencia: grau, origem: "chatbot" },
            janela,
        );

        setEnviando(false);
        setEtapa("fim");
        add({
            de: "bot",
            texto: salvou
                ? "Pronto! Abrimos o WhatsApp para você concluir o contato. 💬"
                : "Abrimos o WhatsApp, mas não conseguimos registrar seus dados. Envie a mensagem por lá.",
        });
        void duvida;
    }

    const [grauEscolhido, setGrauEscolhido] = useState<GrauDependencia | null>(null);

    function enviarTexto(e: React.FormEvent) {
        e.preventDefault();
        const texto = entrada.trim();
        if (!texto && etapa !== "duvida") return;

        if (etapa === "nome") {
            if (texto.length < 2) return;
            setDados((d) => ({ ...d, nome: texto }));
            add(
                { de: "user", texto },
                { de: "bot", texto: `Prazer, ${texto.split(" ")[0]}! Qual é o seu telefone com DDD?` },
            );
            setEtapa("telefone");
        } else if (etapa === "telefone") {
            if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(texto)) {
                add({ de: "bot", texto: "Não consegui entender. Digite o DDD e o número, por favor." });
                return;
            }
            setDados((d) => ({ ...d, telefone: texto }));
            add(
                { de: "user", texto },
                { de: "bot", texto: "Qual o grau de dependência da pessoa que será cuidada?" },
            );
            setEtapa("grau");
        } else if (etapa === "duvida" && grauEscolhido) {
            add({ de: "user", texto: texto || "Sem dúvidas por enquanto" });
            void finalizar(grauEscolhido, texto);
        }
        setEntrada("");
    }

    function escolherGrau(grau: GrauDependencia) {
        setGrauEscolhido(grau);
        add(
            { de: "user", texto: ROTULO_GRAU[grau] },
            {
                de: "bot",
                texto: "Quer deixar alguma dúvida? Escreva abaixo ou deixe em branco e envie.",
            },
        );
        setEtapa("duvida");
    }

    function reiniciar() {
        setMensagens(INICIO);
        setEtapa("nome");
        setDados({ nome: "", telefone: "" });
        setGrauEscolhido(null);
        setEntrada("");
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
            {aberto && (
                <div
                    role="dialog"
                    aria-label="Assistente virtual"
                    className="flex h-[28rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-creme shadow-2xl ring-1 ring-black/10"
                >
                    <header className="flex items-center justify-between bg-vinho px-4 py-3 text-creme">
                        <span className="font-semibold">Fale com a gente</span>
                        <button
                            type="button"
                            onClick={() => setAberto(false)}
                            aria-label="Fechar chat"
                            className="text-2xl leading-none hover:opacity-80"
                        >
                            ×
                        </button>
                    </header>

                    <div className="flex-1 space-y-2 overflow-y-auto p-4" aria-live="polite">
                        {mensagens.map((m, i) => (
                            <div key={i} className={`flex ${m.de === "user" ? "justify-end" : "justify-start"}`}>
                                <p
                                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm ${m.de === "user" ? "bg-verde text-creme" : "bg-pessego text-neutral-800"
                                        }`}
                                >
                                    {m.texto}
                                </p>
                            </div>
                        ))}

                        {etapa === "grau" && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {(Object.keys(ROTULO_GRAU) as GrauDependencia[]).map((g) => (
                                    <button
                                        key={g}
                                        type="button"
                                        onClick={() => escolherGrau(g)}
                                        className="rounded-full border border-vinho px-3 py-1 text-sm text-vinho transition hover:bg-vinho hover:text-creme"
                                    >
                                        {ROTULO_GRAU[g]}
                                    </button>
                                ))}
                            </div>
                        )}

                        {etapa === "fim" && (
                            <button
                                type="button"
                                onClick={reiniciar}
                                className="text-sm text-vinho underline underline-offset-2"
                            >
                                Começar de novo
                            </button>
                        )}
                        <div ref={fimRef} />
                    </div>

                    {(etapa === "nome" || etapa === "telefone" || etapa === "duvida") && (
                        <form onSubmit={enviarTexto} className="flex gap-2 border-t border-black/10 p-3">
                            <input
                                value={entrada}
                                onChange={(e) =>
                                    setEntrada(etapa === "telefone" ? mascararTelefone(e.target.value) : e.target.value)
                                }
                                type={etapa === "telefone" ? "tel" : "text"}
                                inputMode={etapa === "telefone" ? "tel" : "text"}
                                placeholder={
                                    etapa === "nome"
                                        ? "Seu nome"
                                        : etapa === "telefone"
                                            ? "(00) 00000-0000"
                                            : "Sua dúvida (opcional)"
                                }
                                className="min-w-0 flex-1 rounded-lg bg-white/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-vinho/40"
                            />
                            <button
                                type="submit"
                                disabled={enviando}
                                className="rounded-lg bg-verde px-4 py-2 text-sm font-bold text-creme disabled:opacity-60"
                            >
                                {etapa === "duvida" ? "Enviar" : "OK"}
                            </button>
                        </form>
                    )}
                </div>
            )}

            <button
                type="button"
                onClick={() => setAberto((a) => !a)}
                aria-label={aberto ? "Fechar assistente" : "Abrir assistente"}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-verde text-creme shadow-lg transition hover:brightness-110"
            >
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-2">
                    <path
                        d="M4 5h16v11H9l-5 4V5z"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    );
}