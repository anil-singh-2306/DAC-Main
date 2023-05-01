const controllers = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();


router.get('/awbnumber/:str', authMiddleware.isAllowed(['read']), controllers.SearchAWBNumber);
router.get('/postcode/:str', authMiddleware.isAllowed(['read']), controllers.SearchPinCode);
router.get('/city/:str', authMiddleware.isAllowed(['read']), controllers.SearchCities);
router.get('/state/:str', authMiddleware.isAllowed(['read']), controllers.SearchStates);
router.get('/bstate/:id', authMiddleware.isAllowed(['read']), controllers.GetStateById);
router.get('/office/:id', authMiddleware.isAllowed(['read']), controllers.GetOfficeById);
router.get('/localitiesonpostcode/:id', authMiddleware.isAllowed(['read']), controllers.GetLocalitiesOnPostCode);
router.get('/pincode/:id', authMiddleware.isAllowed(['read']), controllers.GetPincodeById);
router.get('/fillvalues/', authMiddleware.isAllowed(['read']), controllers.FillValues);
router.get('/fillvalues/:id', authMiddleware.isAllowed(['read']), controllers.GetFillValuesByBookingId);
router.post('/booking/', authMiddleware.isAllowed(['read']), controllers.CreatBooking);
router.put('/booking/:id', authMiddleware.isAllowed(['update']), controllers.CreatBooking);
router.get('/booking/', authMiddleware.isAllowed(['read']), controllers.GetBookings);
router.get('/booking/:id', authMiddleware.isAllowed(['read']), controllers.GetBookings);
router.delete('/booking/:id', authMiddleware.isAllowed(['delete']), controllers.DeleteBooking);
router.get('/consignordetail/:mobile', authMiddleware.isAllowed(['read']), controllers.GetConsignorDetail);
router.get('/consigneedetail/:mobile', authMiddleware.isAllowed(['read']), controllers.GetConsigneeDetail);


module.exports = router