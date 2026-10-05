import { useEffect, useState } from "react";
import { getMemberHistory, getMembers } from "../api";
import type { BorrowRecord, Member } from "../types";

export default function MemberHistory() {
  const [members, setMembers] = useState<Member[]>([]);
  const [history, setHistory] = useState<BorrowRecord[]>([]);
  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMembers()
      .then(setMembers)
      .catch(console.error);
  }, []);

  const loadHistory = async (id: string) => {
    setMemberId(id);

    if (!id) {
      setHistory([]);
      return;
    }

    setLoading(true);

    try {
      const data = await getMemberHistory(id);
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Member History</h2>

      <select
        className="form-select mb-4"
        value={memberId}
        onChange={(e) => loadHistory(e.target.value)}
      >
        <option value="">Select Member</option>

        {members.map((member) => (
          <option
            key={member._id}
            value={member._id}
          >
            {member.name} - {member.membershipId}
          </option>
        ))}
      </select>

      {loading && <p>Loading history...</p>}

      {!loading && history.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Book</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {history.map((record) => (
                <tr key={record._id}>
                  <td>{record.book.title}</td>

                  <td>
                    {new Date(
                      record.issueDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {new Date(
                      record.dueDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        record.status === "overdue"
                          ? "bg-danger"
                          : record.status === "returned"
                          ? "bg-success"
                          : "bg-primary"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading &&
        memberId &&
        history.length === 0 && (
          <div className="alert alert-info">
            No borrow history found.
          </div>
        )}
    </div>
  );
}