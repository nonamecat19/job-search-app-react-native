const EmploymentType = require("../../models/employmentType")
const Vacancy = require("../../models/vacancy")
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
        const id = req.params.id
        const employmentTypes = await Vacancy.find({employmentType: id})
        if (employmentTypes.length === 0) {
            await EmploymentType.findByIdAndRemove(id)
            res.status(200).send()
        } else {
            throw new Error('Видалення неможливе')
        }


    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router