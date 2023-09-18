const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const db = require("./config/mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware configuration
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// error middleware
app.use(errorHandler);

// Route configuration
app.use("/", require("./routes"));

app.listen(PORT, () => {
	console.log("Server is up and running on port " + PORT);
});
