const express = require('express');
const router = express.Router();

const livroController = require('../controllers//livroController');

//Rotas do livro
router.get('/', livroController.mostrarLivros);
router.post('/addLivro', livroController.addLivro);


module.exports = router;