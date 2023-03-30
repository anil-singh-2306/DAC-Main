const controllers = require('../controllers/placeController');
const router = require('express').Router();

router.post('/country', controllers.createCountry);
router.get('/country', controllers.getCountries);
router.get('/country/:id', controllers.getCountry);
router.put('/country/:id', controllers.updateCountry);
router.delete('/country/:id', controllers.deleteCountry);

router.post('/zone', controllers.createZone);
router.get('/zone', controllers.getZones);
router.get('/zone/:id', controllers.getZone);
router.put('/zone/:id', controllers.updateZone);
router.delete('/zone/:id', controllers.deleteZone);

router.post('/region', controllers.createRegion);
router.get('/region', controllers.getRegions);
router.get('/region/:id', controllers.getRegion);
router.put('/region/:id', controllers.updateRegion);
router.delete('/region/:id', controllers.deleteRegion);

router.post('/state', controllers.createState);
router.get('/state', controllers.getStates);
router.get('/state/:id', controllers.getState);
router.put('/state/:id', controllers.updateState);
router.delete('/state/:id', controllers.deleteState);

router.post('/city', controllers.createCity);
router.get('/city', controllers.getCities);
router.get('/city/:id', controllers.getCity);
router.put('/city/:id', controllers.updateCity);
router.delete('/city/:id', controllers.deleteCity);

router.post('/postcode', controllers.createPostCode);
router.get('/postcode', controllers.getPostCodes);
router.get('/postcode/:id', controllers.getPostCode);
router.get('/postcode/all/:id', controllers.getAllPlacesByPostCode);
router.put('/postcode/:id', controllers.updatePostCode);
router.delete('/postcode/:id', controllers.deletePostCode);

router.post('/locality', controllers.createLocality);
router.get('/locality', controllers.getLocalities);
router.get('/locality/:id', controllers.getLocality);
router.put('/locality/:id', controllers.updateLocality);
router.delete('/locality/:id', controllers.deleteLocality);


module.exports = router