const express = require("express")
const router = express.Router()

const userRouter = require("./routers/userRouter")
const adminRouter = require("./routers/adminRouter")
const workerRouter = require("./routers/workerRouter")
const companyRouter = require("./routers/companyRouter")
const employmentTypeRouter = require("./routers/employmentTypeRouter")
const tagsRouter = require("./routers/tagsRouter")
const categoriesRouter = require("./routers/categoriesRouter")
const vacanciesRouter = require("./routers/vacancyRouter")
const applicationsRouter = require("./routers/applicationRouter")
const resumesRouter = require("./routers/resumeRouter")
const statisticsRouter = require("./routers/statisticRouter")

router.use('/users', userRouter)
router.use('/workers', workerRouter)
router.use('/companies', companyRouter)
router.use('/employmentTypes', employmentTypeRouter)
router.use('/tags', tagsRouter)
router.use('/categories', categoriesRouter)
router.use('/vacancies', vacanciesRouter)
router.use('/applications', applicationsRouter)
router.use('/resumes', resumesRouter)
router.use('/statistics', statisticsRouter)
router.use('/admin', adminRouter)


module.exports = router