const express = require("express");
const { addBook, getBooks } = require("../controllers/bookController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/",
  auth,
  validate([
    "title",
    "author",
    "ISBN",
    "genre",
    "totalCopies",
    "availableCopies",
  ]),
  addBook
);

router.get("/", getBooks);

module.exports = router;