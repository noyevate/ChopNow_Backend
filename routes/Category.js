const router = require('express').Router();
const categoryController = require('../controllers/categoryControler');

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/random", categoryController.getRandomCategories);

module.exports = router;