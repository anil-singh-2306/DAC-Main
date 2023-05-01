const controllers = require('../controllers/placeController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/country', authMiddleware.isAllowed(['create']), controllers.createCountry);
router.get('/country', authMiddleware.isAllowed(['read']), controllers.getCountries);
router.get('/country/:id', authMiddleware.isAllowed(['read']), controllers.getCountry);
router.put('/country/:id', authMiddleware.isAllowed(['update']), controllers.updateCountry);
router.delete('/country/:id', authMiddleware.isAllowed(['delete']), controllers.deleteCountry);

router.post('/zone', authMiddleware.isAllowed(['create']), controllers.createZone);
router.get('/zone', authMiddleware.isAllowed(['read']), controllers.getZones);
router.get('/zone/:id', authMiddleware.isAllowed(['read']), controllers.getZone);
router.put('/zone/:id', authMiddleware.isAllowed(['update']), controllers.updateZone);
router.delete('/zone/:id', authMiddleware.isAllowed(['delete']), controllers.deleteZone);

router.post('/region', authMiddleware.isAllowed(['create']), controllers.createRegion);
router.get('/region', authMiddleware.isAllowed(['read']), controllers.getRegions);
router.get('/region/:id', authMiddleware.isAllowed(['read']), controllers.getRegion);
router.put('/region/:id', authMiddleware.isAllowed(['update']), controllers.updateRegion);
router.delete('/region/:id', authMiddleware.isAllowed(['delete']), controllers.deleteRegion);

router.post('/state', authMiddleware.isAllowed(['create']), controllers.createState);
router.get('/state', authMiddleware.isAllowed(['read']), controllers.getStates);
router.get('/state/:id', authMiddleware.isAllowed(['read']), controllers.getState);
router.put('/state/:id', authMiddleware.isAllowed(['update']), controllers.updateState);
router.delete('/state/:id', authMiddleware.isAllowed(['delete']), controllers.deleteState);

router.post('/city', authMiddleware.isAllowed(['create']), controllers.createCity);
router.get('/city', authMiddleware.isAllowed(['read']), controllers.getCities);
router.get('/city/:id', authMiddleware.isAllowed(['read']), controllers.getCity);
router.put('/city/:id', authMiddleware.isAllowed(['update']), controllers.updateCity);
router.delete('/city/:id', authMiddleware.isAllowed(['delete']), controllers.deleteCity);

router.post('/postcode', authMiddleware.isAllowed(['create']), controllers.createPostCode);
router.get('/postcode', authMiddleware.isAllowed(['read']), controllers.getPostCodes);
router.get('/postcode/:id', authMiddleware.isAllowed(['read']), controllers.getPostCode);
router.get('/postcode/all/:id', authMiddleware.isAllowed(['read']), controllers.getAllPlacesByPostCode);
router.put('/postcode/:id', authMiddleware.isAllowed(['update']), controllers.updatePostCode);
router.delete('/postcode/:id', authMiddleware.isAllowed(['delete']), controllers.deletePostCode);

router.post('/locality', authMiddleware.isAllowed(['create']), controllers.createLocality);
router.get('/locality', authMiddleware.isAllowed(['read']), controllers.getLocalities);
router.get('/locality/:id', authMiddleware.isAllowed(['read']), controllers.getLocality);
router.put('/locality/:id', authMiddleware.isAllowed(['update']), controllers.updateLocality);
router.delete('/locality/:id', authMiddleware.isAllowed(['delete']), controllers.deleteLocality);


module.exports = router