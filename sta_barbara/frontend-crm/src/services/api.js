// Obtém a URL da API definida no arquivo .env
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Função para verificar o status e a conexão com a API Flask
 */
export async function checarStatusAPI() {
    try {
        const resposta = await fetch(`${API_URL}/status`);
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.statusText}`);
        }
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao contactar a API:", erro);
        return { sucesso: false, mensagem: erro.message };
    }
}

/**
 * Função para buscar a lista de residentes cadastrados
 */
export async function listarResidentes() {
    try {
        const resposta = await fetch(`${API_URL}/residentes`);
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.statusText}`);
        }
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao buscar residentes:", erro);
        return { sucesso: false, dados: [] };
    }
}