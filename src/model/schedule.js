const models = {}
const db = require('../config/db')


models.addSchedule = ({ movieId, showDate, showLocation, price, cinemaName }) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.schedule(movie_id, show_date, show_location, price, cinema_name) 
                    VALUES($1, $2, $3, $4, $5)`, [movieId, showDate, showLocation, price, cinemaName])
            .then((res) => {
                resolve('Data schedule berhasil ditambahkan')
            }).catch(err => {
                reject(err)
            })
    })
}

models.getSchedules = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.schedule`)
        .then((res) => {
            resolve(res.rows)
        }).catch(err => {
            reject(err)
        })
    })
}

models.getScheduleById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from public.schedule
                    where schedule_id= $1`, [id])
        .then((res) => {
            resolve(res.rowCount)
        }).catch(err => {
            reject(err)
        })
    })
}

models.updateSchedule = (date, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE public.schedule SET show_date = $1
                    WHERE schedule_id  = $2`, [date, id])
        .then((res) => {
            resolve('Schedule berhasi diubah')
            console.log()
        }).catch(err => {
            reject(err)
        })
    })
}

models.deleteSchedule = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM schedule 
        WHERE schedule_id = $1`, [id])
        .then((res) => {
            resolve(`schedule berhasil dihapus`)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = models