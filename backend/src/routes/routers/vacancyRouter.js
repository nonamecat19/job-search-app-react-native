const Vacancy = require("../../models/vacancy")
const express = require("express")

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const vacancies = await Vacancy.find({})
        res.status(200).send(vacancies)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/search", async (req, res) => {
    try {
        const filter = req.query
        const newFilter = {}

        if (filter.minSalary) {
            newFilter.minSalary = {
                $lte: filter.minSalary
            }
        }
        if (filter.experience) {
            newFilter.experience = {
                $lte: filter.experience
            }
        }
        if (filter.query) {
            newFilter.title = {
                $regex: filter.query,
                $options: 'i'
            }
        }

        const vacancies = await Vacancy.find(newFilter)
        res.status(200).send(vacancies)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }

    let vacancyData = req.body

    vacancyData.date = new Date()
    const newVacancy = new Vacancy(vacancyData)

    try {
        await newVacancy.save()
        res.status(200).send(newVacancy)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router