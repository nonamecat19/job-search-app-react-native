const auth = require("../middleware/auth")
const UserRouter = require("../models/user.js")
const express = require("express")

const router = express.Router()
router.get("/", async (req, res) => {
    try {
        const users = await UserRouter.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/me", auth, async (req, res) => {
    res.send(req.user)
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await UserRouter.findOneByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/:id", auth, async (req, res) => {
    try {
        const user = await UserRouter.find({
            _id: req.params.id
        })
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send()
    }
    const newUser = new UserRouter(req.body)
    try {
        await newUser.save()
        res.status(200).send(newUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.patch("/:id", auth, async (req, res) => {

    async function save(Model, filter, update) {
        try {
            return await Model.findOneAndUpdate(filter, update)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    if (!req.body)
        res.status(400).send()

    const update = req.body

    try {
        await save(UserRouter, {_id: req.params.id}, update)
        res.status(200).send()
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.delete("/:id", auth, async (req, res) => {
    try {
        await UserRouter.deleteOne({_id: req.params.id})
        res.status(200).send()
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.delete("/", auth, async (req, res) => {
    try {
        await UserRouter.deleteMany({})
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error.message)
    }
})
module.exports = router