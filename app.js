const express = require('express')
const app = express()
const routers = require('./src/router')
const db = require('./src/config/db')
const cors = require('cors')

const whitelist = ['http://prto1.com', 'http://prto2.com']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/image", express.static('./public/image/'))
app.use(routers)

db.connect()
    .then(() => {
        app.listen(8001, () => {
            console.log('app running on port 8001')
        })
    })
    .catch((e) => {
        console.log(e)
    })
