const express = require("express");
const route = express.Router();
const AuthControler = require("../controler/authcontroler");



route.post("/login", AuthControler.login);

route.post("/signup", AuthControler.signup);





module.exports = route;