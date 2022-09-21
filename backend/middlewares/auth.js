import jwt from 'jsonwebtoken';

export const authUser = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ').at(-1);
    if (!token) {
      return res.status(400).json({ message: 'Invalid Authentication' });
    }
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
      if (err) {
        return res.status(400).json({ message: 'Invalid Authentication' });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
