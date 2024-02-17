const express = require('express')
const route = express.Router()
const ctrl = require('../controller/auth')


route.post('/', ctrl.login)


module.exports = route
