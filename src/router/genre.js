const express = require('express')
const route = express.Router()
const ctrl = require('../controller/genre')

route.get('/', ctrl.fetchData)
route.post('/', ctrl.save)

module.exports = route
