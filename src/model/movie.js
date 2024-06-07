const db = require('../config/db')
const escape = require('pg-format')
const moment = require('moment')
const model = {}

model.getData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.movie ORDER BY release_date DESC')
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
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
                mv.movie_poster,
                mv.release_date,
                mv.duration,
                string_agg(g.genre_name, ', ') AS genres
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

model.getMovieBy = async ({ page, limit, orderBy, name, genre }) => {
    try {
        let filterQuery = ''
        let orderQuery = ''
        let metaQuery = ''
        let count = 0


        if (name && genre) {
            filterQuery += name && genre ? `and mv.movie_name ILIKE '%${name}%' and genre_name ILIKE '%${genre}%'` : ''
        }

        if (name && !genre) {
            filterQuery += name && !genre ? `and mv.movie_name ILIKE '%${name}%'` : ''
        }
        
        if (!name && genre) {
            filterQuery += !name && genre ? `and genre_name ILIKE '%${genre}%'` : ''
        }

        if (orderBy) {
            orderQuery += escape('ORDER BY %s', orderBy)
        }

        if (page && limit) {
            const offset = (page - 1) * limit
            metaQuery += escape('LIMIT %s OFFSET %s', limit, offset)
        }

        db.query(
            `SELECT COUNT(mv.movie_id) as "count"
            FROM public.movie mv
            JOIN public.movie_genre mg ON mg.movie_id = mv.movie_id
            JOIN public.genre g ON mg.genre_id = g.genre_id
            WHERE true ${filterQuery} GROUP BY mv.movie_id`
        ).then((v) => {
            count = v.rows.length
            console.log(v.rows.length)
        })

        const data = await db.query(`
                    SELECT 
                    mv.movie_id,
                    mv.movie_name,
                    mv.movie_poster,
                    mv.release_date,
                    mv.duration,
                    string_agg(genre_name, ', ') AS genres
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

model.getMoviebyName = (name) => {
    return new Promise((resolve, reject) => {
        db.query(`select
                    mv.movie_id,
                    mv.movie_name,
                    mv.movie_poster,
                    mv.release_date,
                    mv.directed_by,
                    mv.casts,
                    mv.duration,
                    mv.synopsis,
                    string_agg(g.genre_name, ', ') AS genres
                    FROM public.movie mv
                    JOIN public.movie_genre mg ON mg.movie_id = mv.movie_id
                    JOIN public.genre g ON mg.genre_id = g.genre_id
                    where mv.movie_name like $1
                    GROUP BY mv.movie_id`, [`%${name}%`])
        .then((res) => {
            resolve(res.rows)
        }).catch(err => {
            reject(err)
        })
    })
}

model.save = async ({ movie_name, movie_poster, release_date, directed_by, casts, duration, synopsis, genre }) => {
    const pg = await db.connect()
    try {
        await pg.query('BEGIN')

        const movie = await pg.query(
            `INSERT INTO public.movie
            (movie_name, movie_poster, release_date, directed_by, casts, duration, synopsis)
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING movie_id`,
            [movie_name, movie_poster, release_date, directed_by, casts, duration, synopsis]
        )

        if (genre && genre.length > 0) {
            for await (const v of genre) {
                await pg.query(
                    `
                    INSERT INTO public.movie_genre (movie_id, genre_id) 
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

model.update = async ({ movie_name, movie_poster, release_date, directed_by, casts, duration, synopsis, genre }, id) => {
    const pg = await db.connect()
    try {
        await pg.query('BEGIN')

        const movie = await pg.query(
            `UPDATE public.movie SET
                movie_name=$1, movie_poster=$2, release_date=$3, directed_by=$4, casts=$5, duration=$6, synopsis=$7 
            WHERE movie_id=$8`,
            [`${movie_name}`, `${movie_poster}`, `${release_date}`, `${directed_by}`, casts, `${duration}`, `${synopsis}`, id]
        )

        if (genre.length > 0) {
            genre.map(async (v) => {
                return await pg
                    .query(
                        `
                    UPDATE public.movie_genre SET
                        genre_id = $1
                    WHERE movie_id= $2`,
                        [v, id]
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

model.getPosterById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT movie_poster FROM public.movie WHERE movie_id=$1`, [id])
            .then((res) => {
                resolve(res.rows[0].movie_poster)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.getMoviebyId = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`select
                    mv.movie_id,
                    mv.movie_name,
                    mv.movie_poster,
                    mv.release_date,
                    mv.directed_by,
                    mv.casts,
                    mv.duration,
                    mv.synopsis,
                    string_agg(g.genre_name, ', ') AS genres
                    FROM public.movie mv
                    JOIN public.movie_genre mg ON mg.movie_id = mv.movie_id
                    JOIN public.genre g ON mg.genre_id = g.genre_id
                    where mv.movie_id= $1
                    GROUP BY mv.movie_id`, [id])
        .then((res) => {
            resolve(res.rows)
        }).catch(err => {
            reject(err)
        })
    })
}


model.getMovieId = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT movie_id FROM public.movie WHERE movie_id = $1', [id])
            .then((res) => {
                if (res.rows.length) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM movie 
        WHERE movie_id = $1`, [id])
        .then((res) => {
            resolve(`${res.rowCount} movie berhasi dihapus`)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = model
