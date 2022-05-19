const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

module.exports = {
  createToken: (data) => {
    return jwt.sign(data, TOKEN_KEY, { expiresIn: "1h" });
  },
  verify: (req, res, next) => {
    const token = req.body.token;
    try {
      if (!token) return res.status(400).send("No token!");
      const res = jwt.verify(token, TOKEN_KEY);
      req.data = res;
      next();
    } catch (e) {
      console.error(e.toString());
      res.status(500).send(e);
    }
  },
};
