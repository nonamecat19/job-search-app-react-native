const Application = require("../../models/application")
const express = require("express")
const {application} = require("express");

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const applications = await Application.find({})
        res.status(200).send(applications)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }

    let applicationData = req.body

    applicationData.date = new Date()
    applicationData.status = "sent"

    const newApplication = new Application(applicationData)

    try {
        await newApplication.save()
        res.status(200).send(newApplication)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch("/check", async (req, res) => {
    let id = req.body.id
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

router.patch("/resolve", async (req, res) => {
    let id = req.body.id
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

router.patch("/reject", async (req, res) => {
    let id = req.body.id
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



module.exports = router