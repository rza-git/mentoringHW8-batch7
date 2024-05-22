// CLASS
const Pool = require("pg").Pool

// Variable
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "product-colors",
    password: "postgres",
    port: 5432
})

module.exports = pool;