'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-quiz-controller');
const authService = require('../services/auth-service');

//request GET
router.get('/getByStudyingQuizId', authService.authorize, controller.getByStudyingQuizId);
router.get('/getByDateQuizStudyingId', authService.authorize, controller.getByDateQuizStudyingId);

//request POST
router.post('/create', authService.authorize, controller.create);

module.exports = router;
