import os
import certifi
from dotenv import load_dotenv
from pymongo import MongoClient

# 1. Carrega as variáveis de ambiente do ficheiro .env
load_dotenv()

# 2. Obtém a string de conexão e o nome do banco de dados
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "gestao_casa_repouso")

if not MONGO_URI:
    raise ValueError("ERRO: A variável MONGO_URI não foi definida!")

# 3. Inicializa o cliente MongoDB utilizando o pacote de certificados TLS do certifi
# Isso resolve o erro 'SSL: TLSV1_ALERT_INTERNAL_ERROR' em servidores Linux como o Render
client = MongoClient(
    MONGO_URI,
    tlsCAFile=certifi.where()
)

# 4. Exporta a instância do banco de dados
db = client[DB_NAME]