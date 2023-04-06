const {Schema, model} = require("mongoose")
const {ApplicationModel, CategoryModel, EmploymentTypeModel, ResumeModel, TagModel, WorkerModel} = require("../constansts/models")

const WorkerSchema = new Schema({
    resumes: {
        type: [Schema.Types.ObjectId],
        ref: ResumeModel
    },
    applications: {
        type: [Schema.Types.ObjectId],
        ref: ApplicationModel
    },
    employmentTypes: {
        type: [Schema.Types.ObjectId],
        ref: EmploymentTypeModel
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: CategoryModel
    },
    tags: {
        type: [Schema.Types.ObjectId],
        ref: TagModel
    }
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