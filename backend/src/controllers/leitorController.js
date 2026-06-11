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

async function buscarLeitores(req, res) {
    try {
        const leitores = await leitorModel.opcaoLeitores();
        res.json(leitores);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao buscar leitores" });
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

async function tirarLeitor(req, res) {
    try {
        const { id } = req.params;

        //Verificação se o leitor tem livros atribuidos a ele. Se tiver, não realiza a exclusão
        const possuiEmprestimos = await leitorModel.possuiEmprestimos(id);
        if(possuiEmprestimos) {
            return res.status(400).json({ erro: 'O leitor possui livros emprestados. Certifique que não haja nenhum livro emprestado para que o leitor possa ser excluído' });
        }

        // Se não tiver, continua com a exclusão
        const resultado = await leitorModel.excluirLeitor(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Leitor não encontrado' });
        }

        res.status(200).json({ mensagem: "Leitor excluído com sucesso!" });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao excluir leitor' });
    }
}

module.exports = { listarLeitores, buscarLeitores, addLeitor, tirarLeitor };