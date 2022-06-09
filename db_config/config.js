require('dotenv').config();
const util = require('util');
const mysql = require('mysql');

let pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
});

pool.getConnection((err, connection) => {
    if (err) {
        throw err;
    } else {
        console.log('Connection to database successful');
    }
    if (connection) connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
