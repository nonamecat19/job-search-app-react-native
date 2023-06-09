const jwt = require("jsonwebtoken")
const User = require("../models/user")

require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET



// const auth = async (req, res, next)=> {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         const decoded = jwt.verify(token, JWT_SECRET)
//         const user = await User.findOne({
//             _id: decoded._id,
//             'tokens.token': token
//         })
//         if (!user) {
//             throw new Error('')
//         }
//         req.user = user
//         req.token = token
//         next()
//     } catch (error) {
//         res.status(401).send({
//             error: 'Please authenticate'
//         })
//     }
// }


const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, JWT_SECRET)
            const user = await User.findOne({
                _id: decoded._id,
                'tokens.token': token
            })
            if (!user) {
                throw new Error('')
            } else {
                if (!roles.includes(user.role)) {
                    res.status(403).send({
                        error: `No access! You: ${user.role} Need: ${roles}`
                    })
                } else {
                    req.user = user
                    req.token = token
                    next()
                }
            }
        } catch (error) {
            res.status(401).send({
                error: 'Please authenticate'
            })
        }
    }
}



module.exports = auth