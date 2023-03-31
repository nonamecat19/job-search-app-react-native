const EmploymentType = require("../../models/employmentType")
const express = require("express")

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const users = await EmploymentType.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }

    let employmentTypeData = req.body
    const newEmploymentType = new EmploymentType(employmentTypeData)

    try {
        await newEmploymentType.save()
        res.status(200).send(newEmploymentType)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router