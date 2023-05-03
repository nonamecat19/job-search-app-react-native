const User = require("../../models/user.js")
const Worker = require("../../models/worker.js")
const express = require("express")
const {Company} = require("../../models/company");
const auth = require("../../middleware/auth");
const {WORKER, COMPANY, ADMIN} = require("../../constansts/roles");
const Vacancy = require("../../models/vacancy");

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const users = await Worker.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/me", auth(WORKER, COMPANY, ADMIN), async (req, res) => {

    try {
        const users = await User
            .findById(req.user._id)
            .select('firstName lastName email')
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch("/me", auth(WORKER, COMPANY), async (req, res) => {
    try {
        const changesFields = ['firstName', 'lastName', 'email', 'password']

        let changes = {}

        for (let element of changesFields)
            if (req.body[element])
                changes[element] = req.body[element]

        await User.findByIdAndUpdate(req.user._id, changes)
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/myResumes", auth(WORKER), async (req, res) => {
    try {
        const worker = await Worker
            .findById(req.user.worker)
            .populate('resumes')

        res.status(200).send(worker.resumes)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }
    const newWorker = new Worker({})

    let userData = req.body.user
    userData.role = "worker"
    userData.worker = newWorker._id

    const newUser = new User(userData)

    try {
        await newWorker.save()
        await newUser.save()
        res.status(200).send(newUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/addSave/:vacancy", auth(WORKER), async (req, res) => {
    try {
        const user = await User
            .findById(req.user._id)
            .populate({
                path: 'worker',
            })

        if (!user) {
            res.status(401).send('Користувач не знайдений')
        } else {
            if (user?.worker?.saved?.includes(req.params.vacancy)) {
                throw new Error('Ця вакансія вже в доданих')
            }

            user.worker.saved.push(req.params.vacancy)
            user.worker.save()
            res.status(200).send(user)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.delete("/removeSave/:vacancy", auth(WORKER), async (req, res) => {
    try {
        const user = await User
            .findById(req.user._id)
            .populate({
                path: 'worker',
            })

        if (!user) {
            res.status(401).send('Користувач не знайдений')
        } else {
            let index = user.worker.saved.indexOf(req.params.vacancy)
            if (index !== -1) {
                user.worker.saved.splice(index, 1)
                user.worker.save()
            }
            res.status(200).send(user)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/inSaves/:vacancy', auth(WORKER), async (req, res) => {
    try {
        const worker = await Worker.findById(req.user.worker)
        const idVacancy = req.params.vacancy
        res.send(worker.saved.indexOf(idVacancy) !== -1)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/getSaves', auth(WORKER), async (req, res) => {
    try {
        const user = await User
            .findById(req.user._id)
            .populate({
                path: 'worker',
                populate: {
                    model: Vacancy,
                    path: 'saved',
                    select: 'title company available id',
                    populate: {
                        path: 'company',
                        model: Company,
                        select: 'name logo'
                    }
                }
            })

        if (!user) {
            throw new Error('Користувач не знайдений')
        }

        res.status(200).send(user.worker.saved)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router