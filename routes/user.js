const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const middlewareController = require('../app/controllers/middlewareController');

router.get('/posts', middlewareController.verifyToken ,userController.getPosts );
router.get('/info', middlewareController.verifyToken, userController.getInfo);
router.put('/info', middlewareController.verifyToken, userController.updateInfo);

module.exports = router;
