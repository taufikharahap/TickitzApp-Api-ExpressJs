const db = require('../config/db')
const escape = require('pg-format')
const moment = require('moment')
const model = {}

model.getData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.product ORDER BY id_product DESC')
            .then((res) => {
                resolve(res.rows)
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.getBy = async ({ page, limit, orderBy, search }) => {
    try {
        let filterQuery = ''
        let orderQuery = ''
        let metaQuery = ''
        let count = 0


        if (search) {
            filterQuery += search ? escape('AND movie_name = %L', search) : ''
        }

        if (orderBy) {
            orderQuery += escape('ORDER BY %s', orderBy)
        }

        if (page && limit) {
            const offset = (page - 1) * limit
            metaQuery += escape('LIMIT %s OFFSET %s', limit, offset)
        }

        db.query(
            `SELECT COUNT(mv.movie_id) as "count" FROM public.movie mv WHERE true ${filterQuery}`
        ).then((v) => {
            count = v.rows[0].count
        })

        const data = await db.query(`
            SELECT 
                mv.movie_id,
                mv.movie_name,
                mv.movie_banner,
                mv.release_date,
                string_agg(g.genre_name, ', ') AS genres,
                mv.created_at, 
                mv.updated_at
            FROM public.movie mv
            JOIN public.movie_genre mg ON mg.movie_id = mv.movie_id
            JOIN public.genre g ON mg.genre_id = g.genre_id
            WHERE true ${filterQuery}
            GROUP BY mv.movie_id
            ${orderQuery} ${metaQuery}
        `)

        const meta = {
            next: count <= 0 ? null : page == Math.ceil(count / limit) ? null : Number(page) + 1,
            prev: page == 1 ? null : Number(page) - 1,
            total: count
        }

        if (data.rows <= 0) {
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

model.save = async ({ name, banner, release, genre }) => {
    const pg = await db.connect()
    try {
        await pg.query('BEGIN')

        const movie = await pg.query(
            `INSERT INTO public.movie
                (movie_name, movie_banner, release_date)
            VALUES($1, $2, $3) RETURNING movie_id`,
            [name, banner, release]
        )

        if (genre && genre.length > 0) {
            for await (const v of genre) {
                await pg.query(
                    `
                    INSERT INTO public.movie_genre
                        (movie_id, genre_id)
                    VALUES($1, $2)`,
                    [movie.rows[0].movie_id, v]
                );
            }
        }

        await pg.query('COMMIT')
        return `${movie.rowCount} data movie created`
    } catch (error) {
        console.log(error);
        await pg.query('ROLLBACK')
        throw error
    }
}

model.update = async ({ name, banner, release, genre }, id) => {
    try {
        const pg = await db.connect()
        await pg.query('BEGIN')

        const movie = await pg.query(
            `UPDATE public.movie SET
                movie_name=$1, movie_banner=$2, release_date=$3
            WHERE movie_id=$4`,
            [name, banner, release, id]
        )

        if (genre.length > 0) {
            genre.map(async (v) => {
                return await pg
                    .query(
                        `
                    UPDATE public.movie_genre SET
                        genre_id = $1
                    WHERE movie_genre = $2`,
                        [v.id, v.movie_genre]
                    )
                    .catch((err) => {
                        console.log(err)
                    })
            })
        }

        await pg.query('COMMIT')
        return `${movie.rowCount} data movie updated`
    } catch (error) {
        await pg.query('ROLLBACK')
        throw error
    }
}

module.exports = model
