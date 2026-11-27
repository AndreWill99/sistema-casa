from flask import Blueprint, request, jsonify
from bson import ObjectId
from datetime import datetime
from pymongo.errors import ServerSelectionTimeoutError
from database import db

crm_bp = Blueprint('crm_bp', __name__, url_prefix='/api')

def format_id(doc):
    """Converte ObjectId para string de forma segura"""
    if not doc:
        return doc
    doc_copy = dict(doc)
    if "_id" in doc_copy:
        doc_copy["id"] = str(doc_copy.pop("_id"))
    return doc_copy

# ==========================================
# 1. ROTAS DE LEADS (FUNIL DE VENDAS)
# ==========================================
@crm_bp.route('/leads', methods=['GET'])
def listar_leads():
    try:
        cursor = db.leads.find().sort("criado_em", -1)
        leads = [format_id(doc) for doc in cursor]
        return jsonify({"sucesso": True, "dados": leads}), 200
    except ServerSelectionTimeoutError:
        return jsonify({"sucesso": True, "dados": [], "aviso": "Banco inacessível temporariamente."}), 200
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao listar leads: {str(erro)}"}), 500

@crm_bp.route('/leads', methods=['POST'])
def criar_lead():
    try:
        dados = request.get_json() or {}
        if not dados.get("interessado"):
            return jsonify({"sucesso": False, "mensagem": "Nome do interessado é obrigatório."}), 400

        novo_lead = {
            "interessado": dados.get("interessado", "").strip(),
            "paciente": dados.get("paciente", "A definir").strip(),
            "telefone": dados.get("telefone", "").strip(),
            "email": dados.get("email", "").strip(),
            "grau": dados.get("grau", "Grau 2"),
            "status": dados.get("status", "Novo Lead"),
            "valorEstimado": dados.get("valorEstimado", "R$ 4.000,00"),
            "observacao": dados.get("observacao", ""),
            "historico": dados.get("historico", []),
            "criado_em": datetime.utcnow().isoformat()
        }

        res = db.leads.insert_one(novo_lead)
        novo_lead["id"] = str(res.inserted_id)
        if "_id" in novo_lead:
            del novo_lead["_id"]

        return jsonify({"sucesso": True, "mensagem": "Lead criado com sucesso!", "dados": novo_lead}), 201
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao salvar lead: {str(erro)}"}), 500

# ==========================================
# 2. ROTAS DE EQUIPE / COLABORADORES
# ==========================================
@crm_bp.route('/equipe', methods=['GET'])
def listar_equipe():
    try:
        cursor = db.equipe.find().sort("nome", 1)
        colaboradores = [format_id(doc) for doc in cursor]
        return jsonify({"sucesso": True, "dados": colaboradores}), 200
    except ServerSelectionTimeoutError:
        return jsonify({"sucesso": True, "dados": [], "aviso": "Banco inacessível temporariamente."}), 200
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao listar equipe: {str(erro)}"}), 500

@crm_bp.route('/equipe', methods=['POST'])
def criar_colaborador():
    try:
        dados = request.get_json() or {}
        if not dados.get("nome"):
            return jsonify({"sucesso": False, "mensagem": "Nome do colaborador é obrigatório."}), 400

        novo_colab = {
            "nome": dados.get("nome", "").strip(),
            "cargo": dados.get("cargo", "Colaborador").strip(),
            "telefone": dados.get("telefone", ""),
            "status": dados.get("status", "Ativo"),
            "dataEntrada": dados.get("dataEntrada", datetime.utcnow().strftime("%d-%m-%Y")),
            "nascimento": dados.get("nascimento", ""),
            "cpf": dados.get("cpf", ""),
            "email": dados.get("email", ""),
            "turno": dados.get("turno", "Plantão Diurno"),
            "salario": dados.get("salario", "R$ 3.000,00"),
            "escala": dados.get("escala", "12x36"),
            "banco": dados.get("banco", "Banco do Brasil"),
            "tipoConta": dados.get("tipoConta", "Conta Corrente"),
            "historicoPagamentos": dados.get("historicoPagamentos", []),
            "registros": dados.get("registros", []),
            "criado_em": datetime.utcnow().isoformat()
        }

        res = db.equipe.insert_one(novo_colab)
        novo_colab["id"] = str(res.inserted_id)
        if "_id" in novo_colab:
            del novo_colab["_id"]

        return jsonify({"sucesso": True, "mensagem": "Colaborador cadastrado!", "dados": novo_colab}), 201
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao cadastrar colaborador: {str(erro)}"}), 500

# ==========================================
# 3. ROTAS DO FINANCEIRO (TRANSAÇÕES)
# ==========================================
@crm_bp.route('/financeiro', methods=['GET'])
def listar_financeiro():
    try:
        cursor = db.financeiro.find().sort("criado_em", -1)
        transacoes = [format_id(doc) for doc in cursor]
        return jsonify({"sucesso": True, "dados": transacoes}), 200
    except ServerSelectionTimeoutError:
        return jsonify({"sucesso": True, "dados": [], "aviso": "Banco inacessível temporariamente."}), 200
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao listar transações: {str(erro)}"}), 500

@crm_bp.route('/financeiro', methods=['POST'])
def criar_transacao():
    try:
        dados = request.get_json() or {}
        if not dados.get("descricao") or not dados.get("valor"):
            return jsonify({"sucesso": False, "mensagem": "Descrição e valor são obrigatórios."}), 400

        nova_transacao = {
            "categoria": dados.get("categoria", "Geral"),
            "descricao": dados.get("descricao", "").strip(),
            "data": dados.get("data", datetime.utcnow().strftime("%d-%m-%Y")),
            "valor": dados.get("valor", "R$ 0,00"),
            "valorRaw": float(dados.get("valorRaw", 0.0)),
            "tipo": dados.get("tipo", "Entrada"),
            "observacao": dados.get("observacao", ""),
            "criado_em": datetime.utcnow().isoformat()
        }

        res = db.financeiro.insert_one(nova_transacao)
        nova_transacao["id"] = str(res.inserted_id)
        if "_id" in nova_transacao:
            del nova_transacao["_id"]

        return jsonify({"sucesso": True, "mensagem": "Transação registrada!", "dados": nova_transacao}), 201
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao salvar transação: {str(erro)}"}), 500

# ==========================================
# 4. ROTAS DA AGENDA (EVENTOS E VISITAS)
# ==========================================
@crm_bp.route('/agenda', methods=['GET'])
def listar_agenda():
    try:
        cursor = db.agenda.find().sort("dia", 1)
        eventos = [format_id(doc) for doc in cursor]
        return jsonify({"sucesso": True, "dados": eventos}), 200
    except ServerSelectionTimeoutError:
        return jsonify({"sucesso": True, "dados": [], "aviso": "Banco inacessível temporariamente."}), 200
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao listar eventos: {str(erro)}"}), 500

@crm_bp.route('/agenda', methods=['POST'])
def criar_evento_agenda():
    try:
        dados = request.get_json() or {}
        if not dados.get("titulo"):
            return jsonify({"sucesso": False, "mensagem": "Título do evento é obrigatório."}), 400

        novo_evento = {
            "titulo": dados.get("titulo", "").strip(),
            "residente": dados.get("residente", "Todos os Residentes"),
            "categoria": dados.get("categoria", "Visita Familiar"),
            "dia": int(dados.get("dia", 1)),
            "mesIndex": int(dados.get("mesIndex", 0)),
            "ano": int(dados.get("ano", datetime.utcnow().year)),
            "horaInicio": dados.get("horaInicio", "14:00"),
            "horaFim": dados.get("horaFim", "15:00"),
            "responsavel": dados.get("responsavel", ""),
            "obs": dados.get("obs", ""),
            "criado_em": datetime.utcnow().isoformat()
        }

        res = db.agenda.insert_one(novo_evento)
        novo_evento["id"] = str(res.inserted_id)
        if "_id" in novo_evento:
            del novo_evento["_id"]

        return jsonify({"sucesso": True, "mensagem": "Evento agendado com sucesso!", "dados": novo_evento}), 201
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao agendar evento: {str(erro)}"}), 500

# ==========================================
# 5. RESUMO CONSOLIDADO PARA O DASHBOARD
# ==========================================
@crm_bp.route('/dashboard/resumo', methods=['GET'])
def resumo_dashboard():
    """
    Retorna contadores calculados dinamicamente com base nas coleções do banco de dados.
    """
    try:
        capacidade_total = 20
        total_residentes = db.residentes.count_documents({})
        total_leads = db.leads.count_documents({})
        taxa_ocupacao = round((total_residentes / capacidade_total) * 100) if capacidade_total > 0 else 0
        vagas = max(0, capacidade_total - total_residentes)

        # Cálculo dinâmico do saldo do mês
        receitas_total = 0.0
        despesas_total = 0.0
        transacoes_cursor = db.financeiro.find()
        for t in transacoes_cursor:
            v = t.get("valorRaw", 0.0)
            if not v:
                # Tenta converter string 'R$ 1.500,00' se valorRaw não estiver preenchido
                v_str = str(t.get("valor", "")).replace("R$", "").replace(".", "").replace(",", ".").strip()
                try:
                    v = float(v_str)
                except ValueError:
                    v = 0.0
            if t.get("tipo") == "Entrada":
                receitas_total += v
            else:
                despesas_total += v

        saldo_mes = receitas_total - despesas_total

        # Visitas de hoje
        hoje = datetime.utcnow()
        visitas_hoje = list(db.agenda.find({
            "dia": hoje.day,
            "mesIndex": hoje.month - 1,
            "ano": hoje.year
        }))
        visitas_formatadas = [format_id(v) for v in visitas_hoje]

        return jsonify({
            "sucesso": True,
            "dados": {
                "totalResidentes": total_residentes,
                "totalLeads": total_leads,
                "capacidadeTotal": capacidade_total,
                "taxaOcupacao": taxa_ocupacao,
                "vagasDisponiveis": vagas,
                "receitasMes": receitas_total,
                "despesasMes": despesas_total,
                "saldoMes": saldo_mes,
                "visitasHoje": visitas_formatadas
            }
        }), 200
    except ServerSelectionTimeoutError:
        return jsonify({
            "sucesso": True,
            "dados": {
                "totalResidentes": 0,
                "totalLeads": 0,
                "capacidadeTotal": 20,
                "taxaOcupacao": 0,
                "vagasDisponiveis": 20,
                "receitasMes": 0.0,
                "despesasMes": 0.0,
                "saldoMes": 0.0,
                "visitasHoje": []
            },
            "aviso": "Banco de dados em modo offline"
        }), 200
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao consolidar dashboard: {str(erro)}"}), 500
