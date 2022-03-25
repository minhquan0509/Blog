const express = require('express');
const router = express.Router();
const middlewareController = require('../app/controllers/middlewareController');
const siteController = require('../app/controllers/SiteController');

router.use('/about', siteController.about);
router.use('/contact', siteController.contact);
router.use('/' ,siteController.home);

module.exports = router;