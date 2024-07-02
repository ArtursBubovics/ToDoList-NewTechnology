import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';
const { secretKey } = require('../../settingsNodeJS');
const db = require('../server/db');

const resolvers = {
  Query: {
    // Резольвер для выполнения запроса на получение фильма по ID
    user: async (_: any, { gmail }: { gmail: string }) => {
      const result = await db.query('SELECT "UserID" as id, * FROM "User" WHERE gmail = $1', [gmail]);
      return result.rows[0];
    },
    // Резольвер для выполнения запроса на получение всех фильмов
    users: async () => {
      const result = await db.query('SELECT "UserID" as id, * FROM "User"');
      return result.rows;
    },
    checkUser: async (_: any, { name, gmail, password }: { name: string, gmail?: string, password?: string }) => {

      if (!gmail && !password) {
        throw new Error('Either gmail or password must be provided.');
      }

      try {
        const result = await db.query('SELECT "UserID" as id, gmail, password FROM "User" WHERE name = $1', [name]);

        if (result.rows.length > 0) {

          if (gmail) {
            const encryptedGmail = result.rows[0].gmail;
            const decryptedGmail = CryptoJS.AES.decrypt(encryptedGmail, secretKey).toString(CryptoJS.enc.Utf8);
            return decryptedGmail === gmail;
          }

          if (password) {
            const encryptedPassword = result.rows[0].password;
            return await bcrypt.compare(password, encryptedPassword);
          }

        } else {
          return false;
        }
      } catch (error) {
        console.error('Error checking user:', error);
        return false;
      }
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