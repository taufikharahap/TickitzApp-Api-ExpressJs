const db = require('../config/db')
const model = {}

model.getData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.users ORDER BY created_at DESC')
            .then((res) => {
                let result = res.rows
                if (res.rows <= 0) {
                    result = 'data not found'
                }

                resolve(result)
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.getDataUserById = (user_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT first_name, last_name, username, email_user, title, points, photo_url, phone_number FROM public.users WHERE user_id=$1', [user_id])
            .then((res) => {
                let result = res.rows
                if (res.rows.length <= 0) {
                    result = 'data not found'
                }

                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.getPhotUserById = (user_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT photo_url FROM public.users WHERE user_id=$1', [user_id])
            .then((res) => {
                let result = res.rows
                if (res.rows.length <= 0) {
                    result = 'data not found'
                }

                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.getPassword = (email_user) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT user_id, "password", "role" FROM public.users WHERE email_user = $1', [email_user])
            .then((res) => {
                if (res.rows.length) {
                    resolve(res.rows[0])
                } else {
                    resolve(false)
                }
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.getPasswordById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT "password", "role" FROM public.users WHERE user_id = $1', [id])
            .then((res) => {
                if (res.rows.length) {
                    resolve(res.rows[0])
                } else {
                    resolve(false)
                }
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.dataExists = (email_user) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT user_id FROM public.users WHERE email_user = $1', [email_user])
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

model.getByUser = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT user_id, first_name, username, email_user, "role" FROM public.users WHERE username = $1', [username])
            .then((res) => {
                resolve(res.rows)
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.saveData = ({ email_user, password, role}) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.users (email_user, "password", "role")
                    VALUES($1, $2, COALESCE($3, 'user'))`, [email_user, password, role])
            .then((res) => {
                resolve(`${res.rowCount} user created`)
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.getPhotoUrlById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT photo_url FROM public.users WHERE user_id=$1`, [id])
            .then((res) => {
                resolve(res.rows[0].photo_url)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.updateUser = async ({ first_name, last_name, username, email_user, password, title, points, photo_url, phone_number}, user_id) => {
    const pg = await db.connect()
    try {
        await pg.query('BEGIN')

        const user = await pg.query(
            `UPDATE public.users SET
                first_name=$1, 
                last_name=$2, 
                username=$3, 
                email_user=$4, 
                password=$5, 
                title=$6,
                points=$7,
                photo_url=$8,
                phone_number=$9,
                updated_at=now()
                WHERE user_id=$10`,
            [first_name, last_name, username, email_user, password, title, points, photo_url, phone_number, user_id]
        )
        await pg.query('COMMIT')
        return `${user.rowCount} data user updated`
    } catch (error) {
        await pg.query('ROLLBACK')
        throw error
    }
}

model.deleteData = (username) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.users WHERE username = $1`, [username])
            .then((res) => {
                resolve(`${res.rowCount} user deleted`)
            })
            .catch((er) => {
                reject(er)
            })
    })
}

module.exports = model
