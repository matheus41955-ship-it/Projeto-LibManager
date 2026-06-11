const express = require('express');
const router = express.Router();

const leitorController = require('../controllers/leitorController');
const autenticarUsuario = require('../middlewares/authMiddleware');

// Rotas do leitor
router.get('/', autenticarUsuario, leitorController.listarLeitores);
router.get('/opcoes', autenticarUsuario, leitorController.buscarLeitores);
router.post('/cadastrarLeitor', autenticarUsuario, leitorController.addLeitor);
router.delete('/excluirLeitor/:id', autenticarUsuario, leitorController.tirarLeitor);


module.exports = router;