import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];


  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (err) {
          return res.status(403).json({ status: 403, errors: "token is expaire" });
        } else {
          Object.entries(decoded).forEach(([key, value]) => {
            req[key] = value
          });
          next(); // Only call next here
        }
      });
    } else {
      return res.status(403).json({ status: 403, errors: "token missing"});
    }
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
