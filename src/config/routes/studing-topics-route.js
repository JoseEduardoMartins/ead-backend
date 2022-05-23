'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/studing-topics-controller');
const authService = require('../services/auth-service');

//request get
router.get('/getByStudyingId', authService.authorize, controller.getByStudyingId);

//request POST
router.post('/create', authService.authorize, controller.create);

//request PUT
router.put('/updateFinish', authService.authorize, controller.updateFinish);

module.exports = router;
