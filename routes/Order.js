const router = require('express').Router();
const orderController = require('../controllers/orderController');
const {verifyTokenAndAuthorization} = require('../middleware/verifyToken')

router.post("/", verifyTokenAndAuthorization, orderController.placeOrder);
router.get("/", verifyTokenAndAuthorization,  orderController.getUserOrder);
router.get("/:restaurantId", verifyTokenAndAuthorization,  orderController.getOrdersByRestaurantId);
router.patch('/updateOrderStatus/:orderId', verifyTokenAndAuthorization,  orderController.updateOrderStatus);



module.exports = router;