import 'dotenv/config';
import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, refreshTokens, verifyToken } from '../../common/Token/Token';

const db = require('../server/db');

const SECRET_KEY = process.env.SECRET_KEY
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;


if (!SECRET_KEY) {
  throw new Error('Secret key is not defined in the environment variables2');
}

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('Token secrets are not defined');
}

interface Context {
  user?: { id: string; name: string; email: string }; // Adjust based on your user structure
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

enum TokenType {
  ACCESS,
  REFRESH
}

interface VerifyTokenArgs {
  token: string;
  type: TokenType;
}

interface User {
  UserID: string; // Обновите интерфейс, чтобы использовать id
  name: string;
  gmail: string; // Обновите поле email на gmail
}



export function isAuthResponse(data: any): data is AuthResponse {
  return typeof data === 'object' &&
    data !== null &&
    typeof data.accessToken === 'string' &&
    typeof data.refreshToken === 'string';
}

const resolvers = {
  Query: {
    loginUser: async (_: any, { name, password }: { name: string, password: string }) => {
      const userResult = await db.query('SELECT * FROM "User" WHERE name = $1', [name]);

      if (!userResult.rows.length) {
        throw new Error('Invalid credentials');
      }

      const user = userResult.rows[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error('Invalid credentials');
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      return { accessToken, refreshToken };
    },

    isProtectedQuery: (parent: any, args: any, context: Context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      return true;
    },

    verifyToken: (parent: any, { token, type }: VerifyTokenArgs) => {
      try {
        if (type === TokenType.ACCESS) {
          return verifyToken(token, ACCESS_TOKEN_SECRET)
        } else if (type === TokenType.REFRESH) {
          return verifyToken(token, REFRESH_TOKEN_SECRET)
        }
      } catch (error) {
        return error;
      }
    },

    // Можно оставить для отправки другим людям данных
    checkUserExistence: async (_: any, { name, password }: { name: string, password: string }) => {

      console.error('shema checkUser go1')
      console.error('shema checkUser password' + password)

      if (!password) {
        throw new Error('Either password must be provided.');
      }

      try {
        console.error('shema checkUser go2')
        const result = await db.query('SELECT "UserID" as id, password FROM "User" WHERE name = $1', [name]);
        console.error('shema checkUser result: ' + result)

        if (result.rows.length > 0) {
          console.error('shema checkUser go3')
          const encryptedPassword = result.rows[0].password;
          return await bcrypt.compare(password, encryptedPassword);

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
    registerUser: async (_: any, { name, gmail, password }: { name: string, gmail: string, password: string }) => {
      console.log('registerUser shema start');

      const hashedPassword = await bcrypt.hash(password, 10);
      const encryptedEmail = CryptoJS.AES.encrypt(gmail, SECRET_KEY).toString();

      console.log('hashedPassword ' + hashedPassword);
      console.log('encryptedEmail ' + encryptedEmail);

      const existingUserName = await db.query('SELECT * FROM "User" WHERE name = $1', [name]);
      console.log('Query result:', existingUserName.rows);
      if (existingUserName.rows.length > 0) {
        throw new Error('Name already in use');
      }

      console.log('registerUser middle');

      const existingUserEmail = await db.query('SELECT * FROM "User" WHERE gmail = $1', [encryptedEmail]);
      if (existingUserEmail.rows.length > 0) {
        throw new Error('Email already in use');
      }

      console.log('registerUser Email check good');

      const result = await db.query(
        'INSERT INTO "User" (name, password, gmail) VALUES ($1, $2, $3) RETURNING "UserID" as id, name, password, gmail',
        [name, hashedPassword, encryptedEmail]
      );

      console.log('registerUser creating user good');
      console.log('!!!!!!!!!!!!!!!! registerUser registerUser');
      console.log(result);


      const dbUser = result.rows[0];

      console.log('!!!!!!!!!!!!!!!! registerUser dbUser');
      console.log(dbUser);

      const user: User = {
        UserID: dbUser.id.toString(),
        name: dbUser.name,
        gmail: dbUser.gmail
      };

      console.log('!!!!!!!!!!!!!!!!registerUser user');
      console.log(user);

      const accessToken = generateAccessToken(user);
      console.log('!!!!!!!!!!!!!!!!!!!accessToken:');
      console.log(accessToken);

      const refreshToken = generateRefreshToken(user);
      console.log('!!!!!!!!!!!!!!!!!!!refreshToken:');
      console.log(refreshToken);

      console.log('registerUser finish');

      return { accessToken, refreshToken };
    },

    refreshTokens: async (_: any, { refreshToken }: { refreshToken: string }) => {
      const tokens = await refreshTokens(refreshToken);
      if (!tokens) {
        throw new Error('Failed to refresh tokens');
      }
      return tokens;
    }
  }
};

module.exports = resolvers;