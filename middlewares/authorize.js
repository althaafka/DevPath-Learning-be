const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
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