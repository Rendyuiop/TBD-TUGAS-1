const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Tugas1",
    password: "487733",
    port: "5432",
});

module.exports = pool;
