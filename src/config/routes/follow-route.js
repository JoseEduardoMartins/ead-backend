'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/follow-controller');
const authService = require('../services/auth-service');

//methods get
router.get('/getFollower', authService.authorize, controller.getFollower);
router.get('/getFollowing', authService.authorize, controller.getFollowing);
router.get('/getFollowerFollowing', authService.authorize, controller.getFollowerFollowing);
router.get('/getAllFollowerFollowing', authService.authorize, controller.getAllFollowerFollowing);
router.get('/getUserFollower', authService.authorize, controller.getUserFollower);
router.get('/getUserFollowing', authService.authorize, controller.getUserFollowing);
//methods post
router.post('/create', authService.authorize, controller.create);
//methods delete
router.delete('/delete', authService.authorize, controller.delete);

module.exports = router;
