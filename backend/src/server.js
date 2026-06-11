const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const usuarioRoutes = require('./routes/usuarioRoute');
const livroRoutes = require('./routes/livroRoute');
const leitorRoutes = require('./routes/leitorRoutes');
const emprestimoRoutes = require('./routes/emprestimoRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/livros', livroRoutes);
app.use('/leitores', leitorRoutes);
app.use('/emprestimos', emprestimoRoutes)

// Porta do servidor
const porta = process.env.PORT
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});