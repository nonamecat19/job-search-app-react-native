const {Schema, model} = require("mongoose")
const {CategoryModel} = require("../constansts/models")

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Category = new model(CategoryModel, CategorySchema)

module.exports = Category