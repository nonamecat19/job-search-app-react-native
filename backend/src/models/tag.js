const {Schema, model} = require("mongoose")
const {TagModel} = require("../constansts/models")

const TagSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Tag = new model(TagModel, TagSchema)

module.exports = Tag