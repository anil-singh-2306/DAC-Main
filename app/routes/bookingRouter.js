const controllers = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();


router.get('/awbnumber/:str', controllers.SearchAWBNumber);
router.get('/postcode/:str', controllers.SearchPinCode);
router.get('/city/:str', controllers.SearchCities);
router.get('/state/:str', controllers.SearchStates);
router.get('/bstate/:id', controllers.GetStateById);
router.get('/office/:id', controllers.GetOfficeById);
router.get('/localitiesonpostcode/:id', controllers.GetLocalitiesOnPostCode);
router.get('/pincode/:id', controllers.GetPincodeById);
router.get('/fillvalues/', controllers.FillValues);
router.get('/fillvalues/:id', controllers.GetFillValuesByBookingId);
router.post('/booking/', authMiddleware.isAllowed(['create'], 'booking'), controllers.CreatBooking);
router.put('/booking/:id', authMiddleware.isAllowed(['update'], 'booking'), controllers.CreatBooking);
router.get('/booking/', authMiddleware.isAllowed(['read'], 'booking'), controllers.GetBookings);
router.get('/booking/:id', authMiddleware.isAllowed(['read'], 'booking'), controllers.GetBookings);
router.delete('/booking/:id', authMiddleware.isAllowed(['delete'], 'booking'), controllers.DeleteBooking);
router.get('/consignordetail/:mobile', controllers.GetConsignorDetail);
router.get('/consigneedetail/:mobile', controllers.GetConsigneeDetail);


module.exports = router