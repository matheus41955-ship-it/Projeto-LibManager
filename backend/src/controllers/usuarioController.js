const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

async function cadastrar(req, res) {
    try {
        const { nome, email, senha } = req.body;

        const senhaHash = await bcrypt.hash(senha, 10);

        await usuarioModel.criarUsuario(
            nome,
            email,
            senhaHash
        );
        
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({ erro: 'Erro ao cadastrar o usuário' });
    }
}

async function login(req, res) {
    try {
        const { email, senha } = req.body;
    
        const usuario = await usuarioModel.buscarPorEmail(email);
        

        if(!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
            return res.status(401).json({ erro: 'Email ou senha inválidos!' });
        }
    
        res.json({ mensagem: 'Login realizado com sucesso!' })
    } catch (erro) {
        console.error(erro);

        res.status(500).json({ erro: 'Erro interno no servidor, tente novamente mais tarde!' })
    }
}

module.exports = { cadastrar, login }