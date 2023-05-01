const controllers = require('../controllers/userController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/role', authMiddleware.isAllowed(['create'], 'role'), controllers.createRole);
router.get('/role', authMiddleware.isAllowed(['read'], 'role'), controllers.getRoles);
router.get('/role/:id', authMiddleware.isAllowed(['read'], 'role'), controllers.getRole);
router.put('/role/:id', authMiddleware.isAllowed(['update'], 'role'), controllers.updateRole);
router.delete('/role/:id', authMiddleware.isAllowed(['delete'], 'role'), controllers.deleteRole);

router.post('/user', authMiddleware.isAllowed(['create'], 'user'), controllers.createUser);
router.get('/user', authMiddleware.isAllowed(['read'], 'user'), controllers.getUsers);
router.get('/user/:id', authMiddleware.isAllowed(['read'], 'user'), controllers.getUser);
router.put('/user/:id', authMiddleware.isAllowed(['update'], 'user'), controllers.updateUser);
router.delete('/user/:id', authMiddleware.isAllowed(['delete'], 'user'), controllers.deleteUser);

router.put('/status/:id', authMiddleware.isAllowed(['update'], 'user'), controllers.updateStatus);

module.exports = router