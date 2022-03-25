const express = require('express');
const router = express.Router();
const middlewareController = require('../app/controllers/middlewareController');
const composeController = require('../app/controllers/ComposeController');

router.post('/create', middlewareController.verifyToken, composeController.create);
router.get('/edit/:postID', middlewareController.verifyUserPost,composeController.render);
router.post('/edit/:postID', middlewareController.verifyUserPost,composeController.edit);
router.post('/delete/:postID', middlewareController.verifyUserPost,composeController.delete);
router.use('/', middlewareController.verifyToken, composeController.index);

module.exports = router;