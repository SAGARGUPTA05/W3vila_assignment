const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/userController");

router.post("/signup", signup);//signup
router.post("/login", login); //login

module.exports = router;
