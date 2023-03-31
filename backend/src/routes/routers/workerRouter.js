const User = require("../../models/user.js")
const Worker = require("../../models/worker.js")
const express = require("express")

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const users = await Worker.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }
    const newWorker = new Worker({})


    let userData = req.body.user
    userData.role = "worker"
    userData.admin = null
    userData.worker = newWorker._id
    userData.company = null

    const newUser = new User(userData)

    try {
        await newWorker.save()
        await newUser.save()
        res.status(200).send(newUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router