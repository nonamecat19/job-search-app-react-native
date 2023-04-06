const {Schema, model} = require("mongoose")
const {CategoryModel} = require("../constansts/models")

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

CategorySchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

const Category = new model(CategoryModel, CategorySchema)

module.exports = Category