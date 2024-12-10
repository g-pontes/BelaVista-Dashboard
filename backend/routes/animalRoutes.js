const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/animal', authMiddleware, animalController.getAnimais);
router.post('/animal', authMiddleware, animalController.createAnimal);
router.put('/animal/:id', authMiddleware, animalController.updateAnimal);
router.delete('/animal/:id', authMiddleware, animalController.deleteAnimal);

module.exports = router;

