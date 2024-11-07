const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forget,
  resetPassword,
} = require("../controllers/authController");

// Define your auth routes here
router.post("/login", login);
router.post("/register", signup);
router.post("/forget", forget);
router.post("/reset", resetPassword);

module.exports = router;
