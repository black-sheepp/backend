const routes = require("express").Router();

routes.get("/",(req,res) => {
    res.send("Welcome Home!");
});
routes.use("/api/user", require("./user"))

module.exports = routes;