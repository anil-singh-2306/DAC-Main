const controllers = require('../controllers/awbController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/awbtype', authMiddleware.isAllowed(['create']), controllers.createAwbType);
router.get('/awbtype/:id', authMiddleware.isAllowed(['read']), controllers.getAwbType);
router.get('/awbtype', authMiddleware.isAllowed(['read']), controllers.getAwbType);
router.get('/awbtype/:id', authMiddleware.isAllowed(['read']), controllers.getAwbType);
router.put('/awbtype/:id', authMiddleware.isAllowed(['update']), controllers.createAwbType);
router.delete('/awbtype/:id', authMiddleware.isAllowed(['delete']), controllers.deleteAwbType);
router.get('/awbfill', authMiddleware.isAllowed(['read']), controllers.getAWBFillValues);

router.get('/awbsalesfillvalues', authMiddleware.isAllowed(['read']), controllers.awbSalesFillValues);
router.post('/awbsales', authMiddleware.isAllowed(['create']), controllers.createAwbSales);
router.get('/awbsales', authMiddleware.isAllowed(['read']), controllers.getAwbSales);
router.get('/awbsales/:id', authMiddleware.isAllowed(['read']), controllers.getAwbSales);
router.put('/awbsales/:id', authMiddleware.isAllowed(['update']), controllers.createAwbSales);
router.delete('/awbsales/:id', authMiddleware.isAllowed(['delete']), controllers.deleteAwbSales);

router.get('/awbpurchasefillvalues', authMiddleware.isAllowed(['read']), controllers.awbPurchaseFillValues);
router.post('/awbpurchase', authMiddleware.isAllowed(['create']), controllers.createAwbPurchase);
router.get('/awbpurchase', authMiddleware.isAllowed(['read']), controllers.getAwbPurchase);
router.get('/awbpurchase/:id', authMiddleware.isAllowed(['read']), controllers.getAwbPurchase);
router.put('/awbpurchase/:id', authMiddleware.isAllowed(['update']), controllers.createAwbPurchase);
router.delete('/awbpurchase/:id', authMiddleware.isAllowed(['delete']), controllers.deleteAwbPurchase);

router.get('/awbissuefillvalues', authMiddleware.isAllowed(['read']), controllers.awbIssueFillValues);
router.post('/awbissue', authMiddleware.isAllowed(['create']), controllers.createAwbIssue);
router.get('/awbissue', authMiddleware.isAllowed(['read']), controllers.getAwbIssue);
router.get('/awbissue/:id', authMiddleware.isAllowed(['read']), controllers.getAwbIssue);
router.put('/awbissue/:id', authMiddleware.isAllowed(['update']), controllers.createAwbIssue);
router.delete('/awbissue/:id', authMiddleware.isAllowed(['delete']), controllers.deleteAwbIssue);

module.exports = router