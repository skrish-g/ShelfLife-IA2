const express = require("express");
const { returnBook } = require("../controllers/borrowController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/:borrowId", auth, returnBook);

module.exports = router;