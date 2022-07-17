const express = require("express");
const router = express.Router();

const auth = require("../utils/auth");
const { cSendFile, cDownloadActionImage } = require("../controllers/files");

router.get("/files/:filename", auth.paramAuth, cSendFile);
router.get("/files/dl/:filename", auth.paramAuth, cDownloadActionImage);

module.exports = router;

/* registered with /files prefix */
