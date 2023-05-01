const controllers = require('../controllers/businessController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/business', authMiddleware.isAllowed(['create']), controllers.createBusiness);
router.get('/business', authMiddleware.isAllowed(['read']), controllers.getBusinesses);
router.get('/business/:id', authMiddleware.isAllowed(['read']), controllers.getBusiness);
router.put('/business/:id', authMiddleware.isAllowed(['update']), controllers.updateBusiness);
router.delete('/business/:id', authMiddleware.isAllowed(['delete']), controllers.deleteBusiness);

router.post('/branch', authMiddleware.isAllowed(['create']), controllers.createBranch);
router.get('/branch', authMiddleware.isAllowed(['read']), controllers.getBranches);
router.get('/branch/:id', authMiddleware.isAllowed(['read']), controllers.getBranch);
router.put('/branch/:id', authMiddleware.isAllowed(['update']), controllers.updateBranch);
router.delete('/branch/:id', authMiddleware.isAllowed(['delete']), controllers.deleteBranch);

router.post('/office', authMiddleware.isAllowed(['create']), controllers.createOffice);
router.get('/office', authMiddleware.isAllowed(['read']), controllers.getOffices);
router.get('/office/:id', authMiddleware.isAllowed(['read']), controllers.getOffice);
router.put('/office/:id', authMiddleware.isAllowed(['update']), controllers.updateOffice);
router.delete('/office/:id', authMiddleware.isAllowed(['delete']), controllers.deleteOffice);

module.exports = router