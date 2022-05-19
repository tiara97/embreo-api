const database = require("../database");
const { asyncQuery, generateQuery } = require("../helpers/query-helper");

module.exports = {
  getEvents: async (req, res) => {
    const id = parseInt(req.params.id);
    const { type } = req.body;
    try {
      const qClient = `SELECT events.* FROM events
      INNER JOIN users
      ON events.company = users.company
      WHERE users.id = ?`;
      const qVendor = `SELECT events.* FROM events
      INNER JOIN users
      ON events.vendor = users.company
      WHERE users.id = ?`;
      const result = await asyncQuery(type === "Client" ? qClient : qVendor, [
        database.escape(id),
      ]);
      res.status(200).send(result);
    } catch (e) {
      console.error(e.toString());
      res.status(500).send(e);
    }
  },
  postEvent: async (req, res) => {
    const { companyName, vendorName, eventName, proposedDate, location } =
      req.body;
    try {
      const q = `INSERT INTO events (created, company, vendor, event_name, proposed_date, location, status) 
            VALUES (NOW(), ?, ?, ?, ?, ?, 2);`;
      const result = await asyncQuery(q, [
        companyName,
        vendorName,
        eventName,
        JSON.stringify(proposedDate),
        location,
      ]);
      res.status(200).send(result[0]);
    } catch (e) {
      console.error(e.toString());
      res.status(500).send(e);
    }
  },
  patchEventById: async (req, res) => {
    const query = generateQuery(req.body);
    const id = parseInt(req.params.id);
    try {
      const q = `UPDATE events SET ${query} 
                WHERE id = ?;`;
      const result = await asyncQuery(q, [database.escape(id)]);
      res.status(200).send(result[0]);
    } catch (e) {
      console.error(e.toString());
      res.status(500).send(e);
    }
  },
};
