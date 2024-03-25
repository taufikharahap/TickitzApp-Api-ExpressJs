const express = require('express')
const route = express.Router()
const ctrl = require('../controller/movie')
const authCheck = require('../middleware/authtest')
const upload = require('../middleware/upload')

route.get('/', ctrl.fetchBy)
route.get('/:id', ctrl.fetchDataById)
route.get('/search/movie', ctrl.fetchMovieBy)
route.post('/', upload.single('image'), ctrl.save)
route.patch('/:id', upload.single('image'), ctrl.patch)
route.delete('/:id', ctrl.deleteMovie)

module.exports = route
