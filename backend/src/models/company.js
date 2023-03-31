const {Schema, model} = require("mongoose")
const {CompanyModel, VacancyModel} = require("../constansts/models")

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    vacancies: {
        type: [Schema.Types.ObjectId],
        ref: VacancyModel
    }
})

const Company = new model(CompanyModel, CompanySchema)

module.exports = Company