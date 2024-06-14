const { Pool } = require('pg')
//user mydb db postgres pass 12345
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    max: 10,
    min: 0,
    idleTimeoutMillis: 8000,
    connectionTimeoutMillis: 8000,

})

module.exports = pool