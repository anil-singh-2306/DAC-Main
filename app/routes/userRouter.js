const controllers = require('../controllers/userController');
const router = require('express').Router();

router.post('/role', controllers.createRole);
router.get('/role', controllers.getRoles);
router.get('/role/:id', controllers.getRole);
router.put('/role/:id', controllers.updateRole);
router.delete('/role/:id', controllers.deleteRole);

router.post('/user', controllers.createUser);
router.get('/user', controllers.getUsers);
router.get('/user/:id', controllers.getUser);
router.put('/user/:id', controllers.updateUser);
router.delete('/user/:id', controllers.deleteUser);

router.put('/status/:id', controllers.updateStatus);

module.exports = router