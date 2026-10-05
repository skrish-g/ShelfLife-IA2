import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { getBooks, getMembers, issueBook } from "../api";
import type { Book, Member } from "../types";

export default function IssueBook() {
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bookData, memberData] = await Promise.all([
          getBooks(),
          getMembers(),
        ]);

        setBooks(bookData.books);
        setMembers(memberData);
      } catch (error) {
        setToast({
          message: (error as Error).message,
          type: "danger",
        });
      } finally {
        setPageLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setToast({ message: "", type: "" });

    try {
      await issueBook(bookId, memberId, dueDate);

      setToast({
        message: "Book issued successfully!",
        type: "success",
      });

      setBookId("");
      setMemberId("");
      setDueDate("");
    } catch (error) {
      setToast({
        message: (error as Error).message,
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="container mt-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Issue Book</h2>

      {toast.message && (
        <div
          className={`alert alert-${toast.type} position-fixed top-0 end-0 m-3 shadow`}
          style={{ zIndex: 1050 }}
        >
          {toast.message}
        </div>
      )}

      <div
        className="card shadow p-4"
        style={{ maxWidth: "600px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Book</label>

            <select
              className="form-select"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            >
              <option value="">Select Book</option>

              {books
                .filter((book) => book.availableCopies > 0)
                .map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title} - {book.availableCopies} available
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Member</label>

            <select
              className="form-select"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
            >
              <option value="">Select Member</option>

              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name} - {member.membershipId}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Due Date</label>

            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Issuing..." : "Issue Book"}
          </button>
        </form>
      </div>
    </div>
  );
}