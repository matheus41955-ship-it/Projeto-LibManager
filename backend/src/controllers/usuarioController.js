const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

const { loginSchema } = require('../schemas/loginSchema')
const jwt = require("jsonwebtoken");
require('dotenv').config()

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

        //Validação Zod
        const resultado = loginSchema.safeParse(req.body);

        if(!resultado.success) {
            return res.status(400).json({ erro: resultado.error.errors[0].message })
        }

        // Dados já validados
        const { email, senha } = resultado.data;
    
        const usuario = await usuarioModel.buscarPorEmail(email);
        
        if (!usuario) {
            return res.status(401).json({ erro: "Email ou senha inválidos" })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaValida) {
            return res.status(401).json({ erro: "Email ou senha inválidos" })
        }
        

        //Gerar token
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email
            }, process.env.JWT_SECRET, { expiresIn: "1h" }
        );
    
        return res.json({ mensagem: 'Login realizado com sucesso!', token });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({ erro: 'Erro interno no servidor, tente novamente mais tarde!' })
    }
}

module.exports = { cadastrar, login }