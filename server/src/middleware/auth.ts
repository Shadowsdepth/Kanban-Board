import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   // TODO: verify the token exists and add the user data to the request object
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   console.log('token', token);
//   if (!token) {
//     return res.sendStatus(401);
//   }
//   jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.user = user as JwtPayload;
//     return next();
//   });
//   return res.status(401).json({ error: 'Unauthorized' });
// };

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};