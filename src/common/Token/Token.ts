const jwt = require('jsonwebtoken');
require('dotenv').config();

interface User {
  UserID: string;
  name: string;
  gmail: string;
}

interface TokenStatus {
  user: User;
  iat: number;
  exp: number;
}

enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH'
}

const ACCESS_TOKEN_SECRET = process.env.REACT_APP_ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REACT_APP_REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('Token secrets are not defined');
}

// Функция для генерации токена
export const generateAccessToken = (user: User) => {
  const token = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  console.log('Generated Access Token:', token); // Логирование токена
  return token;
};

export const generateRefreshToken = (user: User) => {
  const token = jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  console.log('Generated Refresh Token:', token); // Логирование токена
  return token;
};

export const refreshTokens = async (refreshToken: string): Promise<{ accessToken: string, refreshToken: string } | null> => {
  try {
    const data = verifyToken(refreshToken, TokenType.REFRESH); // ихменить логику //получить ответ работает ли токен, потом получить данные из бд их передать на генерацию

    if (!data) {
      throw new Error('Invalid refresh token');
    }

    const newAccessToken = generateAccessToken(data.user);
    const newRefreshToken = generateRefreshToken(data.user);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error('Error refreshing refresh token:', error);
    return null;
  }
};

// Функция для проверки токена
export const verifyToken = (token: string, type: TokenType): TokenStatus | null => {
  try {
    let decoded;
    if (type === TokenType.ACCESS) {
      decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    } else if (type === TokenType.REFRESH) {
      decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    }
    console.log('Decoded Token:', decoded); // Логирование декодированного токена
    return decoded
  } catch (error: unknown) {

    if (error instanceof Error) {
      if (error.message === 'TokenExpiredError') {
        console.error('Token expired');
      }
      console.error('Token verification failed:', error); // Логирование ошибки
    } else {
      console.error('Unknown error during token verification');
    }

    return null
  }
};