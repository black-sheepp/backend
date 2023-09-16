const routes = require("express").Router();
const userCtrlr = require("../controllers/userCtrlr")

routes.post("/register", userCtrlr.registerUser);

module.exports = routes;