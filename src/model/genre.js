const db = require('../config/db')
const model = {}

model.getData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.genre ORDER BY created_at DESC')
            .then((res) => {
                if (res.rows <= 0) {
                    resolve('data not found')
                } else {
                    resolve(res.rows)
                }
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.saveData = ({ name }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO public.genre
                (genre_name)
            VALUES($1);
        `,
            [name]
        )
            .then((res) => {
                resolve(`${res.rowCount} genre created`)
            })
            .catch((er) => {
                reject(er)
            })
    })
}

module.exports = model
