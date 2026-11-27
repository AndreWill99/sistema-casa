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
 */
export async function cadastrarUsuario(dados) {
    try {
        const resposta = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        return await resposta.json();
    } catch (erro) {
        console.error("Falha na requisição de cadastro:", erro);
        return { sucesso: false, mensagem: "Erro ao comunicar com o servidor da API." };
    }
}

/**
 * Autentica o usuário no backend
 */
export async function fazerLogin(usuario, senha) {
    try {
        const resposta = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, senha })
        });
        return await resposta.json();
    } catch (erro) {
        console.error("Falha na requisição de login:", erro);
        return { sucesso: false, mensagem: "Erro ao comunicar com o servidor da API." };
    }
}

/**
 * Lista todos os usuários cadastrados
 */
export async function listarUsuarios() {
    try {
        const resposta = await fetch(`${API_URL}/auth/usuarios`);
        if (!resposta.ok) throw new Error(resposta.statusText);
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao listar usuários:", erro);
        return { sucesso: false, dados: [] };
    }
}

// ==========================================
// RESIDENTES
// ==========================================
export async function listarResidentes() {
    try {
        const resposta = await fetch(`${API_URL}/residentes`);
        if (!resposta.ok) throw new Error(resposta.statusText);
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao buscar residentes:", erro);
        return { sucesso: false, dados: [] };
    }
}

export async function criarResidente(dados) {
    try {
        const resposta = await fetch(`${API_URL}/residentes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao cadastrar residente:", erro);
        return { sucesso: false, mensagem: "Erro ao salvar residente na API." };
    }
}

// ==========================================
// LEADS
// ==========================================
export async function listarLeads() {
    try {
        const resposta = await fetch(`${API_URL}/leads`);
        if (!resposta.ok) throw new Error(resposta.statusText);
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao buscar leads:", erro);
        return { sucesso: false, dados: [] };
    }
}

export async function criarLead(dados) {
    try {
        const resposta = await fetch(`${API_URL}/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao cadastrar lead:", erro);
        return { sucesso: false, mensagem: "Erro ao salvar lead na API." };
    }
}

// ==========================================
// EQUIPE
// ==========================================
export async function listarEquipe() {
    try {
        const resposta = await fetch(`${API_URL}/equipe`);
        if (!resposta.ok) throw new Error(resposta.statusText);
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao buscar equipe:", erro);
        return { sucesso: false, dados: [] };
    }
}

export async function criarColaborador(dados) {
    try {
        const resposta = await fetch(`${API_URL}/equipe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao cadastrar colaborador:", erro);
        return { sucesso: false, mensagem: "Erro ao salvar colaborador na API." };
    }
}

// ==========================================
// FINANCEIRO
// ==========================================
export async function listarTransacoes() {
    try {
        const resposta = await fetch(`${API_URL}/financeiro`);
        if (!resposta.ok) throw new Error(resposta.statusText);
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao buscar financeiro:", erro);
        return { sucesso: false, dados: [] };
    }
}

export async function criarTransacao(dados) {
    try {
        const resposta = await fetch(`${API_URL}/financeiro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao salvar transação:", erro);
        return { sucesso: false, mensagem: "Erro ao salvar transação na API." };
    }
}

// ==========================================
// AGENDA
// ==========================================
export async function listarEventosAgenda() {
    try {
        const resposta = await fetch(`${API_URL}/agenda`);
        if (!resposta.ok) throw new Error(resposta.statusText);
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao buscar eventos da agenda:", erro);
        return { sucesso: false, dados: [] };
    }
}

export async function criarEventoAgenda(dados) {
    try {
        const resposta = await fetch(`${API_URL}/agenda`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao salvar evento na agenda:", erro);
        return { sucesso: false, mensagem: "Erro ao salvar evento na agenda." };
    }
}

// ==========================================
// RESUMO DO DASHBOARD
// ==========================================
export async function buscarResumoDashboard() {
    try {
        const resposta = await fetch(`${API_URL}/dashboard/resumo`);
        if (!resposta.ok) throw new Error(resposta.statusText);
        return await resposta.json();
    } catch (erro) {
        console.error("Falha ao buscar resumo do dashboard:", erro);
        return {
            sucesso: false,
            dados: {
                totalResidentes: 0,
                totalLeads: 0,
                capacidadeTotal: 20,
                taxaOcupacao: 0,
                vagasDisponiveis: 20,
                receitasMes: 0,
                despesasMes: 0,
                saldoMes: 0,
                visitasHoje: []
            }
        };
    }
}
