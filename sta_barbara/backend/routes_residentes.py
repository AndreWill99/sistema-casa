from flask import Blueprint, request, jsonify
from bson import ObjectId
from database import db

# Criação do Blueprint com prefixo de API
residentes_bp = Blueprint('residentes_bp', __name__, url_prefix='/api')

# ==========================================
# 1. ROTAS DE RESIDENTES
# ==========================================

@residentes_bp.route('/residentes', methods=['GET'])
def listar_residentes():
    """
    Retorna a lista completa de residentes cadastrados.
    Converte o campo '_id' do MongoDB para string para ser serializado em JSON.
    """
    try:
        residentes_cursor = db.residentes.find().sort("nome", 1)
        
        lista = []
        for r in residentes_cursor:
            lista.append({
                "id": str(r["_id"]),
                "nome": r.get("nome", ""),
                "grau": r.get("grau", 1),
                "idade": r.get("idade", 0),
                "quarto": r.get("quarto", ""),
                "responsavel": r.get("responsavel", ""),
                "telefone": r.get("telefone", ""),
                "alergias": r.get("alergias", ""),
                "data_entrada": r.get("data_entrada", "")
            })
            
        return jsonify({"sucesso": True, "dados": lista}), 200
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao buscar: {str(erro)}"}), 500


@residentes_bp.route('/residentes', methods=['POST'])
def criar_residente():
    """
    Recebe um payload JSON do frontend e insere um novo residente na coleção.
    """
    try:
        dados = request.get_json()

        # Validação básica de campo obrigatório
        if not dados or not dados.get("nome"):
            return jsonify({"sucesso": False, "mensagem": "O campo 'nome' é obrigatório."}), 400

        novo_residente = {
            "nome": dados.get("nome"),
            "grau": int(dados.get("grau", 1)),
            "idade": int(dados.get("idade", 0)),
            "quarto": dados.get("quarto", ""),
            "responsavel": dados.get("responsavel", ""),
            "telefone": dados.get("telefone", ""),
            "alergias": dados.get("alergias", ""),
            "data_entrada": dados.get("data_entrada", "")
        }

        resultado = db.residentes.insert_one(novo_residente)

        return jsonify({
            "sucesso": True,
            "id": str(resultado.inserted_id),
            "mensagem": "Residente cadastrado com sucesso!"
        }), 201
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao cadastrar: {str(erro)}"}), 500


# ==========================================
# 2. ROTAS DE INCIDENTES
# ==========================================

@residentes_bp.route('/residentes/<id_residente>/incidentes', methods=['GET'])
def listar_incidentes_por_residente(id_residente):
    """
    Retorna todos os incidentes associados a um residente específico.
    """
    try:
        incidentes_cursor = db.incidentes.find({"residente_id": ObjectId(id_residente)}).sort("data", -1)
        
        lista = []
        for inc in incidentes_cursor:
            lista.append({
                "id": str(inc["_id"]),
                "descricao": inc.get("descricao", ""),
                "nivel": inc.get("nivel", "Atenção"),
                "data": inc.get("data", "")
            })

        return jsonify({"sucesso": True, "dados": lista}), 200
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao listar incidentes: {str(erro)}"}), 500


@residentes_bp.route('/incidentes', methods=['POST'])
def cadastrar_incidente():
    """
    Cadastra um novo incidente associado a um residente.
    """
    try:
        dados = request.get_json()

        if not dados or not dados.get("residente_id") or not dados.get("descricao"):
            return jsonify({"sucesso": False, "mensagem": "Residente e descrição são obrigatórios."}), 400

        novo_incidente = {
            "residente_id": ObjectId(dados.get("residente_id")),
            "descricao": dados.get("descricao"),
            "nivel": dados.get("nivel", "Atenção"),  # "Crítico" ou "Atenção"
            "data": dados.get("data", "")
        }

        resultado = db.incidentes.insert_one(novo_incidente)

        return jsonify({
            "sucesso": True,
            "id": str(resultado.inserted_id),
            "mensagem": "Incidente registrado com sucesso!"
        }), 201
    except Exception as erro:
        return jsonify({"sucesso": False, "mensagem": f"Erro ao salvar incidente: {str(erro)}"}), 500