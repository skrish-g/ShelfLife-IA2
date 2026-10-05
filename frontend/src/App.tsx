import { Link, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Books from "./pages/Books";
import IssueBook from "./pages/IssueBook";
import MemberHistory from "./pages/MemberHistory";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link
            className="navbar-brand"
            to="/books"
          >
            ShelfLife
          </Link>

          <div className="d-flex gap-2">
            <Link
              className="btn btn-outline-light"
              to="/books"
            >
              Books
            </Link>

            <Link
              className="btn btn-outline-light"
              to="/issue"
            >
              Issue Book
            </Link>

            <Link
              className="btn btn-outline-light"
              to="/history"
            >
              History
            </Link>

            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issue"
          element={
            <ProtectedRoute>
              <IssueBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <MemberHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Login />}
        />
      </Routes>
    </>
  );
}