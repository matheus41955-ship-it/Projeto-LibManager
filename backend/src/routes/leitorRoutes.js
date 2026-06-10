const express = require('express');
const router = express.Router();

const leitorController = require('../controllers/leitorController');
const autenticarUsuario = require('../middlewares/authMiddleware');

// Rotas do leitor
router.get('/', autenticarUsuario, leitorController.listarLeitores);
router.post('/cadastrarLeitor', autenticarUsuario, leitorController.addLeitor);


module.exports = router;