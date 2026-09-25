const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'db_prueba',
  user: 'postgres',
  password: 'admi'
})

module.exports = pool