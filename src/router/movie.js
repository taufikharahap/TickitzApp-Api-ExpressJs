const express = require('express')
const route = express.Router()
const ctrl = require('../controller/movie')
const authCheck = require('../middleware/authtest')
const upload = require('../middleware/upload')

route.get('/', ctrl.fetchBy)
route.get('/:id', ctrl.fetchDataById)
route.get('/search/movie', ctrl.fetchMovieBy)
route.post('/', upload.uploadMovie, ctrl.save)
route.patch('/:id', upload.uploadMovie, ctrl.patch)
route.delete('/:id', ctrl.deleteMovie)

module.exports = route
