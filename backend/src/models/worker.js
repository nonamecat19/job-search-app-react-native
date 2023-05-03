const {Schema, model} = require("mongoose")
const {ApplicationModel, CategoryModel, EmploymentTypeModel, ResumeModel, TagModel, WorkerModel, VacancyModel, UserModel} = require("../constansts/models")

const WorkerSchema = new Schema({
    resumes: {
        type: [Schema.Types.ObjectId],
        ref: ResumeModel,
        default: []
    },
    applications: {
        type: [Schema.Types.ObjectId],
        ref: ApplicationModel,
        default: []
    },
    employmentTypes: {
        type: [Schema.Types.ObjectId],
        ref: EmploymentTypeModel,
        default: []
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: CategoryModel,
        default: []
    },
    saved: {
        type: [Schema.Types.ObjectId],
        ref: VacancyModel,
        default: []
    },
    tags: {
        type: [Schema.Types.ObjectId],
        ref: TagModel,
        default: []
    }
})

WorkerSchema.virtual('user', {
    ref: UserModel,
    localField: '_id',
    foreignField: 'worker',
    justOne: true
})

WorkerSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

const Worker = new model(WorkerModel, WorkerSchema)

module.exports = Worker