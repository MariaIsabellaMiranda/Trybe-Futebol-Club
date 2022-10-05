import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helper/tokenHelper';
import { StatusCodes } from '../entities/entities';

const validToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.tokenNot)
      .json({ message: 'Token must be a valid token' });
  }

  try {
    const user = verifyToken(authorization);

    req.body.user = user;

    next();
  } catch (err) {
    res.status(StatusCodes.tokenNot).json({ message: 'Token must be a valid token' });
  }
};

export default validToken;
