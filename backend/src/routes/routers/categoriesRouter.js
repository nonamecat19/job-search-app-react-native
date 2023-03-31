const Category = require("../../models/category")
const express = require("express")

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const users = await Category.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }

    let categoryData = req.body
    const newCategory = new Category(categoryData)

    try {
        await newCategory.save()
        res.status(200).send(newCategory)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router