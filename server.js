const express = require("express");
const cors = require("cors");

// Setup Express
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("website"));

let projectData = {};

// GET Route
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST Route
app.post("/add", (req, res) => {
  projectData = { ...req.body };
  res.send({ status: "success", message: "Data added successfully!" });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
