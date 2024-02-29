const express = require('express');
const app = express();
//const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const CategoryRoute = require("./routes/Category");
const RestaurantRoute = require("./routes/Restaurant");
const FoodRoute = require("./routes/Food");
const RatingRoute = require("./routes/Rating");
const AuthRoute = require("./routes/Auth");
const UserRoute = require("./routes/User");
const AddressRoute = require("./routes/Address");
const CartRoute = require("./routes/Cart");
const OrderRoute = require("./routes/Order");


dotenv.config()



mongoose.connect(process.env.MONGOURL).then(() => {console.log("ChopNow database connected!")}).catch((err) => {err})

// const otp = generateOtp()

// sendEmail('nobsafrica8@gmail.com', otp)

// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', AuthRoute);
app.use('/api/users', UserRoute)
app.use('/api/category', CategoryRoute);
app.use('/api/restaurant', RestaurantRoute);
app.use('/api/foods', FoodRoute);
app.use('/api/ratings', RatingRoute);
app.use('/api/cart', CartRoute);
app.use('/api/address', AddressRoute);
app.use('/api/orders', OrderRoute);


app.get('/', (req, res) => res.send("Chop Now"))
app.listen(process.env.PORT || 6000, () => console.log(`chopNow is running at port  ${process.env.PORT || 6000}!`))


