const controllers = require('../controllers/placeController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/country', authMiddleware.isAllowed(['create'], 'country'), controllers.createCountry);
router.get('/country', authMiddleware.isAllowed(['read'], 'country'), controllers.getCountries);
router.get('/country/:id', authMiddleware.isAllowed(['read'], 'country'), controllers.getCountry);
router.put('/country/:id', authMiddleware.isAllowed(['update'], 'country'), controllers.updateCountry);
router.delete('/country/:id', authMiddleware.isAllowed(['delete'], 'country'), controllers.deleteCountry);

router.post('/zone', authMiddleware.isAllowed(['create'], 'zone'), controllers.createZone);
router.get('/zone', authMiddleware.isAllowed(['read'], 'zone'), controllers.getZones);
router.get('/zone/:id', authMiddleware.isAllowed(['read'], 'zone'), controllers.getZone);
router.put('/zone/:id', authMiddleware.isAllowed(['update'], 'zone'), controllers.updateZone);
router.delete('/zone/:id', authMiddleware.isAllowed(['delete'], 'zone'), controllers.deleteZone);

router.post('/region', authMiddleware.isAllowed(['create'], 'region'), controllers.createRegion);
router.get('/region', authMiddleware.isAllowed(['read'], 'region'), controllers.getRegions);
router.get('/region/:id', authMiddleware.isAllowed(['read'], 'region'), controllers.getRegion);
router.put('/region/:id', authMiddleware.isAllowed(['update'], 'region'), controllers.updateRegion);
router.delete('/region/:id', authMiddleware.isAllowed(['delete'], 'region'), controllers.deleteRegion);

router.post('/state', authMiddleware.isAllowed(['create'], 'state'), controllers.createState);
router.get('/state', authMiddleware.isAllowed(['read'], 'state'), controllers.getStates);
router.get('/state/:id', authMiddleware.isAllowed(['read'], 'state'), controllers.getState);
router.put('/state/:id', authMiddleware.isAllowed(['update'], 'state'), controllers.updateState);
router.delete('/state/:id', authMiddleware.isAllowed(['delete'], 'state'), controllers.deleteState);

router.post('/city', authMiddleware.isAllowed(['create'], 'city'), controllers.createCity);
router.get('/city', authMiddleware.isAllowed(['read'], 'city'), controllers.getCities);
router.get('/city/:id', authMiddleware.isAllowed(['read'], 'city'), controllers.getCity);
router.put('/city/:id', authMiddleware.isAllowed(['update'], 'city'), controllers.updateCity);
router.delete('/city/:id', authMiddleware.isAllowed(['delete'], 'city'), controllers.deleteCity);

router.post('/postcode', authMiddleware.isAllowed(['create'], 'Pin Code / ODA'), controllers.createPostCode);
router.get('/postcode', authMiddleware.isAllowed(['read'], 'Pin Code / ODA'), controllers.getPostCodes);
router.get('/postcode/:id', authMiddleware.isAllowed(['read'], 'Pin Code / ODA'), controllers.getPostCode);
router.get('/postcode/all/:id', authMiddleware.isAllowed(['read'], 'Pin Code / ODA'), controllers.getAllPlacesByPostCode);
router.put('/postcode/:id', authMiddleware.isAllowed(['update'], 'Pin Code / ODA'), controllers.updatePostCode);
router.delete('/postcode/:id', authMiddleware.isAllowed(['delete'], 'Pin Code / ODA'), controllers.deletePostCode);

router.post('/locality', authMiddleware.isAllowed(['create'], 'locality'), controllers.createLocality);
router.get('/locality', authMiddleware.isAllowed(['read'], 'locality'), controllers.getLocalities);
router.get('/locality/:id', authMiddleware.isAllowed(['read'], 'locality'), controllers.getLocality);
router.put('/locality/:id', authMiddleware.isAllowed(['update'], 'locality'), controllers.updateLocality);
router.delete('/locality/:id', authMiddleware.isAllowed(['delete'], 'locality'), controllers.deleteLocality);


module.exports = router