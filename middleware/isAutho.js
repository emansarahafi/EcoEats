const isAutho = (allowedRoles) => {
    return (req, res, next) => {
        if (req.user && allowedRoles.includes(req.user.role)) { 
            next();
        } else {
            res.status(403).json({ msg: "Access forbidden - Insufficient privileges"
            });
        }
    }; 
};
module.exports = isAutho;