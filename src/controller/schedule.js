const models = require('../model/schedule')
const respon = require('../utils/respon')
const respone = require('../utils/respon')
const controller = {}


controller.fetchSchedules = async (req, res) => {
    try {
        const data = await models.getSchedules()
        return respone(res, 200, data)
        
    } catch (error) {
        return respone(res, 500, error.message)
    }
}

controller.createSchedule = async (req, res) => {
    try {
        const data = await models.addSchedule(req.body);
        return respone(res, 200, data)

    } catch (error) {
        return respone(res, 500, error.message)
    }
}

controller.updateSchedule = async (req, res) => {
    try {
        const {date} = req.body;
        const id = parseInt(req.params.id);

        const checkScheduleId = await models.getScheduleById(id);
        
        if(!checkScheduleId){
            return respone(res, 500, `id schedule tidak ditemukan`);
        }

        const data = await models.updateSchedule( date, id);
        return respone(res, 200, data)

    } catch (error) {
        return respone(res, 500, error.message)
    }
}

controller.deleteSchedule = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const checkScheduleId = await models.getScheduleById(id);
        
        if(!checkScheduleId){
            return respone(res, 500, "id tidak ditemukan")
        }

        const data = await models.deleteSchedule(id);
        return respon(res, 200, data)

    } catch (error) {
        return respone(res, 500, error.message)
    }
}


module.exports = controller