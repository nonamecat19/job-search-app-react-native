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
    logo: {
        type: String
    },
    vacancies: {
        type: [Schema.Types.ObjectId],
        ref: VacancyModel
    },
})

CompanySchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

const Company = new model(CompanyModel, CompanySchema)

module.exports = Company