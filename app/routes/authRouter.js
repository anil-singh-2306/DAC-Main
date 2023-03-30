const controller = require('../controllers/authController');
const router = require('express').Router();

router.post('/login', controller.login);
router.put('/changepassword/:id', controller.changePassword);

module.exports = router