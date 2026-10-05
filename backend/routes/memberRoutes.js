const express = require("express");
const {
  addMember,
  getMembers,
  getMemberHistory,
} = require("../controllers/memberController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/", getMembers);

router.post(
  "/",
  auth,
  validate(["name", "email", "membershipId"]),
  addMember
);

router.get("/:id/history", getMemberHistory);

module.exports = router;