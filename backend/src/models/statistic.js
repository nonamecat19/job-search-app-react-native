const {Schema, model} = require("mongoose")
const {StatisticModel} = require("../constansts/models")

const StatisticSchema = new Schema({
    companies: {
        type: Number,
        required: true
    },
    admins: {
        type: Number,
        required: true
    },
    workers: {
        type: Number,
        required: true
    },
    vacancies: {
        type: Number,
        required: true
    },
    vacanciesWithNoExperience: {
        type: Number,
        required: true
    },
    resolvedApplications: {
        type: Number,
        required: true
    },
    sentApplications: {
        type: Number,
        required: true
    },
    checkedApplications: {
        type: Number,
        required: true
    },
    rejectedApplications: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
})

StatisticSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

const Statistic = new model(StatisticModel, StatisticSchema)

module.exports = Statistic