import jwt from 'jsonwebtoken';

export const generateToken = async (payload, expired) =>
  jwt.sign(payload, process.env.JWT_TOKEN, {
    expiresIn: expired,
  });
