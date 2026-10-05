const express = require("express");
const { login } = require("../controllers/authController");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/login",
  validate(["email", "password"]),
  login
);

module.exports = router;