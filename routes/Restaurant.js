const router = require('express').Router();
const restaurantController = require('../controllers/restaurantControllers');

router.post("/", restaurantController.addRestaurant);
router.get("/:code",restaurantController.getRandomRestaurant);
router.get("/all/:code", restaurantController.getAllNearbyRestaurant);
router.post("/byId/:id", restaurantController.getRestaurantById);

module.exports = router;