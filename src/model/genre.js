const db = require('../config/db')
const model = {}
const escape = require('pg-format')
const moment = require('moment')


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

model.getByGenre = async ({ page, limit, orderBy, genre }) => {
    try {
        let filterQuery = ''
        let orderQuery = ''
        let metaQuery = ''
        let count = 0


        if (genre) {
            filterQuery += genre ? `and genre_name ILIKE '%${genre}%'` : ''
        }

        if (orderBy) {
            orderQuery += escape('ORDER BY %s', orderBy)
        }

        if (page && limit) {
            const offset = (page - 1) * limit
            metaQuery += escape('LIMIT %s OFFSET %s', limit, offset)
        }

        db.query(
            `SELECT COUNT(mv.movie_id) as "count" FROM public.movie mv
            JOIN public.movie_genre mg ON mg.movie_id = mv.movie_id
            JOIN public.genre g ON mg.genre_id = g.genre_id
            WHERE true ${filterQuery}`
        ).then((v) => {
            count = v.rows[0].count
        })

        const data = await db.query(`
            SELECT 
            mv.movie_id,
            mv.movie_name,
            mv.movie_poster,
            mv.release_date,
            string_agg(g.genre_name, ', ') AS genres
            FROM public.genre g 
            JOIN public.movie_genre mg ON mg.genre_id = g.genre_id 
            JOIN public.movie mv ON mv.movie_id = mg.movie_id 
            WHERE true ${filterQuery}
            GROUP BY mv.movie_id
            ${orderQuery} ${metaQuery}
        `)

        const meta = {
            next: count <= 0 ? null : page == Math.ceil(count / limit) ? null : Number(page) + 1,
            prev: page == 1 ? null : Number(page) - 1,
            total: count
        }
        if (data.rows.length <= 0) {
            return 'data not found'
        } else {
            data.rows.map((v) => {
                const date = moment(v.release_date)
                v.release_date = date.format('DD MMMM YYYY')
            })
            return { data: data.rows, meta }
        }
    } catch (error) {
        throw error
    }
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
