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
        type: Number,
        required: true
    },
    requirements: {
        type: [String],
        required: [],
        default: []
    },
    offers: {
        type: [String],
        required: [],
        default: []
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: CategoryModel,
        required: true
    },
    employmentType: {
        type: Schema.Types.ObjectId,
        ref: EmploymentTypeModel,
        required: true
    },
    tags: {
        type: [Schema.Types.ObjectId],
        ref: TagModel,
        required: true,
        default: []
    },
    available: {
        type: Boolean,
        default: true
    }
})

VacancySchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

const Vacancy = new model(VacancyModel, VacancySchema)

module.exports = Vacancy