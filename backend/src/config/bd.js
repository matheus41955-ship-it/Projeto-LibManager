const sql = require('mysql2');

const pool = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: '3310',
    database: 'libmanager'
})

module.exports = pool.promise();