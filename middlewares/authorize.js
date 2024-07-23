const authorize = (roles) => {
    return (req, res, next) => {
      console.log(req.userRole);
      const userRole = req.userRole;
      const userId = req.userId;
  
      if (roles.includes('self') && req.params.userId) {
        if (userId === parseInt(req.params.userId)) {
          return next(); 
        }
      }
  
      if (!roles.includes(userRole)) {
        return res.status(403).json({
          status: false,
          message: "Forbidden",
          data: null
        });
      }
  
      next();
    };
  }
  
  module.exports = authorize;
  