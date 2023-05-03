const mongoose = require("mongoose")
require("dotenv").config()
const express = require("express")
const mainRouter = require("./../routes/mainRouter")
const morgan = require("morgan")
const app = express()
const uri = process.env.MONGO_URL
const mongooseMorgan = require('mongoose-morgan');

mongoose.connect(uri)
    .then(() => {
        app.listen(3000, () => {
            console.log("App listening on port 3000")
        })
        app.use(mongooseMorgan({connectionString: uri}))
        app.use(morgan('tiny'))
        app.use(express.json())
        app.use('/', mainRouter)
    })
    .then(() => {
        console.log('Database ready!')
    })
    .catch((error) => {
        console.error(error)
    })


