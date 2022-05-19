const util = require("util");
const database = require("../database");

module.exports = {
  asyncQuery: util.promisify(database.execute).bind(database),
  generateQuery: (body) => {
    let q = "";
    const regex = /[A-Z]/g;
    for (let key in body) {
      let value = "";

      if (key.toLowerCase().includes("date"))
        value = `STR_TO_DATE('${body[key]}', '%Y-%m-%d')`;
      else if (
        !key.toLowerCase().includes("date") &&
        typeof body[key] === "string"
      )
        value = `"${body[key]}"`;
      else value = body[key];

      q += `${
        key.match(regex)
          ? key
              .split(/(?=[A-Z])/)
              .map((s) => s.toLowerCase())
              .join("_")
          : key
      } = ${value},`;
    }
    return q.slice(0, -1);
  },
};
