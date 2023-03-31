const Tag = require("../../models/tag")
const express = require("express")

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const users = await Tag.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }

    let tagData = req.body
    const newTag = new Tag(tagData)

    try {
        await newTag.save()
        res.status(200).send(newTag)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router