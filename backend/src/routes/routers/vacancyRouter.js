const User = require("../../models/user")
const Company = require("../../models/company")
const Vacancy = require("../../models/vacancy")
const express = require("express")

const router = express.Router()

router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }

    let userData = req.body.user
    let companyData = req.body.company

    const newCompany = new Company(companyData)

    userData.role = "employer"
    userData.admin = null
    userData.worker = null
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

module.exports = router