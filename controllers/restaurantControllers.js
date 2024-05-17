const Restaurant = require("../models/Restaurant");

module.exports = {
    addRestaurant: async (req, res) => {
        const {title, time, imageUrl, owner, code, logoUrl, coords} = req.body;
        if(!title || !time || !imageUrl || !owner || !code || !logoUrl || !coords 
            || !coords.latitude || !coords.longitude || !coords.address || !coords.title) {
                return res.status(400).json({status: false, message:"You have a missing field"});
        };
        try {
            const newRestaurant = new Restaurant(req.body);
            await newRestaurant.save();
            res.status(201).json({status: true, message:"Restaurant added Successfully"});
        } catch (error) {
            res.status(500).json({status: false, message:error.message});
        }
    },

    getRestaurantById: async (req, res) => {
        const id = req.params.id;
        try {
            const restaurants = await Restaurant.findById(id)
            res.status(200).json(restaurants);   
        } catch (error) {
            res.status(500).json({status:false, message: error.message}); 
        }
    },
    getRestaurantByUser: async (req, res) => {
        const userId = req.params.userId;

        try {
            const restaurant = await Restaurant.findOne({userId: userId});
            if (!restaurant) {
                return res.status(404).json({ status: false, message: "Restaurant not found" });
            }
            res.status(200).json(restaurant);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRestaurantbyUserId: async(req, res) => {
        const userId = req.user.id;
        try {
            const restaurant = await Restaurant.find({userId: userId})
            
            if (!restaurant) {
                return res.status(404).json({ status: false, message: "Restaurant not found" });
            }
            res.status(200).json(restaurant);
        } catch (error) {
            return res.status(500).json({status: false, message:error.message});
        }
    },

    getRandomRestaurant: async (req, res) => {
        const code = req.params.code;
        try {
            let randomRestaurant = [];

            if(code){
                randomRestaurant = await Restaurant.aggregate([
                    {$match: {code}},
                    {$sample: {size:5}}
                ]);
            };
            if(randomRestaurant.length === 0){
                randomRestaurant = await Restaurant.aggregate([
                    {$match: {isAvailable: true}},
                    {$sample: {size:5}}
                ]);
            };
            res.status(200).json(randomRestaurant);
        } catch (error) {
            res.status(500).json({status:false, message: error.message}); 
        }
    },

    getAllNearbyRestaurant: async (req, res) => {
        const code = req.params.code;
        try {
            let allNearbyRestaurants = [];

            if(code){
                allNearbyRestaurants = await Restaurant.aggregate([
                    {$match: {code}},
                    
                ]);
            };
            if(allNearbyRestaurants.length === 0){
                allNearbyRestaurants = await Restaurant.aggregate([
                    {$match: { isAvailable: true}},
                    
                ]);
            }
            
            res.status(200).json(allNearbyRestaurants);
        } catch (error) {
            res.status(500).json({status:false, message: error.message}); 
        }
    }
}