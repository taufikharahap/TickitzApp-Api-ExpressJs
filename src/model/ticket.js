const db = require('../config/db')
const escape = require('pg-format')
const moment = require('moment')
const model = {}

model.getTicketById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`
                SELECT 
                    m.movie_name,
                    s.cinema_name, 
                    b.category, 
                    s.show_date, 
                    b.seat, 
                    b.amount, 
                    s.price,
                    t.created_at
                FROM public.ticket t
                JOIN public.booking b on b.booking_id = t.booking_id 
                JOIN public.users u on u.user_id = b.user_id
                JOIN public.schedule s on s.schedule_id = b.schedule_id
                JOIN public.movie m on m.movie_id = s.movie_id
                WHERE u.user_id = $1`, [id])
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.getTicket = () => {
    return new Promise((resolve, reject) => {
        db.query(`
                SELECT u.user_id, m.movie_name, s.cinema_name, b.category, s.show_date, b.seat, b.amount, s.price, t.created_at
                FROM public.ticket t
                JOIN public.booking b on b.booking_id = t.booking_id 
                JOIN public.users u on u.user_id = b.user_id
                JOIN public.schedule s on s.schedule_id = b.schedule_id
                JOIN public.movie m on m.movie_id = s.movie_id
                ORDER BY t.created_at`)
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.save = async (booking_id) => {
    const pg = await db.connect()
    try {
        await pg.query('BEGIN')

        pg.query(
            `INSERT INTO public.ticket
                (booking_id)
            VALUES($1)`, [booking_id]
        )

        await pg.query('COMMIT')
        return `data ticket created`
    } catch (error) {
        await pg.query('ROLLBACK')
        throw error
    }
}

model.update = async (bookingId, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE public.ticket SET booking_id = $1
                    WHERE ticket_id  = $2`, [bookingId, id])
        .then((res) => {
            resolve('data tidket berhasi diubah')
            console.log()
        }).catch(err => {
            reject(err)
        })
    })
}

model.getIdTicket = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from public.ticket
                    where ticket_id= $1`, [id])
        .then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

model.deleteTicket = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.ticket 
        WHERE ticket_id = $1`, [id])
        .then((res) => {
            resolve(`${res.rowCount} ticket berhasi dihapus`)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = model
