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
  // Другие резольверы для Mutation и других операций
};

module.exports = resolvers;