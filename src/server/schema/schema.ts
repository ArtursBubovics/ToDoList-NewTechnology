const db  = require('../server/db');

const resolvers = {
  Query: {
    // Резольвер для выполнения запроса на получение фильма по ID
    user: async (_: any, { id }: { id: string }) => {
      const result = await db.query('SELECT "UserID" as id, * FROM "User" WHERE "UserID" = $1', [id]);
      return result.rows[0];
    },
    // Резольвер для выполнения запроса на получение всех фильмов
    users: async () => {
      const result = await db.query('SELECT "UserID" as id, * FROM "User"');
      return result.rows;
    }
  },
  Mutation: {
    createUser: async (_: any, { name, password, gmail }: { name: string, password: string, gmail: string }) => {
      const result = await db.query(
        'INSERT INTO "User" (name, password, gmail) VALUES ($1, $2, $3) RETURNING "UserID" as id, name, password, gmail',
        [name, password, gmail]
      );
      return result.rows[0];
    }
  }
};

module.exports = resolvers;