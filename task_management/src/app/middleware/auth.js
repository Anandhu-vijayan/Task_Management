import { verifyAccessToken } from '../lib/jwt.js';

export const requireAuth = (handler, roles = []) => {
  return async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const decoded = verifyAccessToken(token);
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = decoded;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
