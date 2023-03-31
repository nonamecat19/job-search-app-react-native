const {Schema, model} = require("mongoose")
const {ApplicationModel, ResumeModel, VacancyModel, WorkerModel} = require("../constansts/models")

const ApplicationSchema = new Schema({
    vacancy: {
        type: Schema.Types.ObjectId,
        ref: VacancyModel,
        required: true,
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

const Application = new model(ApplicationModel, ApplicationSchema)

module.exports = Application