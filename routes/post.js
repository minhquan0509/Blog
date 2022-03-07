const express = require('express');
const router = express.Router();

const postController = require('../app/controllers/PostController');

// router.post('/create', postController.create);
router.get('/:postID', postController.find);

module.exports = router;