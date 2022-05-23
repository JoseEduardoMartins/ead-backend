'use strict';

const express = require('express')
const router = express.Router()
const controller = require('../controllers/course-controller')
const authService = require('../services/auth-service');

//methods get
router.get('/getAll', authService.authorize, controller.getAll)
router.get('/getById', authService.authorize, controller.getById)
router.get('/getByUser', authService.authorize, controller.getByUser)
router.get('/getByUserId', authService.authorize, controller.getByUserId)
//methods post
router.post('/create', authService.authorize, controller.create)
router.post('/createAll', authService.authorize, controller.createAllCourse)
//methods put
router.put('/update', authService.authorize, controller.update)
router.put('/changeActive', authService.authorize, controller.changeActive)

module.exports = router;
