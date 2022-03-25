const express = require('express');
const router = express.Router();
const middlewareController = require('../app/controllers/middlewareController');
const composeController = require('../app/controllers/ComposeController');

router.post('/create', middlewareController.verifyToken, composeController.create);
router.get('/edit/:postID', middlewareController.verifyUserPost,composeController.render);
router.put('/:postID', middlewareController.verifyUserPost,composeController.edit);
router.delete('/:postID', middlewareController.verifyToken ,middlewareController.verifyUserPost,composeController.delete);
router.use('/', middlewareController.verifyToken, composeController.index);

module.exports = router;