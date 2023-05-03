const User = require("../../models/user.js")
const express = require("express")
const auth = require("../../middleware/auth");
const UserRouter = require("../../models/user");
const jwt = require("jsonwebtoken");
const {ADMIN, WORKER, COMPANY} = require("../../constansts/roles");
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/me", auth(ADMIN, COMPANY, WORKER), async (req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        res.send(e.message)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await UserRouter.findOneByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({
            data: user,
            token: token
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/logoutAll', auth(ADMIN, WORKER, COMPANY), async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        data: user,
            res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/logout', auth(ADMIN, WORKER, COMPANY, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    })
)


module.exports = router