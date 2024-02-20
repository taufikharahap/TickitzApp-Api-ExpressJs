const fs = require('fs')


const a = fs.readdirSync('public/image/poster')

const b = a.indexOf('2024-02-20T11-28-37.244Z_avatar-limited-ed-couple-i7199.jpg');

console.log(a)
console.log(b)