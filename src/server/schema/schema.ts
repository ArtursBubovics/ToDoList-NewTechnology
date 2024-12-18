import 'dotenv/config';
import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, refreshTokens, verifyToken } from '../../common/Token/Token';

const db = require('../server/db');

const SECRET_KEY = process.env.SECRET_KEY


if (!SECRET_KEY) {
  throw new Error('Secret key is not defined in the environment variables2');
}

interface Context {
  user?: { id: string; name: string; email: string }; // Adjust based on your user structure
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH'
}

interface VerifyTokenArgs {
  token: string;
  type: TokenType;
}

interface User {
  UserID: string;
  name: string;
  gmail: string;
}

interface Context {
  user?: {
    id: string;
    name: string;
    email: string;
  };
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
      try {
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
      } catch (error) {
        console.error('Error loginUser:', error);
      }

    },

    isProtectedQuery: (parent: any, args: any, context: Context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      return true;
    },

    verifyToken: (parent: any, { token, type }: VerifyTokenArgs) => {
      try {
        let result = verifyToken(token, type)

        if (!result) {
          throw new Error('result is null');
        }

        if (result) {
          console.log('verifyToken shema value:')
          console.log(result)
          return { valid: true, message: "Token is valid", user: result };
        } else {
          return { valid: false, message: "Token is invalid or expired", user: null };
        }
      } catch (error: unknown) {
        console.error('Error verifying token:', error instanceof Error ? error.message : error);
        return { valid: false, message: "Error verifying token", user: null };
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
    },

    passwordValidation: async (_: any, { UserID, currentPassword }: { UserID: number, currentPassword: string }) => {
      console.log('Schema passwordValidation UserID: ', UserID);

      if (!currentPassword) {
        throw new Error('Either password must be provided.');
      }

      try {
        console.error('shema passwordValidation go2')

        const result = await db.query('SELECT "UserID", password FROM "User" WHERE "UserID" = $1', [UserID]);
        console.log('Schema passwordValidation result: ', result);
        console.log('passwordValidation result.rows.length: ', result.rows.length);

        if (result.rows.length > 0) {
          const user = result.rows[0];
          const hashedPassword = user.password;

          const isPasswordValid = await bcrypt.compare(currentPassword, hashedPassword);

          if (isPasswordValid) {
            console.error('Schema passwordValidation go3');
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error checking user:', error);
        return false;
      }
    },

    refreshTokens: async (_: any, { refreshToken }: { refreshToken: string }) => {
      const tokens = await refreshTokens(refreshToken);
      if (!tokens) {
        throw new Error('Failed to refresh tokens');
      }
      return tokens;
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

    updateUserInfo: async (_: any, { UserID, name, gmail, password }: { UserID: number, name: string, gmail: string, password: string }) => {
      if (!UserID && !name && !gmail && !password) {
        throw new Error('updateUserInfo data can not to be null or underfind');
      }

      console.error('UserID, , name, gmail, password')
      console.error(UserID, name, gmail, password)

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const encryptedEmail = CryptoJS.AES.encrypt(gmail, SECRET_KEY).toString();

        const result = await db.query('UPDATE "User" SET "name" = $2, "gmail" = $3, "password" = $4 WHERE "UserID" = $1', [UserID, name, encryptedEmail, hashedPassword]);

        if (result.rowCount === 0) {
          throw new Error('User not found or no changes made.');
        }

        console.log('User updated successfully.');
        return { success: true, message: 'User updated successfully' };

      } catch (error) {
        console.error('Error updating user info:', error);

        return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
      }
    }
  }
};

module.exports = resolvers;