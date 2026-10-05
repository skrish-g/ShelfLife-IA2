export interface Book {
  _id: string;
  title: string;
  author: string;
  ISBN: string;
  genre: string;
  totalCopies: number;
  availableCopies: number;
}

export interface Member {
  _id: string;
  name: string;
  email: string;
  membershipId: string;
  joinedDate: string;
}

export interface BorrowRecord {
  _id: string;
  book: Book;
  member: Member;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  status: "issued" | "returned" | "overdue";
}

export interface BooksResponse {
  books: Book[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}