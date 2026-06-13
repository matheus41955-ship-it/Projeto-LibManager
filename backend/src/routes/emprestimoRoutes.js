const express = require('express');
const router = express.Router();

const emprestimoController = require('../controllers/emprestimoController');
const autenticarUsuario = require('../middlewares/authMiddleware');

// Rotas de empréstimo
router.post('/emprestar', autenticarUsuario, emprestimoController.emprestar);
router.get('/leitor/:id_leitor', autenticarUsuario, emprestimoController.EmprestimosLeitor);
router.put('/devolver/:id_emprestimo', autenticarUsuario, emprestimoController.devolverLivro)

module.exports = router;