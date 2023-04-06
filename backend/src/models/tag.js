const {Schema, model} = require("mongoose")
const {TagModel} = require("../constansts/models")

const TagSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

TagSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

const Tag = new model(TagModel, TagSchema)

module.exports = Tag