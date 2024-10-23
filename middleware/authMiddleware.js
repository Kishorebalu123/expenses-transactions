const jwt = require("jsonwebtoken");

let jwtToken;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
   jwtToken = authHeader && authHeader.split(' ')[1];

  if (!jwtToken) return res.status(401).json({ error: "Token required" });

  jwt.verify(jwtToken, "MY_SECRET_TOKEN", (err, payload) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = {userId:payload.id};
   
    next();
   
  });
};

module.exports = authenticateToken;
