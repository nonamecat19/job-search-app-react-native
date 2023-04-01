const {model, Schema} = require("mongoose")
const {CategoryModel, CompanyModel, EmploymentTypeModel, TagModel, VacancyModel} = require("../constansts/models")

const VacancySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: CompanyModel,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true
    },
    minSalary: {
        type: Number
    },
    maxSalary: {
        type: Number
    },
    experience: {
        type: Number
    },
    requirements: {
        type: [String]
    },
    offers: {
        type: [String]
    },
    date: {
        type: Date,
        required: true
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: CategoryModel
    },
    employmentTypes: {
        type: [Schema.Types.ObjectId],
        ref: EmploymentTypeModel
    },
    tags: {
        type: [Schema.Types.ObjectId],
        ref: TagModel
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
})

const Vacancy = new model(VacancyModel, VacancySchema)

module.exports = Vacancy