const {Schema, model} = require("mongoose")
const {AdminModel} = require("../constansts/models")

const AdminSchema = new Schema({
    log: {
        type: [String],
        trim: true,
    }
})

AdminSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

const Admin = new model(AdminModel, AdminSchema)

module.exports = Admin