const mongoose = require("mongoose")
require("dotenv").config()

const uri = process.env.MONGO_URL
mongoose.connect(uri)
    .then(() => {
        console.log('Database ready!')
    })
    .catch((error) => {
        console.error(error)
    })

