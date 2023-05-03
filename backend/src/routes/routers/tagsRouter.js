const Tag = require("../../models/tag")
const Vacancy = require("../../models/vacancy")
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

router.delete('/:id', async (req, res) => {
    try {
        const vacancies = await Vacancy.find()
        const id = req.params.id
        let deleteTag = false
        vacancies.forEach(item => {
            if (item.tags.includes(id)) {
                deleteTag = true
            }
        })
        if (deleteTag) {
            throw new Error('Тег використовується')
        } else {
            res.status(200).send()
            await Tag.findByIdAndRemove(req.params.id)
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router