const {Schema, model} = require("mongoose")
const {StatisticModel} = require("../constansts/models")

const StatisticSchema = new Schema({
    numberOfCompanies: {
        type: Number,
        required: true
    },
    numberOfAdmins: {
        type: Number,
        required: true
    },
    numberOfWorkers: {
        type: Number,
        required: true
    },
    vacancyLocation: {
        type: [{
            location: String,
            value: Number
        }],
        required: true
    },
    experience: {
        type: [{
            years: Number,
            value: Number
        }],
        required: true
    },
    resolvedApplications: {
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
    },
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