const express = require("express");
const router = express.Router();
const { getDrones } = require("./drones.controller");

router.get("/", getDrones);

module.exports = router;