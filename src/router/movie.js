const express = require('express')
const route = express.Router()
const ctrl = require('../controller/movie')
const authCheck = require('../middleware/authtest')
const upload = require('../middleware/upload')

route.get('/', authCheck('user'), ctrl.fetchBy)
route.post('/', authCheck(), upload.single('image'), ctrl.save)
route.patch('/:id', authCheck(), upload.single('image'), ctrl.patch)
route.delete('/:id', authCheck(), ctrl.deleteMovie)

module.exports = route
