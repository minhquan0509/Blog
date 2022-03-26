const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const middlewareController = require('../app/controllers/middlewareController');

router.get('/posts', middlewareController.verifyToken ,userController.getPosts );

module.exports = router;
