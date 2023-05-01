const controllers = require('../controllers/awbController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/awbtype', authMiddleware.isAllowed(['create'], 'AWB Type'), controllers.createAwbType);
router.get('/awbtype/:id', authMiddleware.isAllowed(['read'], 'AWB Type'), controllers.getAwbType);
router.get('/awbtype', authMiddleware.isAllowed(['read'], 'AWB Type'), controllers.getAwbType);
router.get('/awbtype/:id', authMiddleware.isAllowed(['read'], 'AWB Type'), controllers.getAwbType);
router.put('/awbtype/:id', authMiddleware.isAllowed(['update'], 'AWB Type'), controllers.createAwbType);
router.delete('/awbtype/:id', authMiddleware.isAllowed(['delete'], 'AWB Type'), controllers.deleteAwbType);
router.get('/awbfill', controllers.getAWBFillValues);

router.get('/awbsalesfillvalues', controllers.awbSalesFillValues);
router.post('/awbsales', authMiddleware.isAllowed(['create'], 'AWB Sale Rate'), controllers.createAwbSales);
router.get('/awbsales', authMiddleware.isAllowed(['read'], 'AWB Sale Rate'), controllers.getAwbSales);
router.get('/awbsales/:id', authMiddleware.isAllowed(['read'], 'AWB Sale Rate'), controllers.getAwbSales);
router.put('/awbsales/:id', authMiddleware.isAllowed(['update'], 'AWB Sale Rate'), controllers.createAwbSales);
router.delete('/awbsales/:id', authMiddleware.isAllowed(['delete'], 'AWB Sale Rate'), controllers.deleteAwbSales);

router.get('/awbpurchasefillvalues', controllers.awbPurchaseFillValues);
router.post('/awbpurchase', authMiddleware.isAllowed(['create'], 'AWB Purchase'), controllers.createAwbPurchase);
router.get('/awbpurchase', authMiddleware.isAllowed(['read'], 'AWB Purchase'), controllers.getAwbPurchase);
router.get('/awbpurchase/:id', authMiddleware.isAllowed(['read'], 'AWB Purchase'), controllers.getAwbPurchase);
router.put('/awbpurchase/:id', authMiddleware.isAllowed(['update'], 'AWB Purchase'), controllers.createAwbPurchase);
router.delete('/awbpurchase/:id', authMiddleware.isAllowed(['delete'], 'AWB Purchase'), controllers.deleteAwbPurchase);

router.get('/awbissuefillvalues', controllers.awbIssueFillValues);
router.post('/awbissue', authMiddleware.isAllowed(['create'], 'AWB Issue'), controllers.createAwbIssue);
router.get('/awbissue', authMiddleware.isAllowed(['read'], 'AWB Issue'), controllers.getAwbIssue);
router.get('/awbissue/:id', authMiddleware.isAllowed(['read'], 'AWB Issue'), controllers.getAwbIssue);
router.put('/awbissue/:id', authMiddleware.isAllowed(['update'], 'AWB Issue'), controllers.createAwbIssue);
router.delete('/awbissue/:id', authMiddleware.isAllowed(['delete'], 'AWB Issue'), controllers.deleteAwbIssue);

module.exports = router