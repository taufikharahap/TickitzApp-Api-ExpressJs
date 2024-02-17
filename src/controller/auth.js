const ctrl = {}
const model = require('../model/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const respone = require('../utils/respon')

const genToken = (data) => {
    const payload = {
        role: data
    }

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1m' })

    return token
}

ctrl.login = async (req, res) => {
    try {
        const { password, role } = await model.getPassword(req.body.username)
        if (!password) {
            return respone(res, 401, "username tidak terdaftar")
        }

        const passUser = req.body.password
        const check = await bcrypt.compare(passUser, password)
        if (!check) {
            return respone(res, 401, "passwrod salah")
        }

        const tokenJwt = genToken(role)
        return respone(res, 200, { token: tokenJwt })
    } catch (error) {
        console.log(error);
        return respone(res, 500, error.message)
    }
}


module.exports = ctrl