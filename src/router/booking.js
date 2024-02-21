const express = require('express')
const route = express.Router()
const ctrl = require('../controller/booking')
const authCheck = require('../middleware/authtest')

route.get('/', authCheck('user'), ctrl.fetcData)
route.get('/:id', authCheck('user'), ctrl.fetchDataById)
route.post('/', authCheck('user'), ctrl.save)
route.patch('/:id', authCheck(), ctrl.patch)
route.delete('/:id', authCheck(), ctrl.deletebooking)

module.exports = route
