const controller = require('../controllers/imageController');
const router = require('express').Router();

router.put('/profile/:id', controller.updateProfile);

module.exports = router