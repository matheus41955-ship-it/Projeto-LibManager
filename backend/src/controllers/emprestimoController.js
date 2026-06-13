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


async function EmprestimosLeitor(req, res) {
    try {
        const { id_leitor } = req.params;

        if (!id_leitor) {
            return res.status(400).json({ erro: 'ID do leitor é obrigatório.' });
        }

        const resultado = await emprestimoModel.buscarEmprestimos(id_leitor);
        return res.json(resultado);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: 'Erro ao buscar livros emprestados' });
    }
}

async function devolverLivro(req, res) {
    try {
        const { id_emprestimo } = req.params;
        await emprestimoModel.devolverLivro(id_emprestimo);

        return res.status(201).json({ mensagem: "Livro devolvido com sucesso!" });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: 'Erro ao devolver livro.' })
    }
}

module.exports = { emprestar, EmprestimosLeitor, devolverLivro }