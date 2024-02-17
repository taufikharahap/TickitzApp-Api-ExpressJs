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

model.getPassword = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT "password", role FROM public.users WHERE username = $1', [username])
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

model.dataExists = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT user_id FROM public.users WHERE username = $1', [username])
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
        db.query('SELECT user_id, fullname, username, email, "role" FROM public.users WHERE username = $1', [username])
            .then((res) => {
                resolve(res.rows)
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.saveData = ({ fullname, username, password, email }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO public.users
            (fullname, username, "password", email)
            VALUES($1, $2, $3, $4);            
        `,
            [fullname, username, password, email]
        )
            .then((res) => {
                resolve(`${res.rowCount} user created`)
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.updateData = ({ username, password, email, userId }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE public.users SET
                username = COALESCE(NULLIF($1, ''), username),
                password = COALESCE(NULLIF($2, ''), password),
                email = COALESCE(NULLIF($3, ''), email),
                updated_at = now()
            WHERE username = $4           
        `,
            [username, password, email, userId]
        )
            .then((res) => {
                resolve(`${res.rowCount} user updated`)
            })
            .catch((er) => {
                reject(er)
            })
    })
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
