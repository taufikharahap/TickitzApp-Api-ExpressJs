const ctrl = {}
const fs = require('fs')
const model = require('../model/movie')
const respon = require('../utils/respon')
const respone = require('../utils/respon')

ctrl.fetchDataById = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const result = await model.getMoviebyId(id)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.fetchBy = async (req, res) => {
    try {
        const params = {
            page: req.query.page || 1,
            limit: req.query.limit || 5,
            orderBy: req.query.orderBy || 'movie_name',
            search: req.query.search
        }
        const result = await model.getBy(params)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.fetchMovieBy = async (req, res) => {
    try {
        const params = {
            page: req.query.page || 1,
            limit: req.query.limit || 5,
            orderBy: req.query.orderBy || 'movie_name',
            name: req.query.name
        }
        const result = await model.getMovieBy(params)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.save = async (req, res) => {
    try {

        if (req.file !== undefined) {
            req.body.movie_poster = `http://localhost:8001/image/${req.file.filename}`
        }

        const result = await model.save(req.body)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.patch = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const checkMovieId = await model.getMovieId(id);
        if(!checkMovieId){
            const imageDir = fs.readdirSync('public/image/poster')
            const findImage = imageDir.indexOf(req.file.filename)
            if(findImage > -1 ){
                fs.unlinkSync(`public/image/poster/${req.file.filename}`);
            }
            
            return respone(res, 500, `id movie tidak ada`);
        }
        
        const getPosterPath = await model.getPosterById(id);

        if(getPosterPath !== null && getPosterPath.indexOf('http://localhost:8001/image/') > -1){
            const lastPosterName = getPosterPath.replace('http://localhost:8001/image/', '')
            const imageDir = fs.readdirSync('public/image/poster')
            const findImage = imageDir.indexOf(lastPosterName)

            if(findImage > -1 ){
                fs.unlinkSync(`public/image/poster/${lastPosterName}`);
            }
        }

        if (req.file !== undefined) {
            req.body.movie_poster = `http://localhost:8001/image/${req.file.filename}`
        }

        const result = await model.update(req.body, req.params.id)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.deleteMovie = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const checkMovieId = await model.getMovieId(id);
        
        if(!checkMovieId){            
            return respone(res, 500, `id movie tidak ada`);
        }

        const getPosterPath = await model.getPosterById(id);
        
        if(getPosterPath !== null && getPosterPath.indexOf('http://localhost:8001/image/') > -1){
            const posterName = await getPosterPath.replace('http://localhost:8001/image/', '')
            const imageDir = await fs.readdirSync('public/image/poster')
            const findImage = await imageDir.indexOf(posterName)
            
            if(findImage > -1 ){
                fs.unlinkSync(`public/image/poster/${posterName}`);
            }
        }
        const result = await model.deleteMovie(id);
        return respon(res, 200, result);
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

module.exports = ctrl
