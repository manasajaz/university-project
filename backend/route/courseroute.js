const express = require("express");
const route = express.Router();
const CourseControler = require("../controler/coursecontroler");
const AuthControler = require("../controler/authcontroler");

// route.get("/", AuthControler.protected, CourseControler.get);

route.get("/", CourseControler.get);

route.get("/:id", CourseControler.getbyid);

route.post("/", CourseControler.add);


route.delete("/:id", CourseControler.del);

module.exports = route;
