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

model.getByGenreName = ({name}) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT 
                        mv.movie_id,
                        mv.movie_name,
                        mv.movie_poster,
                        mv.release_date,
                        string_agg(g.genre_name, ', ') AS genres
                    FROM public.movie mv
                    JOIN public.movie_genre mg ON mg.movie_id = mv.movie_id
                    JOIN public.genre g ON mg.genre_id = g.genre_id
                    WHERE g.genre_name = $1
                    GROUP BY mv.movie_id`, [`${name}`])
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
