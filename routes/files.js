const express = require("express");
const router = express.Router();

const { cSendFile } = require("../controllers/files");

router.get("/:filename", cSendFile);

module.exports = router;

/* registered with /files prefix */
