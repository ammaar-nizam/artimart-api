const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, customer) => {
            if(error)
                res.status(403).json("Token is not valid");
            req.customer = customer;
            next();
        });
    }
    else{
        return res.status(401).json("You are not authenticated.")
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.customer.id === req.params.id || req.customer.isAdmin){
            next();
        }
        else{
            res.status(403).json("You are not the authorized user.");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.customer.isAdmin) {
        next();
      } else {
        res.status(403).json("You do not have admin privileges. Please login as an admin.");
      }
    });
  };

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };