const express = require('express')
const route = express.Router()
const ctrl = require('../controller/ticket')
const authCheck = require('../middleware/auth')
const upload = require('../middleware/upload')

route.get('/', ctrl.fetcData)
route.get('/:id', ctrl.fetchDataById)
route.post('/', ctrl.save)
route.patch('/:id', ctrl.patch)
route.delete('/:id', ctrl.deleteTicket)

module.exports = route
