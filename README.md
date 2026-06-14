# Projeto-LibManager - Sistema de gerenciamento de livros com cadastro, categorias e empréstimos

## Tecnologias usadas:

### Frontend
- React
- Axios
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express
- MySQL
- CORS
- dotenv
- JWT

---

## Como Rodar localmente:

Após clonar o projeto utilizando:
```bash
git clone https://github.com/matheus41955-ship-it/Projeto-LibManager.git
```
Importe o schema do banco de dados no MySQL, coloque os dados de teste e abra um terminal GitBash e digite o seguinte código:

### Criar um arquivo .env
Crie um arquivo .env na pasta raíz do backend com as seguintes informações:
 ```bash
PORT

BD_HOST
DB_USER
DB_PASSWORD
DB_PORT
DB_NAME

JWT_SECRET
```

### Ligar o Backend
 ```bash
cd backend/
npm install
node src/server.js
``` 
### Iniciar o Frontend
```bash
cd frontend/
npm install
npm run dev
```
