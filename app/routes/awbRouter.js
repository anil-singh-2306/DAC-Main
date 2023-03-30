const controllers = require('../controllers/awbController');
const router = require('express').Router();

router.post('/awbtype', controllers.createAwbType);
router.get('/awbtype/:id', controllers.getAwbType);
router.get('/awbtype', controllers.getAwbType);
router.get('/awbtype/:id', controllers.getAwbType);
router.put('/awbtype/:id', controllers.createAwbType);
router.delete('/awbtype/:id', controllers.deleteAwbType);
router.get('/awbfill', controllers.getAWBFillValues);

router.get('/awbsalesfillvalues', controllers.awbSalesFillValues);
router.post('/awbsales', controllers.createAwbSales);
router.get('/awbsales', controllers.getAwbSales);
router.get('/awbsales/:id', controllers.getAwbSales);
router.put('/awbsales/:id', controllers.createAwbSales);
router.delete('/awbsales/:id', controllers.deleteAwbSales);

router.get('/awbpurchasefillvalues', controllers.awbPurchaseFillValues);
router.post('/awbpurchase', controllers.createAwbPurchase);
router.get('/awbpurchase', controllers.getAwbPurchase);
router.get('/awbpurchase/:id', controllers.getAwbPurchase);
router.put('/awbpurchase/:id', controllers.createAwbPurchase);
router.delete('/awbpurchase/:id', controllers.deleteAwbPurchase);

router.get('/awbissuefillvalues', controllers.awbIssueFillValues);
router.post('/awbissue', controllers.createAwbIssue);
router.get('/awbissue', controllers.getAwbIssue);
router.get('/awbissue/:id', controllers.getAwbIssue);
router.put('/awbissue/:id', controllers.createAwbIssue);
router.delete('/awbissue/:id', controllers.deleteAwbIssue);

module.exports = router