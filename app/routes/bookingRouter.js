const controllers = require('../controllers/bookingController');
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
router.post('/booking/', controllers.CreatBooking);
router.put('/booking/:id', controllers.CreatBooking);
router.get('/booking/', controllers.GetBookings);
router.get('/booking/:id', controllers.GetBookings);
router.delete('/booking/:id', controllers.DeleteBooking);


module.exports = router