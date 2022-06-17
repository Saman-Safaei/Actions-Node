const db = require("../utils/database/database");
const { User } = db.models;

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;

module.exports.sign = (user, expireTime) => {
  return jwt.sign(user, secretKey, { expiresIn: expireTime });
}

module.exports.parse = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return "err";
  }
}

module.exports.headerAuth = async (req, res, next) => {
  const token = req.get("token");

  if (token) {
    // token provided.
    try {
      // parse the token.
      const parsed = jwt.verify(token, secretKey);
      // find user from database.
      const user = await User.findOne({ where: { id: parsed.id } });
      // check user !== null
      if (!user) return res.status(401).json({ message: "Unauthorized - Token not valid." })
      // attach user to req.
      req.user = user;
      // call next function.
      return next();

    } catch (err) {
      // Error to find or parse the token.
      return res.status(401).json({ message: "Unauthorized - Token not valid." });
    }
  }

  res.status(400).json({ message: "Token not provided." });

}

module.exports.paramAuth = async (req, res, next) => {
  const token = req.params.token;

  if (token) {
    // token provided.
    try {
      // parse the token.
      const parsed = jwt.verify(token, secretKey);
      // find user from database.
      const user = await User.findOne({ where: { id: parsed.id } });
      // check user !== null
      if (!user) return res.status(401).json({ message: "Unauthorized - Token not valid." })
      // attach user to req.
      req.user = user;
      // call next function.
      return next();

    } catch (err) {
      // Error to find or parse the token.
      return res.status(401).json({ message: "Unauthorized - Token not valid." });
    }
  }

  res.status(400).json({ message: "Token not provided." });

}
