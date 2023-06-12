const Resume = require("../../models/resume")
const Worker = require("../../models/worker")
const express = require("express")
const {initializeApp}  = require("firebase/app")
const {getStorage, ref, getDownloadURL, uploadBytesResumable}  = require("firebase/storage")
const firebaseConfig = require("./../../config/firebase")
const {WORKER} = require("../../constansts/roles")
const auth = require("../../middleware/auth")
const {upload} = require("../../middleware/upload");
const {giveCurrentDateTime} = require("../../utils/utils");

initializeApp(firebaseConfig)
const storage = getStorage()

const router = express.Router()

router.post("/add", auth(WORKER), upload, async (req, res) => {
    try {
        const fileName = `${giveCurrentDateTime()}_${Math.random()}.pdf`
        const filePath = `resumes/${fileName}`
        const storageRef = ref(storage, filePath)

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer)
        const downloadUrl = await getDownloadURL(snapshot.ref)

        const resume = new Resume({
            file: fileName,
            downloadURL: downloadUrl,
            date: Date.now()
        })
        await resume.save()

        const worker = await Worker.findById(req.user.worker)
        worker.resumes.push(resume._id)
        worker.save()

        res.status(200).send({
            worker: worker.resumes,
            resume
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:id', auth(), async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id)
        res.send(resume.downloadURL)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router