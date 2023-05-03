const User = require("../../models/user")
const Company = require("../../models/company")
const Application = require("../../models/application")
const Vacancy = require("../../models/vacancy")
const express = require("express")
const {Error} = require("mongoose");
const {COMPANY} = require("../../constansts/roles");
const auth = require("../../middleware/auth");

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const users = await Company
            .find({})
        .populate({
            path: 'vacancies',
            select: 'title'
        })
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/me", auth(COMPANY), async (req, res) => {
    try {
        const companies = await Company
            .findById(req.user.company)
            .populate({
                path: 'vacancies'
            })
        res.send(companies.vacancies)
    } catch (error) {
        res.status(500).send(error.message)
    }

})

router.get('/vacancies', auth(COMPANY), async (req, res) => {
    try {
        const users = await Company
            .findById(req.user.company)
            .populate({
                path: 'vacancies',
                select: 'title location available'
            })

        if (!users.vacancies?.length) {
            throw new Error('This company have no vacancies!')
        }
        res.status(200).send(users.vacancies)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const users = await Company
            .findById(req.params.id)
            .populate({
                path: 'vacancies',
                select: 'title'
            })
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch("/:id", async (req, res) => {
    try {
        await Company.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})



router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }

    let userData = req.body.user
    let companyData = req.body.company

    const newCompany = new Company(companyData)

    userData.role = "employer"
    userData.company = newCompany._id

    const newUser = new User(userData)

    try {
        await newCompany.save()
        await newUser.save()
        res.status(200).send([newUser, newCompany])
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id)
        if (!company) {
            throw new Error('Not found!')
        }
        await Vacancy.deleteMany({company: req.params.id})
        await Application.deleteMany({company: req.params.id})
        res.status(200).send()
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router