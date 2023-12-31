const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log(authorization);
  let token = null;

  if (authorization && authorization.split(" ").length === 2) {
    token = authorization.split(" ")[1];
  } else {
    res.status(400).json("Invalid Token");
    return;
  }

  try {
    const decoded = jwt.verify(token, "secret key");

    if (decoded.exp < Date.now()) {
      res.status(400).json({ message: "JWT has expired" });
      return;
    }
    req.email = decoded.email;
    next();
  } catch (e) {
    res.status(500).json({ message: "Internal error" });
  }
};
