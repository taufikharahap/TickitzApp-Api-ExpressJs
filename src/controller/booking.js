const ctrl = {}
const fs = require('fs')
const model = require('../model/booking')
const respon = require('../utils/respon')
const respone = require('../utils/respon')

ctrl.fetchDataById = async (req, res) => {
    try {
        const checkbookingId = await model.getIdbooking(req.params.id);
        
        if(!checkbookingId.rowCount){          
            return respone(res, 500, `id booking tidak ada`);
        }

        const result = await model.getBookingById(req.params.id)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.fetcData = async (req, res) => {
    try {
        const result = await model.getBoking()
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.save = async (req, res) => {
    try {
        const result = await model.save(req.body)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.patch = async (req, res) => {
    try {
        const checkbookingId = await model.getIdbooking(req.params.id);
        
        if(!checkbookingId.rowCount){          
            return respone(res, 500, `id booking tidak ada`);
        }

        const result = await model.update(req.body, req.params.id)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.deletebooking = async (req, res) => {
    try {
        const checkbookingId = await model.getIdbooking(req.params.id);
        
        if(!checkbookingId.rowCount){            
            return respone(res, 500, `id booking tidak ada`);
        }

        const result = await model.deletebooking(req.params.id);
        return respon(res, 200, result);
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

module.exports = ctrl