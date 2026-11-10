import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Importa a conexão com o banco de dados configurada anteriormente
from database import db

from routes_residentes import residentes_bp

# 1. Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # 2. Registra o Blueprint das rotas da API
    app.register_blueprint(residentes_bp)

    @app.route('/api/status', methods=['GET'])
    def status():
        try:
            db.command("ping")
            banco_status = "Conectado com sucesso ao MongoDB Atlas"
            status_banco_ok = True
        except Exception as erro:
            banco_status = f"Falha na conexão: {str(erro)}"
            status_banco_ok = False

        return jsonify({
            "sucesso": True,
            "servico": "API Casa de Repouso Bárbara",
            "versao": "1.0.0",
            "banco_de_dados": {
                "status": banco_status,
                "online": status_banco_ok
            }
        }), 200

    @app.route('/', methods=['GET'])
    def raiz():
        return jsonify({
            "mensagem": "API REST da Casa de Repouso Bárbara está em execução. Acesse /api/status para diagnósticos."
        }), 200

    return app

app = create_app()

if __name__ == '__main__':
    porta = int(os.getenv("PORT", 5000))
    print(f"🚀 Servidor backend iniciado em http://localhost:{porta}")
    app.run(host='0.0.0.0', port=porta, debug=True)