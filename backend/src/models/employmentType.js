const {Schema, model} = require("mongoose")
const {EmploymentTypeModel} = require("../constansts/models")

const EmploymentTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

EmploymentTypeSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

const EmploymentType = new model(EmploymentTypeModel, EmploymentTypeSchema)

module.exports = EmploymentType