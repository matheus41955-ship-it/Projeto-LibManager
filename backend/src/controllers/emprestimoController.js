const emprestimoModel = require('../models/emprestimoModel');

async function emprestar(req, res) {
    try {
        const { data_prevista, id_leitor, id_livro } = req.body;
        
        // Erros de leitura
        if (!id_leitor) {
            return res.status(400).json({ erro: 'Leitor não encontrado.' });
        }
        if (!id_livro) {
            return res.status(400).json({ erro: 'Livro não encontrado.' });
        }
        if (!data_prevista) {
            return res.status(400).json({ erro: 'Preencha todos os campos.' });
        }

        // Verificar se a data é no passado
        const dataHoje = new Date();
        dataHoje.setHours(0, 0, 0, 0)

        const dataInput = new Date(data_prevista);
        dataInput.setHours(0, 0, 0, 0);

        if (dataInput <= dataHoje) {
            return res.status(400).json({ erro: 'Data min para empréstimo é de 1 dia' });
        }

        // Verificação se o livro já está emprestado. Se já estiver não continua o código.
        const emprestado = await emprestimoModel.livroEstaEmprestado(id_livro);
        if (emprestado) {
            return res.status(400).json({ erro: 'Este livro já está emprestado, espere ficar disponível para fazer o empréstimo.' });
        }

        // Insert no banco
        const resultado = await emprestimoModel.addEmprestimo(data_prevista, id_leitor, id_livro);
        return res.status(201).json({ mensagem: 'Livro atribuído com sucesso!', id_emprestimo: resultado.insertId });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: 'Erro ao criar o empréstimo' });
    }
}

module.exports = { emprestar }