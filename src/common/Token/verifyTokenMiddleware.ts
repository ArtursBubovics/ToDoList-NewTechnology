import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './Token';

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

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH'
}

const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {

  // console.log('Incoming request:', {
  //   method: req.method,
  //   url: req.originalUrl,
  //   headers: req.headers,
  //   body: req.body
  // });

  const excludedOperations = ['RegisterUser', 'LoginUser', 'VerifyToken', 'RefreshTokens', 'CheckUserExistence'];
  if (req.path === '/graphql') {
    return next(); // Пропустить проверку для GraphQL
  }

  if (req.path === '/graphql') {
    const operationName = req.body?.operationName || req.body?.query?.match(/query\s+(\w+)/)?.[1];
    console.log(`Operation Name: ${operationName}`);
    if (operationName && excludedOperations.includes(operationName)) {
      console.log(`Skipping auth for operation: ${operationName}`);
      return next();
    }
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.error('verifyTokenMiddleware error');
    return res.sendStatus(403); // Forbidden
  }

  const token = authHeader.split(' ')[1];

  const decoded = verifyToken(token, TokenType.ACCESS);

  if (!decoded) { //доделать // что идет дальше в client.ts
    return res.sendStatus(401); // Unauthorized  
  }

  req.user = req.user = decoded.user;
  next();
};

export default verifyTokenMiddleware;