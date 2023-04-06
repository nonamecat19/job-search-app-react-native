const {Schema, model} = require("mongoose")
const {ApplicationModel, ResumeModel, VacancyModel, WorkerModel, CompanyModel} = require("../constansts/models")

const ApplicationSchema = new Schema({
    vacancy: {
        type: Schema.Types.ObjectId,
        ref: VacancyModel,
        required: true,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: CompanyModel,
        required: true
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: WorkerModel,
        required: true,
    },
    date: {
        type: Date,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
        enum: ["sent", "checked", "resolved", "rejected"]
    },
    resume: {
        type: Schema.Types.ObjectId,
        ref: ResumeModel
    }
})

ApplicationSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

const Application = new model(ApplicationModel, ApplicationSchema)

module.exports = Application