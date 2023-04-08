const mongoose = require("mongoose")
require("dotenv").config()
const express = require("express")
const mainRouter = require("./../routes/mainRouter")
const app = express()
const uri = process.env.MONGO_URL

mongoose.connect(uri)
    .then(() => {
        app.listen(3000, () => {
            console.log("App listening on port 3000")
        })
        app.use(express.json())
        app.use('/', mainRouter)
    })
    .then(() => {
        console.log('Database ready!')
    })
    .catch((error) => {
        console.error(error)
    })


