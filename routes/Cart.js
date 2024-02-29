const router = require('express').Router();
const cartController = require('../controllers/cartController');
const {verifyTokenAndAuthorization} = require('../middleware/verifyToken')

router.post("/", verifyTokenAndAuthorization, cartController.addProductToCart);
router.get("/decrement", verifyTokenAndAuthorization, cartController.decrementProductQty);
router.delete("/:id", verifyTokenAndAuthorization, cartController.removeCartIem);
router.get("/:id", verifyTokenAndAuthorization, cartController.getCart);
router.patch("/count", verifyTokenAndAuthorization, cartController.getCartCount);



module.exports = router;