const controllers = require('../controllers/businessController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/business', authMiddleware.isAllowed(['create'], 'business'), controllers.createBusiness);
router.get('/business', authMiddleware.isAllowed(['read'], 'business'), controllers.getBusinesses);
router.get('/business/:id', authMiddleware.isAllowed(['read'], 'business'), controllers.getBusiness);
router.put('/business/:id', authMiddleware.isAllowed(['update'], 'business'), controllers.updateBusiness);
router.delete('/business/:id', authMiddleware.isAllowed(['delete'], 'business'), controllers.deleteBusiness);

router.post('/branch', authMiddleware.isAllowed(['create'], 'branch'), controllers.createBranch);
router.get('/branch', authMiddleware.isAllowed(['read'], 'branch'), controllers.getBranches);
router.get('/branch/:id', authMiddleware.isAllowed(['read'], 'branch'), controllers.getBranch);
router.put('/branch/:id', authMiddleware.isAllowed(['update'], 'branch'), controllers.updateBranch);
router.delete('/branch/:id', authMiddleware.isAllowed(['delete'], 'branch'), controllers.deleteBranch);

router.post('/office', authMiddleware.isAllowed(['create'], 'office'), controllers.createOffice);
router.get('/office', authMiddleware.isAllowed(['read'], 'office'), controllers.getOffices);
router.get('/office/:id', authMiddleware.isAllowed(['read'], 'office'), controllers.getOffice);
router.put('/office/:id', authMiddleware.isAllowed(['update'], 'office'), controllers.updateOffice);
router.delete('/office/:id', authMiddleware.isAllowed(['delete'], 'office'), controllers.deleteOffice);

module.exports = router