const router = require('express').Router();
const foodController = require('../controllers/foodController');

router.post("/", foodController.addFood);
router.get("/:id",foodController.getFoodById);
router.get("/random/:code", foodController.getRandomFood);
router.get("/search/:search", foodController.searchFood);
router.get("/category/:code", foodController.getFoodByCategoryAndCode);
router.get("/restaurant-food/:id", foodController.getFoodByCategoryAndCode);

module.exports = router;