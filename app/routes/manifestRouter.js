const controllers = require('../controllers/manifestController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.get('/fillvalues', authMiddleware.isAllowed(['read']), controllers.GetFillValues);
router.post('/manifest', authMiddleware.isAllowed(['create']), controllers.CreateManifest);
router.post('/manifestdetail/:id', authMiddleware.isAllowed(['create']), controllers.CreateManifestDetail);
router.delete('/manifest/:id', authMiddleware.isAllowed(['delete']), controllers.DeleteManifest);
router.get('/manifest', authMiddleware.isAllowed(['read']), controllers.GetManifests);


module.exports = router