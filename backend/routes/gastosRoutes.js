const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gastoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/gastos', authMiddleware, gastoController.getGastos);
router.post('/gastos', authMiddleware, gastoController.createGasto);
router.put('/gastos/:id', authMiddleware, gastoController.updateGasto);
router.delete('/gastos/:id', authMiddleware, gastoController.deleteGasto);

module.exports = router;