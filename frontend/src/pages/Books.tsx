import { useEffect, useState } from "react";
import { getBooks } from "../api";
import type { Book } from "../types";
import DataTable from "../components/DataTable";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data.books);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const genres = [...new Set(books.map((book) => book.genre))];

  const filteredBooks = books.filter((book) => {
    const titleMatches = book.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const genreMatches =
      genre === "" || book.genre === genre;

    return titleMatches && genreMatches;
  });

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Book List</h2>

      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">All Genres</option>

            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DataTable
        data={filteredBooks}
        columns={[
          {
            header: "Title",
            render: (book) => book.title,
          },
          {
            header: "Author",
            render: (book) => book.author,
          },
          {
            header: "ISBN",
            render: (book) => book.ISBN,
          },
          {
            header: "Genre",
            render: (book) => book.genre,
          },
          {
            header: "Available",
            render: (book) =>
              `${book.availableCopies}/${book.totalCopies}`,
          },
        ]}
      />
    </div>
  );
}