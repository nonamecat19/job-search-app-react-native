const {Schema, model} = require("mongoose")

const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const {AdminModel, CompanyModel, UserModel, WorkerModel} = require("../constansts/models")

const JWT_SECRET = process.env.JWT_SECRET

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value) {
            if (validator.contains(value, "password")) {
                throw new Error("Password cannot contain the word \"password\"")
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "employer", "worker"]
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: AdminModel,
        default: null
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: WorkerModel,
        default: null
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: CompanyModel,
        default: null
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.pre('save', async function (next){
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.statics.findOneByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user){
        throw new Error('Incorrect email')
    }    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Incorrect password')
    }
    return user
}

UserSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString(),
        email: user.email,
        password: user.password,
    }, JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

const User = model(UserModel, UserSchema)

module.exports = User