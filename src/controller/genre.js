const ctrl = {}
const model = require('../model/genre')
const respone = require('../utils/respon')

ctrl.fetchData = async (req, res) => {
    try {
        const result = await model.getData()
        return respone(res, 200, result)
    } catch (error) {
        console.log(error)
        return respone(res, 500, error.message)
    }
}

ctrl.fetchDataByname = async (req, res) => {
    try {
        const result = await model.getByGenreName(req.query)
        return respone(res, 200, result)
    } catch (error) {
        console.log(error)
        return respone(res, 500, error.message)
    }
}

ctrl.fetchDataByGenreName = async (req, res) => {
    try {
        const params = {
            page: req.query.page || 1,
            limit: req.query.limit || 8,
            orderBy: req.query.orderBy || 'mv.movie_name',
            genre: req.query.genre
        }
        console.log(params.genre)
        const result = await model.getByGenre(params)
        return respone(res, 200, result)
    } catch (error) {
        console.log(error)
        return respone(res, 500, error.message)
    }
}

ctrl.save = async (req, res) => {
    try {
        const result = await model.saveData(req.body)
        return respone(res, 200, result)
    } catch (error) {
        console.log(error)
        return respone(res, 500, error.message)
    }
}
module.exports = ctrl
