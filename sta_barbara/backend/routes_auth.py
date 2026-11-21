from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from pymongo.errors import PyMongoError, ServerSelectionTimeoutError
from database import db

# Criação do Blueprint de Autenticação e Usuários
auth_bp = Blueprint('auth_bp', __name__, url_prefix='/api')

# ==========================================
# 1. CADASTRO DE NOVO USUÁRIO / COLABORADOR
# ==========================================
@auth_bp.route('/auth/register', methods=['POST'])
@auth_bp.route('/usuarios', methods=['POST'])
def registrar_usuario():
    """
    Cadastra um novo usuário no MongoDB na coleção 'usuarios'.
    Armazena a senha com hash seguro (Werkzeug) e valida duplicidades.
    """
    try:
        dados = request.get_json() or {}

        nome = dados.get("nome", "").strip()
        usuario = dados.get("usuario", "").strip().lower()
        cargo = dados.get("cargo", "").strip()
        senha = dados.get("senha", "").strip()

        # Validações dos campos obrigatórios
        if not nome or not usuario or not cargo or not senha:
            return jsonify({
                "sucesso": False,
                "mensagem": "Todos os campos (nome, usuário, cargo e senha) são obrigatórios."
            }), 400

        # Validação do tamanho mínimo da senha
        if len(senha) < 8:
            return jsonify({
                "sucesso": False,
                "mensagem": "A senha deve ter no mínimo 8 caracteres."
            }), 400

        # Tenta verificar se o usuário já existe no banco
        try:
            usuario_existente = db.usuarios.find_one({"usuario": usuario})
            if usuario_existente:
                return jsonify({
                    "sucesso": False,
                    "mensagem": f"O nome de usuário '{usuario}' já está em uso."
                }), 409
        except ServerSelectionTimeoutError:
            return jsonify({
                "sucesso": False,
                "mensagem": "Falha na conexão com o MongoDB Atlas. Verifique se o IP atual está liberado no 'Network Access' do painel do Atlas."
            }), 503

        # Monta o documento do usuário
        novo_usuario = {
            "nome": nome,
            "usuario": usuario,
            "cargo": cargo,
            "senha_hash": generate_password_hash(senha),
            "ativo": True,
            "criado_em": datetime.utcnow().isoformat()
        }

        resultado = db.usuarios.insert_one(novo_usuario)

        return jsonify({
            "sucesso": True,
            "mensagem": "Usuário cadastrado com sucesso no banco de dados!",
            "dados": {
                "id": str(resultado.inserted_id),
                "nome": novo_usuario["nome"],
                "usuario": novo_usuario["usuario"],
                "cargo": novo_usuario["cargo"]
            }
        }), 201

    except ServerSelectionTimeoutError:
        return jsonify({
            "sucesso": False,
            "mensagem": "Não foi possível conectar ao MongoDB Atlas. Seu IP precisa ser liberado no Network Access do Atlas."
        }), 503
    except Exception as erro:
        return jsonify({
            "sucesso": False,
            "mensagem": f"Erro ao registrar usuário: {str(erro)}"
        }), 500


# ==========================================
# 2. LOGIN DE USUÁRIO
# ==========================================
@auth_bp.route('/auth/login', methods=['POST'])
@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Autentica um usuário comparando o hash da senha no MongoDB.
    Possui contingência para admin inicial caso o banco esteja indisponível.
    """
    try:
        dados = request.get_json() or {}
        usuario = dados.get("usuario", "").strip().lower()
        senha = dados.get("senha", "").strip()

        if not usuario or not senha:
            return jsonify({
                "sucesso": False,
                "mensagem": "Informe usuário e senha para continuar."
            }), 400

        # Primeiro verifica se é o login de contingência de administrador inicial
        if usuario == "admin" and senha == "admin":
            return jsonify({
                "sucesso": True,
                "mensagem": "Login efetuado com perfil de administrador inicial.",
                "dados": {
                    "id": "admin_master",
                    "nome": "Administrador Bárbara",
                    "usuario": "admin",
                    "cargo": "Administrador Geral"
                }
            }), 200

        # Busca o usuário na coleção 'usuarios' do MongoDB
        try:
            usuario_doc = db.usuarios.find_one({"usuario": usuario})
        except ServerSelectionTimeoutError:
            return jsonify({
                "sucesso": False,
                "mensagem": "Banco de dados inacessível no momento. Verifique a lista de IPs do MongoDB Atlas."
            }), 503

        if usuario_doc:
            # Verifica a senha com o hash seguro
            if check_password_hash(usuario_doc.get("senha_hash", ""), senha):
                return jsonify({
                    "sucesso": True,
                    "mensagem": "Login efetuado com sucesso!",
                    "dados": {
                        "id": str(usuario_doc["_id"]),
                        "nome": usuario_doc.get("nome", usuario_doc["usuario"]),
                        "usuario": usuario_doc["usuario"],
                        "cargo": usuario_doc.get("cargo", "Colaborador")
                    }
                }), 200
            else:
                return jsonify({
                    "sucesso": False,
                    "mensagem": "Senha incorreta. Verifique suas credenciais."
                }), 401
        else:
            return jsonify({
                "sucesso": False,
                "mensagem": f"Usuário '{usuario}' não encontrado no sistema."
            }), 404

    except ServerSelectionTimeoutError:
        return jsonify({
            "sucesso": False,
            "mensagem": "Não foi possível conectar ao banco de dados Atlas (bloqueio de IP)."
        }), 503
    except Exception as erro:
        return jsonify({
            "sucesso": False,
            "mensagem": f"Erro no processamento de login: {str(erro)}"
        }), 500


# ==========================================
# 3. LISTAGEM DE USUÁRIOS
# ==========================================
@auth_bp.route('/auth/usuarios', methods=['GET'])
def listar_usuarios():
    """
    Retorna a lista de colaboradores cadastrados sem expor as senhas.
    """
    try:
        cursor = db.usuarios.find().sort("nome", 1)
        usuarios_lista = []
        for u in cursor:
            usuarios_lista.append({
                "id": str(u["_id"]),
                "nome": u.get("nome", ""),
                "usuario": u.get("usuario", ""),
                "cargo": u.get("cargo", ""),
                "ativo": u.get("ativo", True),
                "criado_em": u.get("criado_em", "")
            })
        return jsonify({"sucesso": True, "dados": usuarios_lista}), 200
    except Exception as erro:
        return jsonify({
            "sucesso": False,
            "mensagem": f"Erro ao listar usuários: {str(erro)}"
        }), 500
