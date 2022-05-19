const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.status(200).send("Embreo API");
});

const database = require("./database");
const { eventRouter, userRouter } = require("./routers");
database.connect((err) => {
  if (err) {
    return console.error("error connecting : " + err.stack);
  }
  console.log("Connected as id : ", database.threadId);
});

app.use("/api/events", eventRouter);
app.use("/api/users", userRouter);

const PORT = 2000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
