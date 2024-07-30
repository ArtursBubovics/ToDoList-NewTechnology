//рефреш фун не нужна можно просто сделать на прямую к generateAccessToken и generateRefreshToken

import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { generateAccessToken, generateRefreshToken, verifyToken } from './Token';

const router = express.Router();

interface RefreshTokenRequest extends Request {
    body: {
        token: string;
    };
}

router.use(cookieParser());

router.post('/refresh-token', (req: RefreshTokenRequest, res: Response) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken ) return res.sendStatus(403);
  
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!refreshTokenSecret) {
        return res.sendStatus(500);
    }

    let user;
    try {
        user = verifyToken(refreshToken, refreshTokenSecret);
    } catch (error) {

        if (!user) {
            console.error('refresh-token error');
            return res.sendStatus(403); // Forbidden
        }

        // Если не удалось верифицировать токен (например, истек или недействителен), то генерируем новый refresh и access токены
        const newRefreshToken = generateRefreshToken(user); // Создаем новый refresh token
        const newAccessToken = generateAccessToken(user); // Создаем новый access token

        // Устанавливаем новые токены в куках (пример для cookie-parser)
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });
        res.json({ accessToken: newAccessToken });

        return;
    }
});

module.exports = router;