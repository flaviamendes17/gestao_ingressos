const express = require('express');
const router = express.Router();
const { exportIngressoToPDF } = require('../controllers/reportController');

router.get('/report/pdf', exportIngressoToPDF);

module.exports = router;