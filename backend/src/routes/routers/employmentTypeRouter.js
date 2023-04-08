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
    const newEmploymentType = new EmploymentType(req.body)

    try {
        await newEmploymentType.save()
        res.status(200).send(newEmploymentType)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await EmploymentType.findByIdAndRemove(req.params.id)
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router