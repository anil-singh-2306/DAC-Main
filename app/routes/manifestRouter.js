const controllers = require('../controllers/manifestController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.get('/fillvalues', controllers.GetFillValues);
router.post('/manifest', authMiddleware.isAllowed(['create'], 'manifest'), controllers.CreateManifest);
router.post('/manifestdetail/:id', authMiddleware.isAllowed(['create'], 'manifest'), controllers.CreateManifestDetail);
router.delete('/manifest/:id', authMiddleware.isAllowed(['delete'], 'manifest'), controllers.DeleteManifest);
router.get('/manifest', authMiddleware.isAllowed(['read'], 'manifest'), controllers.GetManifests);


module.exports = router