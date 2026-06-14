const livroModel = require('../models/livroModel');

async function mostrarLivros(req, res) {
    try {
        const livros = await livroModel.listarLivros();
        res.json(livros);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({ erro: 'Erro ao buscar livros' });
    }
}

async function addLivro(req, res) {
    try {
        const { titulo, autor, editora, ano_publicacao, id_categoria } = req.body
        await livroModel.cadastrarLivro(titulo, autor, editora, ano_publicacao, id_categoria);

        if (ano_publicacao <= 0) {
           return res.status(400).json({ erro: 'Selecione um ano válido maior que 0.' });
        }

        res.status(201).json({ mensagem: 'Livro cadastrado com sucesso!' })
    } catch (erro) {
        console.error(erro);

        res.status(500).json({ erro: 'Erro ao cadastrar o livro.' })
    }
}

async function buscarCategorias(req, res) {
    try {
        const categorias = await livroModel.listarCategorias();
        res.json(categorias);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({ erro: "Erro ao buscar categorias" })
    }
}

async function buscarLivros(req, res) { // Esse NÃO é o do dashboard, é pra mostrar o livro na opção de empréstimo
    try {
        const livros = await livroModel.buscarLivros();
        res.json(livros);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Não foi possivel buscar os livros' })
    }
}

module.exports = { mostrarLivros, addLivro, buscarCategorias, buscarLivros };