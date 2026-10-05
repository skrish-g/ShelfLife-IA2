const express = require("express");
const { issueBook } = require("../controllers/borrowController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/",
  auth,
  validate(["bookId", "memberId", "dueDate"]),
  issueBook
);

module.exports = router;