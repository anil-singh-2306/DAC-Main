const controllers = require('../controllers/tariffController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.get('/custfran/loctarf/fillvalues', controllers.getFillValues);
router.get('/custarf/customers', authMiddleware.isAllowed(['create'], 'contract'), controllers.getCustomers);
router.get('/custarf/ratetarf', authMiddleware.isAllowed(['create'], 'contract'), controllers.getRateTariffs);

router.post('/custfran/loctarf', authMiddleware.isAllowed(['create'], 'location tariff'), controllers.createLocationTariff);
router.get('/custfran/loctarf', authMiddleware.isAllowed(['read'], 'location tariff'), controllers.getLocationTariffs);
router.get('/custfran/loctarf/:id', authMiddleware.isAllowed(['read'], 'location tariff'), controllers.getLocationTariff);
router.put('/custfran/loctarf/:id', authMiddleware.isAllowed(['update'], 'location tariff'), controllers.updateLocationTariff);
router.delete('/custfran/loctarf/:id', authMiddleware.isAllowed(['delete'], 'location tariff'), controllers.deleteLocationTariff);

router.post('/custfran/custarf', authMiddleware.isAllowed(['create'], 'contract'), controllers.createCustomerTariff);
router.get('/custfran/custarf', authMiddleware.isAllowed(['read'], 'contract'), controllers.getCustomerTariffs);
router.get('/custfran/custarf/:id', authMiddleware.isAllowed(['read'], 'contract'), controllers.getCustomerTariff);
router.put('/custfran/custarf/:id', authMiddleware.isAllowed(['update'], 'contract'), controllers.updateCustomerTariff);
router.delete('/custfran/custarf/:id', authMiddleware.isAllowed(['delete'], 'contract'), controllers.deleteCustomerTariff);

module.exports = router