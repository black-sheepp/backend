const routes = require("express").Router();
const userCtrlr = require("../controllers/userCtrlr")

routes.post("/register", userCtrlr.registerUser);
routes.post("/login", userCtrlr.loginUser);
routes.get("/logout", userCtrlr.logoutUser);

module.exports = routes;