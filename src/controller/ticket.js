const ctrl = {}
const fs = require('fs')
const model = require('../model/ticket')
const respon = require('../utils/respon')
const respone = require('../utils/respon')

ctrl.fetchDataById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const result = await model.getTicketById(id)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.fetcData = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const result = await model.getTicket()
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.save = async (req, res) => {
    try {
        const {booking_id} = req.body;
        const result = await model.save(booking_id)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.patch = async (req, res) => {
    try {
        const {booking_id} = req.body;
        const checkTicketId = await model.getIdTicket(req.params.id);
        
        if(!checkTicketId.rowCount){          
            return respone(res, 500, `id ticket tidak ada`);
        }

        const result = await model.update(booking_id, req.params.id)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

ctrl.deleteTicket = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const checkTicketId = await model.getIdTicket(id);
        
        if(!checkTicketId.rowCount){            
            return respone(res, 500, `id ticket tidak ada`);
        }

        const result = await model.deleteTicket(id);
        return respon(res, 200, result);
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

module.exports = ctrl