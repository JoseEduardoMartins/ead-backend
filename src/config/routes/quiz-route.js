'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/quiz-controller');

router.get('/getById', controller.getById);
router.get('/getAllById', controller.getAllById);
router.get('/getIdByQuiz', controller.getIdByQuiz);
router.post('/crete', controller.create);
router.put('/update', controller.update);

module.exports = router;
