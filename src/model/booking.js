const db = require('../config/db')
const model = {}

model.getBoking = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.booking`)
        .then((res) => {
            resolve(res.rows)
        }).catch(err => {
            reject(err)
        })
    })
}

model.getBookingById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from public.booking
                    where booking_id= $1`, [id])
        .then((res) => {
            resolve(res.rows)
        }).catch(err => {
            reject(err)
        })
    })
}

model.save = async ({ user_id, schedule_id, category, seat, amount, payment_method}) => {
    const pg = await db.connect()
    try {
        await pg.query('BEGIN')

        pg.query(
            `INSERT INTO booking(user_id, schedule_id, category, seat, amount, payment_method) 
                    VALUES($1, $2, $3, $4, $5, $6)`, [user_id, schedule_id, category, seat, amount, payment_method])
        await pg.query('COMMIT')

        return `data booking created`
    } catch (error) {
        await pg.query('ROLLBACK')
        throw error
    }
}

model.update = async ({user_id, schedule_id, category, seat, amount, payment_method}, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE public.booking SET user_id = $1, schedule_id = $2 , category = $3, seat = $4, amount = $5, payment_method=$6
                    WHERE booking_id  = $7`, [user_id, schedule_id, category, seat, amount, payment_method, id])
        .then((res) => {
            resolve('data booking berhasil diubah')
            console.log()
        }).catch(err => {
            reject(err)
        })
    })
}

model.getIdbooking = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from public.booking
                    where booking_id= $1`, [id])
        .then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

model.deletebooking = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.booking 
        WHERE booking_id = $1`, [id])
        .then((res) => {
            resolve(`${res.rowCount} data booking berhasil dihapus`)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = model
