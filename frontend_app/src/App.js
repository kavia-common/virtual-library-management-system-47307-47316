import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import NavBar from './components/NavBar';
import SideFilter from './components/SideFilter';
import BookGrid from './components/BookGrid';
import BookModal from './components/BookModal';
import { loadBooks } from './data/booksService';

// PUBLIC_INTERFACE
function App() {
  /** Root state for the virtual library app */
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState('');

  // Effect: load books either from backend or fall back to mock data
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    loadBooks()
      .then((data) => {
        if (!ignore) {
          setBooks(data);
          setError('');
        }
      })
      .catch(() => {
        if (!ignore) {
          setError('Failed to load books. Showing local data.');
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  // Derived: filter books by query and tags
  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchesTags =
        selectedTags.length === 0 ||
        (b.tags || []).some((t) => selectedTags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [books, query, selectedTags]);

  return (
    <div className="ocean-app">
      <NavBar query={query} onQueryChange={setQuery} />
      <div className="layout">
        <aside className="sidebar">
          <SideFilter
            books={books}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />
        </aside>
        <main className="content">
          {loading ? (
            <div className="state-card">
              <div className="spinner" aria-label="Loading" />
              <p className="muted">Loading books...</p>
            </div>
          ) : error && books.length === 0 ? (
            <div className="state-card error">
              <p>{error}</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="state-card">
              <p className="muted">No books match your search.</p>
            </div>
          ) : (
            <BookGrid books={filteredBooks} onSelect={setSelectedBook} />
          )}
        </main>
      </div>

      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default App;
