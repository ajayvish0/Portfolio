import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books",
  description: "Books that have shaped my thinking on engineering and life.",
  alternates: { canonical: "/books" },
};

interface Book {
  title: string;
  author: string;
}

interface Section {
  id: string;
  title: string;
  intro?: string;
  books: Book[];
  /** The one line that lists several authors' collected works together. */
  extraLine?: React.ReactNode;
}

// Placeholder sections. Replace the titles and authors with real reads.
const SECTIONS: Section[] = [
  {
    id: "influences",
    title: "Influences",
    intro: "Books that changed how I see the world:",
    books: [
      { title: "Placeholder Book 1", author: "Author" },
      { title: "Placeholder Book 2", author: "Author" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    books: [
      { title: "Placeholder Book 3", author: "Author" },
      { title: "Placeholder Book 4", author: "Author" },
    ],
  },
  {
    id: "to-read",
    title: "To Read",
    intro: "Recommendations I haven't gotten to yet:",
    books: [{ title: "Placeholder Book 5", author: "Author" }],
  },
];

export default function BooksPage() {
  return (
    <div className="max-w-none py-10">
      <h1 id="books" className="text-[2em] font-normal leading-[1.3] text-foreground/70 mb-8">
        Books
      </h1>

      {SECTIONS.map((section, i) => (
        <section key={section.id} className={i > 0 ? "mt-10" : undefined}>
          <h2
            id={section.id}
            className="text-[1.5625em] font-light tracking-[-0.01em] text-foreground mb-3"
          >
            {section.title}
          </h2>
          {section.intro && (
            <p className="text-foreground/65 leading-relaxed mb-3">{section.intro}</p>
          )}
          <ul className="list-disc ml-5 space-y-1.5 text-foreground/80 leading-relaxed">
            {section.books.map((book) => (
              <li key={book.title}>
                <strong className="font-medium text-foreground">{book.title}</strong> -{" "}
                {book.author}
              </li>
            ))}
            {section.extraLine && <li>{section.extraLine}</li>}
          </ul>
          {i < SECTIONS.length - 1 && <hr className="border-border mt-10" />}
        </section>
      ))}

      <div className="mt-16 pt-6 border-t border-border font-mono text-sm">
        <a href="#books" className="text-primary hover:underline">
          ↑ Back to top
        </a>
        <div className="mt-4">
          <Link href="/user-manual" className="text-primary hover:underline">
            ← Previous: User Manual
          </Link>
        </div>
      </div>
    </div>
  );
}
