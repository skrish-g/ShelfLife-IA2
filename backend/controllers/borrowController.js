const Book = require("../models/Book");
const Member = require("../models/Member");
const BorrowRecord = require("../models/BorrowRecord");

const issueBook = async (req, res, next) => {
  try {
    const { bookId, memberId, dueDate } = req.body;

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Atomic update: only decrement if a copy is available.
    const book = await Book.findOneAndUpdate(
      {
        _id: bookId,
        availableCopies: { $gt: 0 },
      },
      {
        $inc: { availableCopies: -1 },
      },
      { new: true }
    );

    if (!book) {
      return res.status(400).json({
        message: "Book not found or no copies available",
      });
    }

    const record = await BorrowRecord.create({
      book: bookId,
      member: memberId,
      dueDate,
      status: "issued",
    });

    res.status(201).json({
      message: "Book issued successfully",
      record,
      book,
    });
  } catch (error) {
    next(error);
  }
};

const returnBook = async (req, res, next) => {
  try {
    const record = await BorrowRecord.findOneAndUpdate(
      {
        _id: req.params.borrowId,
        status: { $in: ["issued", "overdue"] },
      },
      {
        $set: {
          returnDate: new Date(),
          status: "returned",
        },
      },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({
        message: "Borrow record not found or already returned",
      });
    }

    await Book.findByIdAndUpdate(record.book, {
      $inc: { availableCopies: 1 },
    });

    res.json({
      message: "Book returned successfully",
      record,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { issueBook, returnBook };