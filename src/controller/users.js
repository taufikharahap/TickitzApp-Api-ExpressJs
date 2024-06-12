const ctrl = {}
const model = require('../model/users')
const respone = require('../utils/respon')
const hashing = require('../utils/hash')
const fs = require('fs')
const bcrypt = require('bcrypt')

ctrl.fetchData = async (req, res) => {
    try {
        const result = await model.getByUser(req.user)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.fetchDataUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const result = await model.getDataUserById(id)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.fetchPhotoUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const result = await model.getPhotUserById(id)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

// TODO need add data user
ctrl.save = async (req, res) => {
    try {
        const checkEmail = await model.dataExists(req.body.email_user);
        if (checkEmail) {
            return respone(res, 500, `Email sudah terdaftar`);
        }
        
        req.body.password = await hashing(req.body.password)
        const result = await model.saveData(req.body)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.upadateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const getUrlPhotoPath = await model.getPhotoUrlById(id);

        if(getUrlPhotoPath !== '' && getUrlPhotoPath !== null){
            const lastPosterName = getUrlPhotoPath.replace('http://localhost:8001/image/', '')
            const imageDir = fs.readdirSync('public/image/poster')
            const findImage = imageDir.indexOf(lastPosterName)

            if(findImage > -1 ){
                fs.unlinkSync(`public/image/poster/${lastPosterName}`);
            }
        }

        if (req.file !== undefined) {
            req.body.photo_url = `http://localhost:8001/image/user/${req.file.filename}`
        }

        
        const {password} = await model.getPasswordById(id)
        
        if (req.body.password == '' || req.body.password == null){
            req.body.password = password
        }else{
            req.body.password = await hashing(req.body.password)
        }


        const result = await model.updateUser(req.body, id)
        return respone(res, 200, result)
    } catch (error) {
        console.log(error)
        return respone(res, 500, error.message)
    }
}

ctrl.delete = async (req, res) => {
    try {
        const result = await model.deleteData(req.user)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

module.exports = ctrl
