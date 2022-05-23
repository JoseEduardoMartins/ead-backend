'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/question-controller');

router.get('/getById', controller.getById);
router.get('/getAllById', controller.getAllById);
router.post('/crete', controller.create);
router.put('/update', controller.update);

module.exports = router;
