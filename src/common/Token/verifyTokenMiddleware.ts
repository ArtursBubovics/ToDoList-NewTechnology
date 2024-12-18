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

  const excludedOperations = ['RegisterUser', 'LoginUser','VerifyToken', 'RefreshTokens', 'CheckUserExistence'];

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

  const decoded = verifyToken(token, TokenType.ACCESS);

  if (!decoded) { //доделать // что идет дальше в client.ts
    return res.sendStatus(401); // Unauthorized  
  }

  req.user = req.user = decoded.user;
  next();
};

export default verifyTokenMiddleware;