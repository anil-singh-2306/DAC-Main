const controller = require('../controllers/imageController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.put('/profile/:id', authMiddleware.isAllowed(['update']), controller.updateProfile);

module.exports = router