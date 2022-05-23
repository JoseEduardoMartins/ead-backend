'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/choice-controller');
const authService = require('../services/auth-service');

router.get('/getById', authService.authorize, controller.getById);
router.get('/getAllById', authService.authorize, controller.getAllById);
router.post('/crete', authService.authorize, controller.create);
router.put('/update', authService.authorize, controller.update);
router.delete('/delete', authService.authorize, controller.delete);

module.exports = router;
