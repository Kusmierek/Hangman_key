import jwt from 'jsonwebtoken';

const jwtToken = toString(process.env.JWT_TOKEN);

export const loggedIn = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    jwt.verify(token, jwtToken, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.email;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
