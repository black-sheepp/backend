const routes = require("express").Router();
const userCtrlr = require("../controllers/userCtrlr")
const checkAuth = require('../middleware/authMiddleware')

routes.post("/register", userCtrlr.registerUser);
routes.post("/login", userCtrlr.loginUser);
routes.get("/logout", userCtrlr.logoutUser);
routes.get("/getuser", checkAuth.protect, userCtrlr.getUser)
routes.get("/session", userCtrlr.session)
routes.patch("/update-user", checkAuth.protect, userCtrlr.updateUser)
routes.patch("/change-password", checkAuth.protect, userCtrlr.changePassword)

module.exports = routes;