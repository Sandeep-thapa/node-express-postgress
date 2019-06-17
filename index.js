const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (request, response) => {
  response.json({info: "An intro to using express, node and postgress."});
});

app.listen(port, () => {
  console.log("Server running succesfully");
});
