const express = require('express')
const route = express.Router()

const movie = require('./movie')
const genre = require('./genre')
const users = require('./users')
const auth = require('./auth')
const ticket = require('./tikcet')
const booking = require('./booking')
const schedule = require('./schedule')

route.use('/movie', movie)
route.use('/genre', genre)
route.use('/users', users)
route.use('/auth', auth)
route.use('/ticket', ticket)
route.use('/booking', booking)
route.use('/schedule', schedule)

module.exports = route
