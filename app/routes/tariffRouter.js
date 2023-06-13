const controllers = require('../controllers/tariffController');
const authMiddleware = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/custfran/loctarf', /*authMiddleware.isAllowed(['create'], 'location tariff'),*/ controllers.createLocationTariff);
router.get('/custfran/loctarf', /*authMiddleware.isAllowed(['read'], 'location tariff'),*/ controllers.getLocationTariffs);
//router.get('/custfran/loctarf/:id', authMiddleware.isAllowed(['read'], 'location tariff'), controllers.getLocationTariff);
//router.put('/custfran/loctarf/:id', authMiddleware.isAllowed(['update'], 'location tariff'), controllers.updateLocationTariff);
//router.delete('/custfran/loctarf/:id', authMiddleware.isAllowed(['delete'], 'location tariff'), controllers.deleteLocationTariff);

// router.post('/user', authMiddleware.isAllowed(['create'], 'user'), controllers.createUser);
// router.get('/user', authMiddleware.isAllowed(['read'], 'user'), controllers.getUsers);
// router.get('/user/:id', authMiddleware.isAllowed(['read'], 'user'), controllers.getUser);
// router.put('/user/:id', authMiddleware.isAllowed(['update'], 'user'), controllers.updateUser);
// router.delete('/user/:id', authMiddleware.isAllowed(['delete'], 'user'), controllers.deleteUser);

// router.put('/status/:id', authMiddleware.isAllowed(['update'], 'user'), controllers.updateStatus);

module.exports = router