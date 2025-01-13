import jwt, { DecodeOptions, JwtPayload, SignOptions } from "jsonwebtoken";
import { JWT_EXPIRY, JWT_TOKEN } from "../config/env.config";

class JWT {
  generateToken = (payload: JwtPayload, options?: SignOptions) => {
    return jwt.sign(payload, JWT_TOKEN, {
      ...options,
      expiresIn: JWT_EXPIRY,
    });
  };

  verifyToken = (token: string, options?: DecodeOptions) => {
    return jwt.verify(token, JWT_TOKEN, {
      ...options,
    }) as JwtPayload;
  };
}

export default JWT;
