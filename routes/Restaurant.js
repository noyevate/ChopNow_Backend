const router = require('express').Router();
const restaurantController = require('../controllers/restaurantControllers');
const {verifyVendor} = require('../middleware/verifyToken');
const {verifyTokenAndAuthorization} = require('../middleware/verifyToken')

router.post("/", restaurantController.addRestaurant);
router.get("/:code",  restaurantController.getRandomRestaurant);
router.get("/all/:code",  restaurantController.getAllNearbyRestaurant);
router.get("/byId/:id", restaurantController.getRestaurantById);
router.get("/byUserId/:userId", restaurantController.getRestaurantByUser);
router.get("/", verifyTokenAndAuthorization, restaurantController.getRestaurantbyUserId);
router.post('/toggle-availability/:id', verifyTokenAndAuthorization, restaurantController.restaurantAvailability);

module.exports = router;