const express = require("express");
const commonRoute = express();
const bodyParser = require("body-parser");

commonRoute.use(bodyParser.json());
commonRoute.use(bodyParser.urlencoded({extended: true}));

const commonController = require("../controllers/commonController");

commonRoute.get("/count", commonController.dataCount);

module.exports = commonRoute;
