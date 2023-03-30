const controllers = require('../controllers/businessController');
const router = require('express').Router();

router.post('/business', controllers.createBusiness);
router.get('/business', controllers.getBusinesses);
router.get('/business/:id', controllers.getBusiness);
router.put('/business/:id', controllers.updateBusiness);
router.delete('/business/:id', controllers.deleteBusiness);

router.post('/branch', controllers.createBranch);
router.get('/branch', controllers.getBranches);
router.get('/branch/:id', controllers.getBranch);
router.put('/branch/:id', controllers.updateBranch);
router.delete('/branch/:id', controllers.deleteBranch);

router.post('/office', controllers.createOffice);
router.get('/office', controllers.getOffices);
router.get('/office/:id', controllers.getOffice);
router.put('/office/:id', controllers.updateOffice);
router.delete('/office/:id', controllers.deleteOffice);

module.exports = router