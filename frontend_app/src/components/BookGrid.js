import React from 'react';
import BookCard from './BookCard';

/**
 * PUBLIC_INTERFACE
 * Grid view of books as cards.
 */
function BookGrid({ books, onSelect }) {
  return (
    <div className="grid">
      {books.map((b) => (
        <BookCard key={b.id} book={b} onClick={() => onSelect(b)} />
      ))}
    </div>
  );
}

export default BookGrid;
