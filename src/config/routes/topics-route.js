'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/topics-controller');
//AWS
const aws = require('../services/aws-service');
//request GET
router.get('/get', controller.getByCourse);
router.get('/getById', controller.getById);
router.get('/getIdByCourse', controller.getIdByCourse);
//request POST
router.post('/crete', aws.uploadFiles.fields([{name: 'video', maxCount: 1}, {name: 'pdf', maxCount: 1}]), controller.create);
//request PUT
router.put('/update', aws.uploadFiles.fields([{name: 'video', maxCount: 1}, {name: 'pdf', maxCount: 1}]), controller.update);

module.exports = router;
