const controllers = require('../controllers/menuController');
const router = require('express').Router();

router.get('/menu', controllers.getMenus);


module.exports = router