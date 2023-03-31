const {Schema, model} = require("mongoose")
const {ResumeModel} = require("../constansts/models")

const ResumeSchema = new Schema({
    file: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
})

const Resume = new model(ResumeModel, ResumeSchema)

module.exports = Resume