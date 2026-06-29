export default function Biography() {
  return (
    <section id="about" className="bio-section">
      {/* Top section — intro with photo grid */}
      <div className="bio-top">
        <div className="bio-top-text">
          <p className="bio-eyebrow">Artist</p>
          <h2 className="bio-artist-name">SEHNYA</h2>
          <p className="bio-intro">
            SEHNYA is an independent R&B and soul artist who writes from the place where private truth and public performance collide. The name — a Mende word meaning "prayerful woman" — sets the terms for the work: songs that treat surrender as an active practice rather than a soft landing.
          </p>
          <a href="#music" className="bio-learn-more">LISTEN NOW</a>
        </div>

        <div className="bio-top-photos">
          <div className="bio-photo-main grayscale-hover">
            <img src="/E5B03B5E-01CB-4F0F-92AA-791F13FCE3A5.png" alt="SEHNYA" />
          </div>
          <div className="bio-photo-secondary grayscale-hover">
            <img src="/EEBDB97F-D225-49E0-B303-4C560FE94057.png" alt="SEHNYA" />
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="bio-tabs">
        <span className="bio-tab active">Discography</span>
        <span className="bio-tab">Performances</span>
        <span className="bio-tab">About</span>
        <span className="bio-tab">Press</span>
      </div>

      {/* Journey section — text left, photos right, vertical name */}
      <div className="bio-journey">
        <div className="bio-journey-text">
          <p className="bio-eyebrow">About SEHNYA</p>
          <h3 className="bio-journey-title">THE JOURNEY OF<br />SEHNYA</h3>

          <p className="bio-body">
            She came to songwriting in 2026 and built fast, on her own terms. Working out of a home studio and tracking every part herself, she owns her masters and releases independently. Her debut single, <strong>"BLĪNDED,"</strong> marked the start of a catalog being made deliberately, without features and without compromise.
          </p>

          <p className="bio-body">
            Her current project, <em>Transparency</em>, is a solo album in the truest sense — no collaborators, no hiding. It's a turn toward the raw after an earlier, more elaborate concept was set aside. Songs like <strong>"Frequency,"</strong> which maps communication breakdown onto the static of a radio transmission, sit alongside writing about generational inheritance, the distance between looking well and being well, and the cost of telling the truth out loud.
          </p>

          <p className="bio-body">
            Her ear is shaped by <strong>Yebba, Jazmine Sullivan, SZA, Ari Lennox, H.E.R., Sasha Keable,</strong> and <strong>Summer Walker</strong> — singers who treat vocal specificity as meaning, not decoration. SEHNYA writes toward that standard: emotional weight carried in the particular, melodies that earn their restraint, a sound grounded in self-knowledge before anyone else is invited in.
          </p>
        </div>

        <div className="bio-journey-media">
          <div className="bio-journey-photos">
            <div className="bio-photo-grid-item grayscale-hover">
              <img src="/480bfd45-5dbd-4117-9259-bd9cf8e2e604.png" alt="SEHNYA" />
            </div>
            <div className="bio-photo-grid-item grayscale-hover">
              <img src="/956dc984-d8e9-4e2a-835d-dd36cc247fa7.png" alt="SEHNYA" />
            </div>
          </div>
          {/* Vertical name — like the reference */}
          <div className="bio-vertical-name">
            <span>S</span><span>E</span><span>H</span><span>N</span><span>Y</span><span>A</span>
          </div>
        </div>
      </div>

      {/* Bottom details bar */}
      <div className="bio-footer">
        <div className="bio-footer-item">
          <span className="bio-footer-label">Genre</span>
          <span className="bio-footer-value">R&B / Neo-Soul</span>
        </div>
        <div className="bio-footer-item">
          <span className="bio-footer-label">Status</span>
          <span className="bio-footer-value">Independent</span>
        </div>
        <div className="bio-footer-item">
          <span className="bio-footer-label">Active</span>
          <span className="bio-footer-value">2026–Present</span>
        </div>
        <div className="bio-footer-item">
          <span className="bio-footer-label">Debut Single</span>
          <span className="bio-footer-value">BLĪNDED</span>
        </div>
      </div>
    </section>
  );
}
