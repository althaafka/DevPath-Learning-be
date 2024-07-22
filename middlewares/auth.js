const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(403).send({
      status: false,
      message: "No token provided",
      data: null
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: false,
        message: "Unauthorized",
        data: null
      });
    }
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    req.userRole = decoded.role;
    next();
  });
};

module.exports = authenticate;
