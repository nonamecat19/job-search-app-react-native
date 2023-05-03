const Admin = require("../../models/admin")
const User = require("../../models/user")
const express = require("express")
const Worker = require("../../models/worker");
const {ADMIN} = require("../../constansts/roles");

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const users = await Admin.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }

    const newAdmin = new Admin({
        log: []
    })

    let userData = {
        ...req.body,
        role: 'admin',
        admin: newAdmin._id
    }
    console.log(userData)

    const newUser = new User(userData)

    try {
        await newAdmin.save()
        await newUser.save()
        res.status(200).send(newUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router