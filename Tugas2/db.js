const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "GRBTBD",
    password: "487733",
    port: "5432",
});

module.exports = pool;
