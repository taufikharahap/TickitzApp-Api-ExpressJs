const express = require('express')
const route = express.Router()
const ctrl = require('../controller/genre')

route.get('/', ctrl.fetchData)
route.get('/name/', ctrl.fetchDataByname)
route.get('/search/', ctrl.fetchDataByGenreName)
route.post('/', ctrl.save)

module.exports = route
