'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/saved-controller');
const authService = require('../services/auth-service');

//methods get
router.get('/getById', authService.authorize, controller.getById);
//methods post
router.post('/create', authService.authorize, controller.create);
//methods delete
router.delete('/delete',  authService.authorize, controller.delete);

module.exports = router;
