'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/studying-controller');
const authService = require('../services/auth-service');
//request GET
router.get('/getByUserIdCourseId', authService.authorize, controller.getByUserIdCourseId);
router.get('/getByUserId', authService.authorize, controller.getByUserId);
router.get('/getByCourseIdTypeUser', authService.authorize, controller.getByCourseIdTypeUser);
router.get('/getByUserChoices', authService.authorize, controller.getByUserChoices);
//request POST
router.post('/create', authService.authorize, controller.create);
//request DELETE
router.delete('/delete',  authService.authorize, controller.delete);
module.exports = router;
