import jwt from 'jsonwebtoken'
import { IJwtPayload } from '../types/jwt-types';


const secret = process.env.JWT_SECRET || "secret";


export function generateJWT(payload: IJwtPayload) {
  return jwt.sign(payload, secret, { expiresIn: '1h' })
}


export const verifyToken = (token: string) => {
  return jwt.verify(token, secret)
}