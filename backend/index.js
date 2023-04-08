const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mainRouter = require("./src/routes/mainRouter")
require("./src/db/mongoose.js")

const app = express()
app.use(cors())
app.options('*', cors())

app.use(morgan('tiny'))





