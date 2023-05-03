const express = require("express")
const cors = require("cors")
require("./src/db/mongoose.js")

const app = express()
app.use(cors())
app.options('*', cors())





