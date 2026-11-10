const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// Número da casa, só dígitos, com 55 + DDD
export const WHATSAPP_NUMERO = "5527999149785";

export type GrauDependencia = "1" | "2" | "3" | "nao_sei";

export interface ContatoPayload {
  nome: string;
  telefone: string;
  grau_dependencia: GrauDependencia;
  origem?: "site" | "chatbot";
}

export const ROTULO_GRAU: Record<GrauDependencia, string> = {
  "1": "Grau 1",
  "2": "Grau 2",
  "3": "Grau 3",
  nao_sei: "Não sei informar",
};

/** Grava o contato no banco. AJUSTE o endpoint/campos conforme o seu CRM. */
export async function enviarContato(dados: ContatoPayload): Promise<void> {
  const resposta = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origem: "site", ...dados }),
  });

  if (!resposta.ok) {
    throw new Error(`Falha ao enviar contato (${resposta.status})`);
  }
}

/** Monta o link do WhatsApp com a mensagem já preenchida. */
export function linkWhatsApp(dados: ContatoPayload): string {
  const texto =
    `Olá! Gostaria de simular um orçamento.\n\n` +
    `*Nome:* ${dados.nome}\n` +
    `*Telefone:* ${dados.telefone}\n` +
    `*Grau de dependência:* ${ROTULO_GRAU[dados.grau_dependencia]}`;

  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

/**
 * Grava no banco e abre o WhatsApp.
 * O WhatsApp abre mesmo se o banco falhar; nesse caso retorna false.
 * `janela` deve ser aberta no clique (antes do await) para o navegador não bloquear.
 */
export async function enviarEAbrirWhatsApp(
  dados: ContatoPayload,
  janela: Window | null,
): Promise<boolean> {
  let salvou = true;
  try {
    await enviarContato(dados);
  } catch {
    salvou = false;
  }

  const url = linkWhatsApp(dados);
  if (janela) janela.location.href = url;
  else window.location.href = url;

  return salvou;
}