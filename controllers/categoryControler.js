const Category = require("../models/Categories");

module.exports = {
    createCategory: async (req, res) => {
        const newCategory = new Category(req.body)
        try {
            await newCategory.save()
            res.status(201).json({status: true, message: "Category Created Successfully"})
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },

    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find({title: {$ne: "More"}});
            res.status(200).json(categories)

        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },
    getRandomCategories: async (req, res) => {
        try {
            let categories = await Category.aggregate([
                {$match: {value: {$ne: "more"}}},
                {$sample: {size: 4}}
                ,]);
            const moreCategory = await Category.findOne({value: "more" });   
            if(moreCategory){
                categories.push(moreCategory)
            } 
            res.status(200).json(categories)

        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    }
}