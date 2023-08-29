const express = require("express");
const errorControllers = require("../controller/errorControllers");

const router = express.Router();

router.use(errorControllers.get404page);

module.exports = router;
