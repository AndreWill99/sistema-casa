import os
from dotenv import load_dotenv
from pymongo import MongoClient

# 1. Carrega as variáveis do arquivo .env para a memória do sistema
load_dotenv()

# 2. Obtém os valores das variáveis de ambiente
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "gestao_casa_repouso")

# 3. Validação preventiva: avisa se a URI não foi informada
if not MONGO_URI:
    raise ValueError("ERRO: A variável MONGO_URI não foi definida no arquivo .env!")

# 4. Inicializa o cliente do MongoDB
client = MongoClient(MONGO_URI)

# 5. Instancia e exporta o banco de dados para ser usado nas rotas
db = client[DB_NAME]