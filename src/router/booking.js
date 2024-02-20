const express = require('express')
const route = express.Router()
const ctrl = require('../controller/booking')
const authCheck = require('../middleware/auth')

route.get('/', ctrl.fetcData)
route.get('/:id', ctrl.fetchDataById)
route.post('/', ctrl.save)
route.patch('/:id', ctrl.patch)
route.delete('/:id', ctrl.deletebooking)

module.exports = route
