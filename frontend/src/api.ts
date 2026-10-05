import type {
  BooksResponse,
  BorrowRecord,
  Member,
} from "./types";

const API_URL = "http://localhost:5000/api";

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const login = (email: string, password: string) =>
  request<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const getBooks = () =>
  request<BooksResponse>("/books?page=1&limit=100");

export const getMembers = () =>
  request<Member[]>("/members");

export const issueBook = (
  bookId: string,
  memberId: string,
  dueDate: string
) =>
  request("/borrow", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      bookId,
      memberId,
      dueDate,
    }),
  });

export const getMemberHistory = (memberId: string) =>
  request<BorrowRecord[]>(
    `/members/${memberId}/history`
  );