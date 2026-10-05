const Member = require("../models/Member");
const BorrowRecord = require("../models/BorrowRecord");

const addMember = async (req, res, next) => {
  try {
    const member = await Member.create(req.body);

    res.status(201).json(member);
  } catch (error) {
    next(error);
  }
};

const getMembers = async (req, res, next) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    next(error);
  }
};

const getMemberHistory = async (req, res, next) => {
  try {
    const history = await BorrowRecord.find({
      member: req.params.id,
    })
      .populate("book")
      .populate("member")
      .sort({ issueDate: -1 });

    const today = new Date();

    const updatedHistory = history.map((record) => {
      const item = record.toObject();

      if (
        item.status === "issued" &&
        new Date(item.dueDate) < today
      ) {
        item.status = "overdue";
      }

      return item;
    });

    res.json(updatedHistory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMember,
  getMembers,
  getMemberHistory,
};