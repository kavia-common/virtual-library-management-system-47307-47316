import { mockBooks } from './mockBooks';

/**
 * PUBLIC_INTERFACE
 * Load books from backend if available using environment variables, otherwise use mock data.
 * Uses REACT_APP_API_BASE or REACT_APP_BACKEND_URL as base URL if present.
 */
export async function loadBooks() {
  const apiBase =
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    '';

  // If no API provided, return mock immediately
  if (!apiBase) {
    await delay(200);
    return mockBooks;
  }

  try {
    const res = await fetch(`${apiBase.replace(/\/$/, '')}/books`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('Bad status');
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      return normalizeBooks(data);
    }
    // If API returned empty, fall back
    return mockBooks;
  } catch {
    // On error, fall back to mock
    return mockBooks;
  }
}

function normalizeBooks(items) {
  // Ensure minimal required fields exist
  return items.map((b, idx) => ({
    id: b.id ?? `api-${idx}`,
    title: b.title ?? 'Untitled',
    author: b.author ?? 'Unknown',
    year: b.year ?? '—',
    tags: Array.isArray(b.tags) ? b.tags : [],
    cover:
      b.cover ||
      'https://via.placeholder.com/400x560/eff6ff/1f2937?text=Cover',
    description: b.description || '',
    pages: b.pages,
    publisher: b.publisher,
    isbn: b.isbn,
    language: b.language,
  }));
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
