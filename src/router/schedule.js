const express = require('express')
const routers = express.Router()
const ctrl = require('../controller/schedule')


routers.get("/", ctrl.fetchSchedules)
routers.post("/", ctrl.createSchedule)
routers.put("/:id", ctrl.updateSchedule)
routers.delete("/:id", ctrl.deleteSchedule)

module.exports = routers