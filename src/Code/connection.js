
const Pool = require('pg').Pool;

const pool = new Pool( {
    user: "postgres",
    password: "hermes",
    host: "104.154.241.26",
    port: 5432,
    database: "postgres"
});

module.exports = pool;


