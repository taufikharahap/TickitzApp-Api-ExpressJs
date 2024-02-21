const express = require('express')
const route = express.Router()
const ctrl = require('../controller/ticket')
const authCheck = require('../middleware/authtest')
const upload = require('../middleware/upload')

route.get('/', authCheck('user'), ctrl.fetcData)
route.get('/:id', authCheck('user'), ctrl.fetchDataById)
route.post('/', authCheck(), ctrl.save)
route.patch('/:id', authCheck(), ctrl.patch)
route.delete('/:id', authCheck(), ctrl.deleteTicket)

module.exports = route
