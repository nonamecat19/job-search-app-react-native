const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mainRouter = require("./routes/mainRouter")
require("./db/mongoose.js")

const app = express()
app.use(cors())
app.options('*', cors())

app.use(morgan('tiny'))
app.use(express.json())

app.use('/', mainRouter)

app.listen(3000, () => {
    console.log("App listening on port 3000")
})

