const { Pool } = require('pg');

const dbPostgre = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ToDoNewTechnology',
    password: 'admin',
    port: 5432,
  });

  module.exports = dbPostgre;