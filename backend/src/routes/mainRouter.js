const express = require("express")
const userRouter = require("./routers/userRouter")
const workerRouter = require("./routers/workerRouter")
const companyRouter = require("./routers/companyRouter")
const employmentTypeRouter = require("./routers/employmentTypeRouter")
const tagsRouter = require("./routers/tagsRouter")
const categoriesRouter = require("./routers/categoriesRouter")
const router = express.Router()

router.use('/users', userRouter)
router.use('/workers', workerRouter)
router.use('/companies', companyRouter)
router.use('/employmentTypes', employmentTypeRouter)
router.use('/tags', tagsRouter)
router.use('/categories', categoriesRouter)

module.exports = router