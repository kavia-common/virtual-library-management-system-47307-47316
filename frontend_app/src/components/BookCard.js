import React from 'react';

/**
 * PUBLIC_INTERFACE
 * A single book card with cover, title, author, year and tags.
 */
function BookCard({ book, onClick }) {
  const { cover, title, author, year, tags = [] } = book;
  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' ? onClick() : null)}
      style={styles.card}
      aria-label={`Open details for ${title} by ${author}`}
    >
      <div style={styles.coverWrap}>
        <img
          src={cover}
          alt={`${title} cover`}
          style={styles.cover}
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/400x560/eff6ff/1f2937?text=No+Cover';
          }}
        />
      </div>
      <div style={styles.body}>
        <h3 style={styles.title} className="truncate-2">{title}</h3>
        <p style={styles.meta}>
          {author} • <span style={{ color: '#6b7280' }}>{year}</span>
        </p>
        <div style={styles.tags}>
          {tags.slice(0, 3).map((t) => (
            <span className="badge" key={t}>{t}</span>
          ))}
          {tags.length > 3 ? (
            <span className="badge">+{tags.length - 3}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

const styles = {
  card: {
    cursor: 'pointer',
    background: 'var(--ocean-surface)',
    border: '1px solid rgba(17,24,39,0.06)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden',
    transition: 'transform .15s ease, box-shadow .2s ease, border-color .2s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  coverWrap: {
    aspectRatio: '3/4',
    background:
      'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(245,158,11,0.08))',
    overflow: 'hidden',
  },
  cover: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  body: {
    padding: 14,
    display: 'grid',
    gap: 6,
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 800,
    color: 'var(--ocean-text)',
  },
  meta: {
    margin: 0,
    color: '#1f2937',
    fontSize: 13,
    fontWeight: 600,
  },
  tags: {
    marginTop: 6,
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
  },
};

export default BookCard;
