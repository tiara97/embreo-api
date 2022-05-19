const database = require("../database");
const { createToken } = require("../helpers/jwt-helper");
const { asyncQuery, generateQuery } = require("../helpers/query-helper");

module.exports = {
  getUserById: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const q = `SELECT * FROM users WHERE id = ?`;
      const result = await asyncQuery(q, [database.escape(id)]);
      res.status(200).send(result[0]);
    } catch (e) {
      console.error(e.toString());
      res.status(500).send(e);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const q = `SELECT * FROM users WHERE username = ${database.escape(
        username.toLowerCase()
      )} AND password = ${database.escape(password)}`;
      const result = await asyncQuery(q);

      if (!result.length)
        return res.status(400).send("Wrong username or password.");

      const token = createToken({
        id: result[0].id,
        username: result[0].username,
      });
      result[0].token = token;

      res.status(200).send(result[0]);
    } catch (e) {
      console.error(e.toString());
      res.status(500).send(e);
    }
  },
  keepLogin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const q = `SELECT * FROM users WHERE username = ${database.escape(
        username
      )} AND password = ${database.escape(password)}`;
      const result = await asyncQuery(q);
      res.status(200).send(result[0]);
    } catch (e) {
      console.error(e.toString());
      res.status(500).send(e);
    }
  },
};
