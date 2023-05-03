const Vacancy = require("../../models/vacancy")
const express = require("express")
const Company = require("../../models/company");
const Category = require("../../models/category");
const auth = require("../../middleware/auth");
const {COMPANY} = require("../../constansts/roles");

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const vacancies = await Vacancy
            .find(req.query)
            .populate({
                path: 'company',
                select: 'name logo'
            })
            .populate('category employmentType tags')
        res.status(200).json(vacancies)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get("/recommendations", async (req, res) => {
    try {
        Category
            .find()
            .then(categories => {
                const promises = categories.map(category => {
                    return Vacancy
                        .find({
                            category: category._id
                        })
                        .select('-description -requirements -offers -date -tags -available')
                        .populate('category')
                        .populate({path: 'company', select: 'name logo'})
                        .limit(5)
                        .exec()
                })
                return Promise.all(promises)
            })
            .then(data => {
                res.status(200).json(data)
            })
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.get("/search", async (req, res) => {
    try {
        const query = req.query
        const filter = {
            available: true
        }

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
                select: 'name logo'
            })
            .select('-description -requirements -offers -category -available -tags')
        res.status(200).send(vacancies)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post("/close/:id", auth(COMPANY), async (req, res) => {
    try {
        const id = req.params.id
        const vacancy = await Vacancy.findById(id)
        const userCompany = req.user.company
        vacancy.available = false
        await vacancy.save()
        res.status(200).send()
    } catch (error) {
        res.status(403).send(error.message)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const vacancy = await Vacancy
            .findById(req.params.id)
            .populate({
                path: 'company',
                select: 'name logo'
            })
            .populate('category employmentType tags')
        res.status(200).json(vacancy)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post("/", auth(COMPANY), async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }

    let vacancyData = req.body

    vacancyData.date = new Date()
    vacancyData.company = req.user.company

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