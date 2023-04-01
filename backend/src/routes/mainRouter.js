const express = require("express")
const router = express.Router()

const userRouter = require("./routers/userRouter")
const workerRouter = require("./routers/workerRouter")
const companyRouter = require("./routers/companyRouter")
const employmentTypeRouter = require("./routers/employmentTypeRouter")
const tagsRouter = require("./routers/tagsRouter")
const categoriesRouter = require("./routers/categoriesRouter")
const vacanciesRouter = require("./routers/vacancyRouter")
const applicationsRouter = require("./routers/applicationRouter")
const resumesRouter = require("./routers/resumeRouter")

router.use('/users', userRouter)
router.use('/workers', workerRouter)
router.use('/companies', companyRouter)
router.use('/employmentTypes', employmentTypeRouter)
router.use('/tags', tagsRouter)
router.use('/categories', categoriesRouter)
router.use('/vacancies', vacanciesRouter)
router.use('/applications', applicationsRouter)
router.use('/resumes', resumesRouter)


module.exports = router