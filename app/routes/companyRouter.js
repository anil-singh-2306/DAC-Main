const controllers = require('../controllers/companyController');
//const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/company', controllers.createCompany);
router.get('/company', controllers.getCompanies);
router.get('/company/:id', controllers.getCompany);
router.put('/company/:id', controllers.updateCompany);
router.delete('/company/:id', controllers.deleteCompany);


module.exports = router