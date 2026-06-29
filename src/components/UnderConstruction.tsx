interface UnderConstructionProps {
  page: string;
}

export default function UnderConstruction({ page }: UnderConstructionProps) {
  return (
    <section className="construction-section">
      <div className="construction-content">
        <div className="construction-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h2 className="construction-title">{page}</h2>
        <p className="construction-subtitle">Under Construction</p>
        <p className="construction-text">
          This page is being built. Check back soon.
        </p>
        <a href="#" className="construction-back" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          ← Back to top
        </a>
      </div>
    </section>
  );
}
