import os
import certifi
from dotenv import load_dotenv
from pymongo import MongoClient

# 1. Carrega as variáveis de ambiente com caminho explícito para o .env do backend
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

# 2. Obtém os valores das variáveis de ambiente e higieniza strings
MONGO_URI = os.getenv("MONGO_URI", "")
DB_NAME = os.getenv("DB_NAME", "Cluster0")

clean_uri = MONGO_URI.strip().strip('"').strip("'") if MONGO_URI else ""

# 3. Validação preventiva: avisa se a URI não foi informada
if not clean_uri:
    raise ValueError("ERRO: A variável MONGO_URI não foi definida no arquivo .env!")

# 4. Inicializa o cliente do MongoDB com suporte a certificados SSL do certifi
# e timeout definido para evitar travamento em caso de restrição de IP no Atlas
client = MongoClient(
    clean_uri,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=4000
)

# 5. Instancia e exporta o banco de dados para ser usado nas rotas
db = client[DB_NAME]
