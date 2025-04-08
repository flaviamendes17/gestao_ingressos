const express = require('express');
const router = express.Router();
const ingressoController = require('../controllers/ingressoController');

// Rotas
router.get("/ingressos", ingressoController.buscarIngressos);
router.get('/ingressos/:id', ingressoController.getIngressos);
router.post('/ingressos', ingressoController.createIngresso);
router.put('/ingressos/:id', ingressoController.updateIngresso);
router.delete('/ingressos/:id', ingressoController.deleteIngresso);
router.post('/vendas', ingressoController.createVenda);

// Exportação do roteador
module.exports = router;