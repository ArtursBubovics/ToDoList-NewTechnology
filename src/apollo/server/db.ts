const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ToDoNewTechnology',
  password: 'admin',
  port: 5432,
});

export default pool;