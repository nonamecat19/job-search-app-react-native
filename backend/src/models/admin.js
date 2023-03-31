const {Schema, model} = require("mongoose")
const {AdminModel} = require("../constansts/models")

const AdminSchema = new Schema({
    log: {
        type: [String],
        trim: true,
    }
})

const Admin = new model(AdminModel, AdminSchema)

module.exports = Admin