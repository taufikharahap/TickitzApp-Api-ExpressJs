const db = require('../src/config/db')
const genre = require('./genre')
const movie = require('./movie')

db.connect(async (err, client, done) => {
    if (err) {
        console.error(err)
        return
    }

    try {
        await genre()
        await movie()

        console.log(`seed table success`)
        process.exit(0)
    } catch (error) {
        console.log(error);
    }
})
