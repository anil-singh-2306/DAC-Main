const controller = require('../controllers/permissionController');
const router = require('express').Router();

router.get('/permission/:id', controller.getPermissions);


module.exports = router