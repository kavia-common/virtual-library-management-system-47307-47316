import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Modal to display book details with description and metadata.
 */
function BookModal({ book, onClose }) {
  if (!book) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <strong style={{ fontWeight: 800 }}>{book.title}</strong>
          <button className="btn btn-ghost" onClick={onClose} aria-label="Close details">Close</button>
        </div>
        <div className="modal-body">
          <div style={styles.row}>
            <div style={styles.coverCol}>
              <img
                src={book.cover}
                alt={`${book.title} cover`}
                style={styles.cover}
                onError={(e) => {
                  e.currentTarget.src =
                    'https://via.placeholder.com/400x560/eff6ff/1f2937?text=No+Cover';
                }}
              />
            </div>
            <div style={styles.bodyCol}>
              <div className="kicker" style={{ marginBottom: 8 }}>Details</div>
              <div style={styles.metaGrid}>
                <Meta label="Author" value={book.author} />
                <Meta label="Year" value={book.year} />
                <Meta label="Publisher" value={book.publisher || '—'} />
                <Meta label="Pages" value={book.pages ? String(book.pages) : '—'} />
                <Meta label="ISBN" value={book.isbn || '—'} />
                <Meta label="Language" value={book.language || '—'} />
              </div>

              <div style={{ height: 12 }} />

              <div className="kicker" style={{ marginBottom: 8 }}>Tags</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(book.tags || []).map((t) => (
                  <span className="badge" key={t}>{t}</span>
                ))}
              </div>

              <div style={{ height: 16 }} />

              <div className="kicker" style={{ marginBottom: 8 }}>Description</div>
              <p style={{ marginTop: 0, lineHeight: 1.6 }}>
                {book.description || 'No description available.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div style={styles.metaItem}>
      <div className="kicker">{label}</div>
      <div style={{ fontWeight: 700, color: 'var(--ocean-text)' }}>{value}</div>
    </div>
  );
}

const styles = {
  row: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: 20,
  },
  coverCol: {
    background: 'linear-gradient(135deg, rgba(37,99,235,0.06), rgba(245,158,11,0.06))',
    borderRadius: 12,
    border: '1px solid rgba(17,24,39,0.06)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
    height: 'fit-content',
  },
  cover: {
    width: '100%',
    display: 'block',
    objectFit: 'cover',
  },
  bodyCol: {
    minWidth: 0,
  },
  metaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 12,
  },
  metaItem: {
    background: 'var(--ocean-surface)',
    border: '1px solid rgba(17,24,39,0.06)',
    borderRadius: 10,
    padding: 10,
  },
};

export default BookModal;
