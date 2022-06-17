const express = require("express");
const router = express.Router();

const auth = require("../utils/auth");
const { cSendFile } = require("../controllers/files");

router.get("/files/:token/:filename",auth.paramAuth, cSendFile);

module.exports = router;

/* registered with /files prefix */
