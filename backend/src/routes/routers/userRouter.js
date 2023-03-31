const User = require("../../models/user.js")
const express = require("express")

const router = express.Router()
router.get("/", async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
module.exports = router