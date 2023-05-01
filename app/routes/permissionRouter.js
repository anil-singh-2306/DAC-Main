const controller = require('../controllers/permissionController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.get('/permission/:id', authMiddleware.isAllowed(['read']), controller.getPermissions);


module.exports = router