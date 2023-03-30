const controllers = require('../controllers/manifestController');
const router = require('express').Router();

router.get('/fillvalues', controllers.GetFillValues);
router.post('/manifest', controllers.CreateManifest);
router.post('/manifestdetail/:id', controllers.CreateManifestDetail);
router.delete('/manifest/:id', controllers.DeleteManifest);
router.get('/manifest', controllers.GetManifests);


module.exports = router