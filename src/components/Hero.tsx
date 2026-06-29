import { useState, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Gallery images
const GALLERY_IMAGES = [
  "/E5B03B5E-01CB-4F0F-92AA-791F13FCE3A5.png",
  "/EEBDB97F-D225-49E0-B303-4C560FE94057.png",
  "/480bfd45-5dbd-4117-9259-bd9cf8e2e604.png",
  "/956dc984-d8e9-4e2a-835d-dd36cc247fa7.png",
  "/ChatGPT Image Jun 3, 2026, 04_13_30 PM.png",
  "/ChatGPT Image May 28, 2026, 01_14_52 PM.png",
];

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handlePhotoClick = useCallback(() => {
    if (isSpinning || galleryOpen) return;
    setIsSpinning(true);
    // After spin animation completes (1.2s for 4 rotations), open gallery
    setTimeout(() => {
      setIsSpinning(false);
      setGalleryOpen(true);
    }, 1600);
  }, [isSpinning, galleryOpen]);

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImage((i) => (i === 0 ? GALLERY_IMAGES.length - 1 : i - 1));
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImage((i) => (i + 1) % GALLERY_IMAGES.length);
  }, []);

  return (
    <section
      className="hero-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top nav bar */}
      <nav className="hero-nav">
        <a href="#music">MUSIC</a>
        <a href="#about">BIOGRAPHY</a>
        <a href="#merch">STORE</a>
        <a href="#contact">CONTACT</a>
      </nav>

      {/* Main hero content — editorial layout */}
      <div className="hero-content">
        {/* Left side info */}
        <div className="hero-info-left">
          <p className="hero-label">SOUNDCLOUD</p>
          <p className="hero-label">SPOTIFY</p>
          <p className="hero-label">INSTAGRAM</p>
          <div className="hero-genre-block">
            <p className="hero-small-label">{`{genre}`}</p>
            <p className="hero-label">RnB / Neo-Soul</p>
          </div>
        </div>

        {/* Center — artist photo */}
        <div className="hero-center">
          <div
            className={`hero-photo ${isSpinning ? "spinning" : ""}`}
            onClick={handlePhotoClick}
          >
            <img
              src="/E5B03B5E-01CB-4F0F-92AA-791F13FCE3A5.png"
              alt="SEHNYA"
              className="hero-photo-img grayscale-hover"
            />
          </div>
        </div>

        {/* Right side info */}
        <div className="hero-info-right">
          <p className="hero-small-label">{`{occupation}`}</p>
          <p className="hero-label">Singer / Songwriter</p>
          <p className="hero-label">Producer</p>
          <div className="hero-cta">
            <span>LISTEN NOW</span>
            <span className="hero-cta-arrow">↗</span>
          </div>
        </div>
      </div>

      {/* Scrolling artist name — top row */}
      <div className={`hero-marquee-wrapper hero-marquee-top ${isHovered ? "" : "reverse"}`}>
        <div className="hero-marquee">
          <span className="hero-name">SEHNYA</span>
          <span className="hero-name-spacer">·</span>
          <span className="hero-name">SEHNYA</span>
          <span className="hero-name-spacer">·</span>
          <span className="hero-name">SEHNYA</span>
          <span className="hero-name-spacer">·</span>
          <span className="hero-name">SEHNYA</span>
          <span className="hero-name-spacer">·</span>
        </div>
      </div>

      {/* Scrolling artist name — bottom row */}
      <div className={`hero-marquee-wrapper hero-marquee-bottom ${isHovered ? "reverse" : ""}`}>
        <div className="hero-marquee">
          <span className="hero-name">SEHNYA</span>
          <span className="hero-name-spacer">·</span>
          <span className="hero-name">SEHNYA</span>
          <span className="hero-name-spacer">·</span>
          <span className="hero-name">SEHNYA</span>
          <span className="hero-name-spacer">·</span>
          <span className="hero-name">SEHNYA</span>
          <span className="hero-name-spacer">·</span>
        </div>
      </div>

      {/* Bottom info */}
      <div className="hero-bottom">
        <p className="hero-label">where soul bleeds through sound</p>
      </div>

      {/* Gallery overlay */}
      {galleryOpen && (
        <div className="gallery-overlay" onClick={closeGallery}>
          <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button className="gallery-close" onClick={closeGallery} aria-label="Close gallery">
              <X size={24} />
            </button>

            {/* Image */}
            <img
              src={GALLERY_IMAGES[currentImage]}
              alt={`Gallery ${currentImage + 1}`}
              className="gallery-image"
            />

            {/* Navigation */}
            {GALLERY_IMAGES.length > 1 && (
              <>
                <button className="gallery-prev" onClick={prevImage} aria-label="Previous">
                  <ChevronLeft size={28} />
                </button>
                <button className="gallery-next" onClick={nextImage} aria-label="Next">
                  <ChevronRight size={28} />
                </button>
                <div className="gallery-counter">
                  {currentImage + 1} / {GALLERY_IMAGES.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
