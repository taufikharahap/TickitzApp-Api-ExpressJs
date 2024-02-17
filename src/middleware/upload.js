const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + "_" + file.originalname)
    }
})

module.exports = multer({
    storage: storage
})