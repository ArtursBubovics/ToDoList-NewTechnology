const jwt = require('jsonwebtoken');
require('dotenv').config();

interface User {
  UserID: string;
  name: string;
  gmail: string;
}

const ACCESS_TOKEN_SECRET = process.env.REACT_APP_ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REACT_APP_REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('Token secrets are not defined');
}

// Функция для генерации токена
export const generateAccessToken = (user: User) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const refreshTokens = async (refreshToken: string): Promise<{ accessToken: string, refreshToken: string } | null> => {
  try {
    const user = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);

    if (!user) {
      throw new Error('Invalid refresh token');
    }

    const newRefreshToken = generateRefreshToken(user);
    const newAccessToken = generateAccessToken(user);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error('Error refreshing refresh token:', error);
    return null;
  }
};

// Функция для проверки токена
export const verifyToken = (token: string, secret: string): User | null => {
  if (!secret) {
    throw new Error('Token secret is not defined');
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};