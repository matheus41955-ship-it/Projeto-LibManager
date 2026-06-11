const express = require('express');
const router = express.Router();

const emprestimoController = require('../controllers/emprestimoController');
const autenticarUsuario = require('../middlewares/authMiddleware');

// Rotas de empréstimo
router.post('/emprestar', autenticarUsuario, emprestimoController.emprestar);

module.exports = router;