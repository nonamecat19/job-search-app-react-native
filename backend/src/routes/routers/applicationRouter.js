const Application = require("../../models/application")
const Vacancy = require("../../models/vacancy")
const Worker = require("../../models/worker")
const express = require("express")
const auth = require("../../middleware/auth");
const {WORKER, COMPANY} = require("../../constansts/roles");
const User = require("../../models/user");

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const applications = await Application.find({})
        res.status(200).send(applications)
    } catch (error) {
        res.status(500).send(error)
    }
})



router.patch("/check/:id", async (req, res) => {
    let id = req.params.id
    try {
        let applications = await Application.findById(id)
        if (!applications){
            throw new Error('Application not found')
        }
        if (applications.status === 'sent'){
            applications.status = 'checked'
        }
        applications.save()
        res.status(200).send(applications)
    } catch ({message}) {
        res.status(500).send(message)
    }
})

router.get("/my", auth(WORKER), async (req, res) => {
    const id = req.user.worker
    try {
        let worker = await Worker
            .findById(id)
            .populate({
                path: 'applications',
                populate: {
                    path: 'vacancy',
                    select: 'title',
                    populate: {
                        path: 'company',
                        select: 'name logo'
                    }
                },
                select: 'vacancy date status'
            })

        res.send(worker.applications)
    } catch (error) {
        res.status(401).send(error.message)
    }
})

router.patch("/resolve/:id", async (req, res) => {
    let id = req.params.id
    try {
        let applications = await Application.findById(id)
        if (!applications){
            throw new Error('Application not found')
        }
        applications.status = 'resolved'
        applications.save()
        res.status(200).send(applications)
    } catch ({message}) {
        res.status(500).send(message)
    }
})

router.patch("/reject/:id", async (req, res) => {
    let id = req.params.id
    try {
        let applications = await Application.findById(id)
        if (!applications){
            throw new Error('Application not found')
        }
        applications.status = 'rejected'
        applications.save()
        res.status(200).send(applications)
    } catch ({message}) {
        res.status(500).send(message)
    }
})

router.get("/vacancy/:id", auth(COMPANY), async (req, res) => {
    try {
        const id = req.params.id

        let applications = await Application
            .find({vacancy: id})
            .populate({
                path: 'worker',
                select: 'user',
                populate: {
                    path: 'user',
                    select: 'firstName lastName email -worker'
                }
            })
            .select('-company')

        res.status(200).send(applications)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/:vacancy", auth(WORKER), async (req, res) => {
    let applicationData = {
        vacancy: req.params.vacancy,
        worker: req.user.worker,
        date: new Date(),
        status: "sent"
    }
    if (req.body.resume) {
        applicationData.resume = req.body.resume
    }
    const newApplication = new Application(applicationData)

    try {
        const vacancy = await Vacancy.findById(req.params.vacancy)
        newApplication.company = vacancy.company
        const worker = await Worker.findById(req.user.worker)
        worker.applications.push(newApplication._id)
        await newApplication.save()
        await worker.save()
        res.status(200).send(newApplication)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router