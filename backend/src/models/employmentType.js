const {Schema, model} = require("mongoose")
const {EmploymentTypeModel} = require("../constansts/models")

const EmploymentTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const EmploymentType = new model(EmploymentTypeModel, EmploymentTypeSchema)

module.exports = EmploymentType