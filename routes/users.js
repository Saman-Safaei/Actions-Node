const express = require("express");
const router = express.Router();

const { cLogin, cRegister, cAuth } = require("../controllers/users");

router.post("/login", express.json(), cLogin);
router.post("/register", express.json(), cRegister);
router.get("/auth", cAuth);

module.exports = router;
