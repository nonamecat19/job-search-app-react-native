const Statistic = require("../../models/statistic")
const Company = require("../../models/company")
const Worker = require("../../models/worker")
const Admin = require("../../models/admin")
const Vacancy = require("../../models/vacancy")
const Applications = require("../../models/application")

const express = require("express")

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const users = await Statistic.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

const updateStat = async () => {
    const data = {
        companies: await Company.count(),
        admins: await Admin.count(),
        workers: await Worker.count(),
        vacancies: await Vacancy.count(),
        vacanciesWithNoExperience: await Vacancy.count({experience: 0}),
        resolvedApplications: await Applications.count({status: 'resolved'}),
        sentApplications: await Applications.count({status: 'sent'}),
        checkedApplications: await Applications.count({status: 'checked'}),
        rejectedApplications: await Applications.count({status: 'rejected'}),
        date: new Date(),
    }

    const newStatistic = new Statistic(data)
    newStatistic.save()
}

setInterval(() => {
    updateStat()
        .then(() => {
            console.log('Statistics updated')
        })
        .catch((error) => {
            console.error(`Statistics update failed ${error.message}`)
        })
}, 3_600_000)

router.post("/", async (req, res) => {
    try {
        await updateStat()
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error.message)
    }
})





module.exports = router