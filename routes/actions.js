const express = require("express");
const router = express.Router();

const auth = require("../utils/auth");
const upload = require("../utils/uploads/file_upload");

const { cAllActions, cNewAction, cSingleAction, cDeleteAction } = require("../controllers/actions");

router.get("/actions", auth.auth, cAllActions);
router.get("/actions/:id([0-9]+)", auth.auth, cSingleAction);
router.post("/actions", auth.auth, upload.single('avatar'), cNewAction);
router.delete("/actions", auth.auth, express.json(), cDeleteAction);

module.exports = router;