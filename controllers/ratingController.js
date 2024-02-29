const Rating = require("../models/Rating");
const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

module.exports = {
    addRating: async(req, res) => {
        const newRating = new Rating({
            userId: req.body.id,
            ratingType: req.body.rating,
            product: req.body.product,
            rating: req.body.rating
        })

        try {
            await newRating.save()
            if(req.body.ratingType == "Restaurant"){
                const restaurant = await Rating.aggregate([
                    {$match: {ratingType: req.body.rating, ratingType: req.body.rating}},
                    {$group: {_id: '$product'}, averageRating: {$avg:'$rating'}}
                ])
                if(restaurant.length > 0) {
                    const averageRating = restaurant[0].averageRating;
                    await Restaurant.findByIdAndUpdate(req.body.product, {rating: averageRating}, {new:true});

                }
            } else if(req.body.ratingType == "Food"){
                const foods = await Rating.aggregate([
                    {$match: {ratingType: req.body.rating, ratingType: req.body.rating}},
                    {$group: {_id: '$product'}, averageRating: {$avg:'$rating'}}
                ])
                if(foods.length > 0) {
                    const averageRating = restaurant[0].averageRating;
                    await Food.findByIdAndUpdate(req.body.product, {rating: averageRating}, {new:true});
                }
                
            }
            res.status(200).json({status: true, message: "Rating updated successfully"})
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },

    checkUserRating: async (req, res) => {
        const rating = req.body.ratingType;
        const product = req.body.product;

        try {
            const existingRating = await Rating.findOne({
                userId: req.body.userId,
                product: product,
                ratingType: rattingType
            });
            if(exisitingRating){
                res.status(200).json({status: true, message: "Already Rated"})
            } else {
                res.status(200).json({status: False, message: "Not Rated"})
            }
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    }
}