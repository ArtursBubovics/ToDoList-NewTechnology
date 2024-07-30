import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { generateAccessToken, generateRefreshToken } from '../../common/Token/Token';
const db = require('../server/db');

export async function register(req: Request, res: Response) {

  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY

  if (!SECRET_KEY) {
    return res.status(500).json({ message: 'Secret key is not defined in the environment variables1' });
  }

  const { name, email, password } = req.body;

  try {
    console.log('registration route started')

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Шифруем email
    const encryptedEmail = CryptoJS.AES.encrypt(email, SECRET_KEY).toString();

    // Проверяем, существует ли уже пользователь с таким именем
    const existingUserName = await db.query('SELECT * FROM "User" WHERE name = $1', [name]);
    if (existingUserName.rows.length > 0) {
      return res.status(400).json({ message: 'Name already in use' });
    }

    // Проверяем, существует ли уже пользователь с таким email
    const existingUserEmail = await db.query('SELECT * FROM "User" WHERE email = $1', [encryptedEmail]);
    if (existingUserEmail.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Вставляем нового пользователя в базу данных
    const result = await db.query(
      'INSERT INTO "User" (name, password, email) VALUES ($1, $2, $3) RETURNING "UserID" as id, name, password, email',
      [name, hashedPassword, encryptedEmail]
    );

    const user = result.rows[0];

    // Генерируем токены
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}