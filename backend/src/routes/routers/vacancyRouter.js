const Vacancy = require("../../models/vacancy")
const express = require("express")
const Company = require("../../models/company");

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const vacancies = await Vacancy
            .find({})
            .populate({
                path: 'company',
                select: 'name'
            })
            .populate('categories employmentTypes tags')
        res.status(200).json(vacancies)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/search", async (req, res) => {
    try {
        const query = req.query
        const filter = {}

        if (query.minSalary) {
            filter.minSalary = {
                $gte: query.minSalary
            }
        }
        if (query.experience) {
            filter.experience = {
                $lte: query.experience
            }
        }
        if (query.query) {
            filter.title = {
                $regex: query.query,
                $options: 'i'
            }
        }

        const vacancies = await Vacancy
            .find(filter)
            .populate({
                path: 'company',
                select: 'name'
            })
            .populate('categories employmentTypes tags')
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
        const company = await Company.findById(vacancyData.company)
        company.vacancies.push(newVacancy._id)
        await company.save()
        await newVacancy.save()
        res.status(200).send(newVacancy)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router