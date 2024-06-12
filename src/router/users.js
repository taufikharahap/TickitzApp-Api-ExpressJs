const express = require('express')
const route = express.Router()
const ctrl = require('../controller/users')
const upload = require('../middleware/upload')


route.get('/', ctrl.fetchData)
route.get('/:id', ctrl.fetchDataUserById)
route.get('/photo/:id', ctrl.fetchPhotoUserById)
route.post('/', ctrl.save)
route.patch('/:id', upload.uploadUser, ctrl.upadateUser)
route.delete('/', ctrl.delete)

module.exports = route
