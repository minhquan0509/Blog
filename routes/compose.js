const express = require('express');
const router = express.Router();

const composeController = require('../app/controllers/ComposeController');

router.post('/create', composeController.create);
router.get('/edit/:postID', composeController.render);
router.post('/edit/:postID', composeController.edit);
router.post('/delete/:postID', composeController.delete);
router.use('/', composeController.index);

module.exports = router;