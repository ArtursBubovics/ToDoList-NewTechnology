import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken } from '../../common/Token/Token';
const db = require('../server/db');

export async function login(req: Request, res: Response) {
  const { name, password } = req.body;

  try {
    const userResult = await db.query('SELECT * FROM "User" WHERE name = $1', [name]);

    if (!userResult.rows.length) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error logging in1:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}