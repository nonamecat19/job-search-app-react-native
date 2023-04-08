const Resume = require("../../models/resume")
const express = require("express")
const path = require("path")
// const multer = require('multer')
//
// const uploadDirectory = 'tmp/'
//
// const upload = multer({
//     dest: uploadDirectory,
//     fileFilter: (req, file, callback) => {
//         let ext = path.extname(file.originalname);
//         if (ext !== '.pdf') {
//             return callback(new Error('Only pdf allowed'))
//         }
//         callback(null, true)
//     }
// }).single('resume')


const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const users = await Resume.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})
//
// router.post("/", upload, async (req, res) => {
//     if (!req.body) {
//         res.status(400).send()
//     }
//
//     let resumeData = req.body
//     const newResume = new Resume(resumeData)
//
//     try {
//         // await newResume.save()
//         res.status(200).send(newResume)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })
//
// router.get("/download/:id", async (req, res) => {
//
//     let fileName = req.params.id
//
//     let filePath = uploadDirectory + fileName
//     const newFileName = fileName + '.pdf'
//
//     try {
//         res.status(200).download(filePath, newFileName)
//     } catch ({message}) {
//
//     }
// })
//

module.exports = router