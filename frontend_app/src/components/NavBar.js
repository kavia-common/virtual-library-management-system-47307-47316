import React from 'react';

/**
 * PUBLIC_INTERFACE
 * A top navigation bar with app title and search input.
 */
function NavBar({ query, onQueryChange }) {
  return (
    <nav style={styles.wrapper} aria-label="Top Navigation">
      <div style={styles.inner}>
        <div style={styles.brand}>
          <div style={styles.logo}>📚</div>
          <div>
            <div style={styles.title}>Virtual Library</div>
            <div style={styles.subtitle}>Ocean Professional</div>
          </div>
        </div>
        <div style={styles.search}>
          <input
            className="input"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by title, author, or tag..."
            aria-label="Search books"
          />
        </div>
      </div>
    </nav>
  );
}

const styles = {
  wrapper: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.75))',
    backdropFilter: 'saturate(160%) blur(6px)',
    borderBottom: '1px solid rgba(17,24,39,0.06)',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    minWidth: 260,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    display: 'grid',
    placeItems: 'center',
    fontSize: 20,
    background:
      'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(245,158,11,0.12))',
    border: '1px solid rgba(17,24,39,0.06)',
  },
  title: {
    fontWeight: 800,
    fontSize: 18,
    color: 'var(--ocean-text)',
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  search: {
    marginLeft: 'auto',
    width: 'min(640px, 60%)',
  },
};

export default NavBar;
