const controller = require('../controllers/awbSearchController');
//const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.get('/status/:id', controller.getAwbStatus);

module.exports = router