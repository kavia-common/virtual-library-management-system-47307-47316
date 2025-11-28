import React, { useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * Sidebar filter for selecting tags (client-side).
 */
function SideFilter({ books, selectedTags, onChange }) {
  const allTags = useMemo(() => {
    const set = new Set();
    books.forEach((b) => (b.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [books]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <div>
      <div className="kicker" style={{ marginBottom: 8 }}>Filters</div>
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>Tags</span>
          <button
            className="btn btn-ghost"
            onClick={() => onChange([])}
            aria-label="Clear selected tags"
            title="Clear"
          >
            Clear
          </button>
        </div>
        {allTags.length === 0 ? (
          <p className="muted" style={{ margin: 0 }}>No tags available.</p>
        ) : (
          <div style={styles.tagWrap}>
            {allTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="badge"
                  style={{
                    border: active ? '1px solid rgba(37,99,235,0.35)' : '1px solid transparent',
                    background: active ? 'rgba(37,99,235,0.15)' : 'rgba(37,99,235,0.08)',
                  }}
                  aria-pressed={active}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  section: {
    background: 'linear-gradient(180deg, rgba(37,99,235,0.04), rgba(255,255,255,0.6))',
    border: '1px solid rgba(17,24,39,0.06)',
    borderRadius: '12px',
    padding: 12,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: 700,
    color: 'var(--ocean-text)',
  },
  tagWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
};

export default SideFilter;
