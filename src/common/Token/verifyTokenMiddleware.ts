import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { verifyToken } from './Token';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'youraccesstokensecret';

interface UserPayload {
  UserID: string;
  name: string;
  gmail: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {

  console.log('Incoming request:', {
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body
  });

  const excludedOperations = ['RegisterUser', 'LoginUser'];

  if (req.path === '/graphql' && req.body.operationName && excludedOperations.includes(req.body.operationName)) {
    console.log(`Excluding operation: ${req.body.operationName}`);
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error('verifyTokenMiddleware error');
    return res.sendStatus(403); // Forbidden
  }

  const token = authHeader.split(' ')[1];

  const decoded = verifyToken(token, ACCESS_TOKEN_SECRET);

  if (!decoded) { //доделать // что идет дальше в client.ts
    return res.sendStatus(401); // Unauthorized  
  }

  req.user = decoded as UserPayload;
  next();
};