const controllers = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/company', authMiddleware.isAllowed(['create']), controllers.createCompany);
router.get('/company', authMiddleware.isAllowed(['read']), controllers.getCompanies);
router.get('/company/:id', authMiddleware.isAllowed(['read']), controllers.getCompany);
router.put('/company/:id', authMiddleware.isAllowed(['update']), controllers.updateCompany);
router.delete('/company/:id', authMiddleware.isAllowed(['delete']), controllers.deleteCompany);


module.exports = router