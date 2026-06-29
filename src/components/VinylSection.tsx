import { useState, useCallback } from "react";
import { TRACKS } from "./MusicPlayer";
import type { Track } from "./MusicPlayer";
import { Play } from "lucide-react";

interface VinylSectionProps {
  currentTrackIndex: number;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
}

export default function VinylSection({ currentTrackIndex, isPlaying, onTrackSelect }: VinylSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = useCallback(() => setIsOpen(true), []);
  const handleMouseLeave = useCallback(() => setIsOpen(false), []);

  return (
    <div
      className={`vinyl-drawer ${isOpen ? "open" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Vinyl tab peeking out from the right edge */}
      <div className="vinyl-drawer-tab">
        <div className="vinyl-tab-disc" />
      </div>

      {/* Drawer panel that slides in */}
      <div className="vinyl-drawer-panel">
        {/* Header */}
        <div className="vinyl-drawer-header">
          <h3 className="text-sm font-semibold tracking-wide uppercase" style={{ color: "var(--ink-light)" }}>
            Discography
          </h3>
          <span className="text-xs" style={{ color: "var(--ink-mid)" }}>
            {TRACKS.length} tracks
          </span>
        </div>

        {/* Scrollable track list */}
        <div className="vinyl-drawer-content">
          {TRACKS.map((track: Track, index: number) => {
            const hue = (index * 24) % 360;
            const isCurrent = currentTrackIndex === index;

            return (
              <div
                key={index}
                className="vinyl-track-card grayscale-hover"
                onClick={() => onTrackSelect(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onTrackSelect(index); }}
                style={{
                  background: `linear-gradient(135deg, hsl(${hue}, 30%, 22%) 0%, hsl(${hue + 30}, 20%, 14%) 100%)`,
                }}
              >
                {/* Track number */}
                <span className="absolute top-3 left-3 text-xs font-mono opacity-50" style={{ color: "var(--ink-light)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Play icon on hover */}
                <div className="vinyl-track-play">
                  <Play size={20} fill="white" color="white" />
                </div>

                {/* Track info */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-sm font-semibold truncate" style={{ color: "var(--ink-light)" }}>
                    {track.title}
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: "var(--ink-mid)" }}>SEHNYA</p>
                </div>

                {/* Current track indicator */}
                {isCurrent && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-end gap-0.5 h-3">
                      <span className={`w-0.5 bg-white rounded-full ${isPlaying ? "animate-bounce" : ""}`} style={{ height: "60%", animationDelay: "0ms" }} />
                      <span className={`w-0.5 bg-white rounded-full ${isPlaying ? "animate-bounce" : ""}`} style={{ height: "100%", animationDelay: "150ms" }} />
                      <span className={`w-0.5 bg-white rounded-full ${isPlaying ? "animate-bounce" : ""}`} style={{ height: "40%", animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
