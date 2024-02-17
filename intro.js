const express = require('express')
const server = express()
const PORT = 8001

server.use(express.json())

//! https://expressjs.com/
//! host https://expressjs.com/
//! endpoint /en/starter/installing.html



// ! req : untuk mongolah data dalam request
// ! res : mengolah respone
server.get("/", (req, res) => {
    res.send("hello worlds")
})

server.get("/test", (req, res) => {
    res.send("hello test")
})

//! https://localhost:8001/products/100
server.get("/products/:id", (req, res) => {
    const ids = req.params.id
    console.log(ids);
    res.send(`product with id ${ids}`)
})


//! https://localhost:8001/users?email=ebiebi@gmail.com
server.get("/users", (req, res) => {
    const query = req.query
    console.log(query.email);
    res.send(`request query`)
})


server.post("/genre", (req, res) => {
    const query = req.body
    console.log(query);
    res.send(`request body`)
})


server.put("/genre/:id", (req, res) => {
    const data = req.body
    const theId = req.params.id
    console.log(data);
    console.log(theId);
    res.send(`request body`)
})


server.listen(PORT, () => {
    console.log(`server run on port ${PORT}`);
})