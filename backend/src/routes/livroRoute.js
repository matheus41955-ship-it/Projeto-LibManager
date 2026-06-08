const express = require('express');
const router = express.Router();

const livroController = require('../controllers/livroController');
const autenticarUsuario = require('../middlewares/authMiddleware')

//Rotas do livro
router.get('/', autenticarUsuario, livroController.mostrarLivros);
router.post('/addLivro', autenticarUsuario, livroController.addLivro);


module.exports = router;