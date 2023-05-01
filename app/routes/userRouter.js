const controllers = require('../controllers/userController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/role', authMiddleware.isAllowed(['create']), controllers.createRole);
router.get('/role', authMiddleware.isAllowed(['read']), controllers.getRoles);
router.get('/role/:id', authMiddleware.isAllowed(['read']), controllers.getRole);
router.put('/role/:id', authMiddleware.isAllowed(['update']), controllers.updateRole);
router.delete('/role/:id', authMiddleware.isAllowed(['delete']), controllers.deleteRole);

router.post('/user', authMiddleware.isAllowed(['create']), controllers.createUser);
router.get('/user', authMiddleware.isAllowed(['read']), controllers.getUsers);
router.get('/user/:id', authMiddleware.isAllowed(['read']), controllers.getUser);
router.put('/user/:id', authMiddleware.isAllowed(['update']), controllers.updateUser);
router.delete('/user/:id', authMiddleware.isAllowed(['delete']), controllers.deleteUser);

router.put('/status/:id', authMiddleware.isAllowed(['update']), controllers.updateStatus);

module.exports = router