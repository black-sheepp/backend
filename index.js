const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const db = require("./config/mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route configuration
app.get("/", (req, res) => {
	res.send("Welcome Home!");
});

app.listen(PORT, () => {
	console.log("Server is up and running on port " + PORT);
});
