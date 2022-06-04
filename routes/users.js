const express = require("express");
const router = express.Router();

const { cLogin, cRegister } = require("../controllers/users");

router.post("/login", express.json(), cLogin);
router.post("/register", express.json(), cRegister);

module.exports = router;