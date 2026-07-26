import BookPage from "./BookPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Solvara Technologies",
  description: "Schedule a free 30-minute consultation with the Solvara team. No commitment, no pressure — just an honest conversation about your project.",
};

export default function Page() {
  return <BookPage />;
}