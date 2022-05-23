'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/technology-controller');
const authService = require('../services/auth-service');
//methods get
router.get('/get', authService.authorize, controller.get);
//methods post
router.post('/create', authService.authorize, controller.create);
module.exports = router;
