const multer = require("multer");
const path = require("path");

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.pdf') {
            return callback(new Error('Only pdf files allowed'))
        }
        callback(null, true)
    }
}).single("filename")

module.exports = {upload}