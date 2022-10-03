import { sign, verify, SignOptions, Secret } from 'jsonwebtoken';
import 'dotenv/config';

const SECRET: Secret = process.env.JWT_SECRET || 'lumalandia02031226#';

const JWT_CONFIG: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export const createToken = (email: string) => {
  const token = sign(email, SECRET, JWT_CONFIG);

  return { token };
};

export const verifyToken = (authorization: string) => {
  const data = verify(authorization, SECRET);

  return data;
};
