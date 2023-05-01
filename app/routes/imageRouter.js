const controller = require('../controllers/imageController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.put('/profile/:id', authMiddleware.isAllowed(['update'], 'user'), controller.updateProfile);

module.exports = router