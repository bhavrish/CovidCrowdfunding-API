const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, "asdhfoaiuf983y23rhiahilfhlf"); // check if jwt is valid
        req.userData = decoded;
        if (req.params.userId === decoded.userId) // check if userID route someone is accessing matches their own user id (masked in jwt)
            next();
        else {
            return res.status(401).json({
                message: 'Action not authorized'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Authorization failed'
        });
    }
};