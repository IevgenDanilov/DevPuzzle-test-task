const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("hello Yevhen");
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  let token = req.body.token;
  console.log(token);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
