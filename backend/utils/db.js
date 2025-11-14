const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'D4-92856-Tushar',
    password: 'manager',
    database: "movies_review"
})

module.exports = pool