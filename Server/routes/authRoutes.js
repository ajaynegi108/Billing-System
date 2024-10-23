const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// Define your auth routes here
router.post("/login", login);
router.post("/register", signup);

module.exports = router;
