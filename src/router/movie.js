const express = require('express')
const route = express.Router()
const ctrl = require('../controller/movie')
const authCheck = require('../middleware/auth')
const upload = require('../middleware/upload')

route.get('/', authCheck, ctrl.fetchBy)
route.post('/', upload.single('image'), ctrl.save)
route.patch('/:id', ctrl.patch)

module.exports = route
