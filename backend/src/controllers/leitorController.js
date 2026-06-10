const { leitorSchema } = require('../schemas/leitorSchema');
const leitorModel = require('../models/leitorModel');

async function listarLeitores(req, res) {
    try {
        const leitores = await leitorModel.listarLeitores();
        return res.status(200).json(leitores);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao buscar leitores" })
    }
}

async function addLeitor(req, res) {
    try {
        // Validação
        const resultado = leitorSchema.safeParse(req.body);

        if (!resultado.success) {
            return res.status(400).json({ erro: resultado.error.errors.map(e => e.message) });
        }

        // Com os dados validados:
        const { nome, email, telefone } = resultado.data;

        //Salvar no banco:
        await leitorModel.cadastrarLeitor(nome, email, telefone);
        res.status(201).json({ mensagem: 'Leitor cadatrado com sucesso!' });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao cadastrar novo leitor.' });
    }
}

module.exports = { listarLeitores, addLeitor };