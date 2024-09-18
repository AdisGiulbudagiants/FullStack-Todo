const Pool = require("pg").Pool

const localConnectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const pool = new Pool({
  connectionString: localConnectionString,
  max: 20,
  maxUses: 7500,
  // ssl: { rejectUnauthorized: false },
})

module.exports = pool
