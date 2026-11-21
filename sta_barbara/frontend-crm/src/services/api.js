// Obtém a URL da API definida no arquivo .env com fallback para porta padrão 5000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
 * Cadastra um novo colaborador no sistema (conectado ao MongoDB Atlas)
 * @param {Object} dados { nome, usuario, cargo, senha }
 */
export async function cadastrarUsuario(dados) {
    try {
        const resposta = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const json = await resposta.json();
        return json;
    } catch (erro) {
        console.error("Falha na requisição de cadastro:", erro);
        return { sucesso: false, mensagem: "Erro ao comunicar com o servidor da API. Verifique se o backend está em execução." };
    }
}

/**
 * Autentica o usuário no backend
 * @param {string} usuario 
 * @param {string} senha 
 */
export async function fazerLogin(usuario, senha) {
    try {
        const resposta = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, senha })
        });

        const json = await resposta.json();
        return json;
    } catch (erro) {
        console.error("Falha na requisição de login:", erro);
        return { sucesso: false, mensagem: "Erro ao comunicar com o servidor da API. Verifique se o backend está em execução." };
    }
}

/**
 * Lista todos os usuários cadastrados
 */
export async function listarUsuarios() {
    try {
        const resposta = await fetch(`${API_URL}/auth/usuarios`);
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.statusText}`);
        }
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao listar usuários:", erro);
        return { sucesso: false, dados: [] };
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
