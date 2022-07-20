const express = require("express");
const router = express.Router();

const auth = require("../utils/auth");
const upload = require("../utils/uploads/file_upload");

const {
  cAllActions,
  cNewAction,
  cSingleAction,
  cDeleteAction,
  cEditAction,
} = require("../controllers/actions");

router.get("/actions", auth.headerAuth, cAllActions);
router.get("/actions/:id([0-9]+)", auth.headerAuth, cSingleAction);
router.post("/actions", auth.headerAuth, upload.single("avatar"), cNewAction);
router.post("/actions/edit", express.json(), auth.headerAuth, cEditAction);
router.delete("/actions", auth.headerAuth, express.json(), cDeleteAction);

module.exports = router;
