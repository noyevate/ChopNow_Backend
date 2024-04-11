const Food = require("../models/Food");

module.exports = {
    addFood: async (req, res) => {
        const { title, foodTags, category, code, restaurant, description, time, price, additive, imageUrl } = req.body;
        if (!title || !foodTags || !category || !code || !restaurant || !description || !time || !price || !additive || !imageUrl) {
            return res.status(400).json({ status: false, message: "You have a missing field" });
        };
        try {
            const newFood = new Food(req.body);
            await newFood.save();
            res.status(201).json({ status: true, message: "Food has been added successfully" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        };
    },
    getFoodById: async (req, res) => {
        const id = req.params.id
        try {
            const food = await Food.findById(id);
            res.status(200).json(food);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    getRandomFood: async (req, res) => {
        const code = req.params.code
        try {
            let randomFoodList = []
            // check if code is provided in the params
            if (code) {
                randomFoodList = await Food.aggregate([
                    { $match: { code } },
                    { $sample: { size: 7 } }
                ])
            }

            //if no code provided matches

            if (!randomFoodList.length) {
                randomFoodList = await Food.aggregate([
                    { $sample: { size: 3 } }
                ])
            }

            //respond ith the result

            if (randomFoodList.length) {
                res.status(200).json(randomFoodList)
            } else {
                res.status(404).json({ status: false, message: "No food found" });
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },


    // Restaurant Menu
    getFoodsByRestaurant: async (req, res) => {
        const id = req.params.id
        try {
            const foods = await Food.find({ restaurant: id });
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },


    getFoodByCategoryAndCode: async (req, res) => {
        const { category, code } = req.params;

        try {
            const foods = await Food.aggregate([
                { $match: { category: category, code: code } },

            ]);
            if (foods.length === 0) {
                console.log()
                res.status(200).json([]);
            } else {
                res.status(200).json(foods)
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    getallFoodsByCodee: async (req, res) => {
        const code = req.params.code;
        try {
            const foodList = await Food.find({ code: code });
            return res.status(200).json(foodList)
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message })
        }

    },
    searchFood: async (req, res) => {
        const search = req.params.search;

        try {
            const results = await Food.aggregate([
                {
                    $search: {
                        index: "foods",
                        text: {
                            query: search,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ])

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },


    getRandomFoodByCodeAndCategory: async (req, res) => {
        const { category, code } = req.params;
        try {
            let foods;
            foods = await Food.aggregate([
                { $match: { category, code } },
                { $sample: { size: 3 } }
            ])

            if (foods.length === 0) {
                foods = await Food.aggregate([
                    { $match: { code } },
                    { $sample: { size: 3 } }
                ]);
            }
            if (foods.length === 0) {
                foods = await Food.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 3 } }
                ]);
            }
            res.status(200).json(food);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
}