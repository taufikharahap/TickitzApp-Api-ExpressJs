const jwt = require('jsonwebtoken')
const respone = require('../utils/respon')

const authRole = (role ='admin') =>{
    return (req, res, next) => {
        console.log(req.baseUrl)
        const { authorization } = req.headers
        if (!authorization) {
            return respone(res, 401, "silahkan login")
        }
    
        const token = authorization.replace("Bearer ", "")
        jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
            if (err) {
                return respone(res, 401, err)
            }
            
            if (role == decode.role) {
                next()
                return;
            }else if(decode.role == 'admin'){
                next()
            } else {
                return respone(res, 401, "invalid role")
            }
        })
    }
}

module.exports = authRole