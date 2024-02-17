const ctrl = {}
const model = require('../model/users')
const respone = require('../utils/respon')
const hashing = require('../utils/hash')

ctrl.fetchData = async (req, res) => {
    try {
        const result = await model.getByUser(req.user)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

// TODO need add data user
ctrl.save = async (req, res) => {
    try {
        req.body.password = await hashing(req.body.password)
        const result = await model.saveData(req.body)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.update = async (req, res) => {
    try {
        const result = await model.updateData(req.user)
        return respone(res, 200, result)
    } catch (error) {
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
