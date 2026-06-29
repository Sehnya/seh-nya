import type { Track } from "./MusicPlayer";

interface VinylCardProps {
  track: Track;
  index: number;
  isPlaying: boolean;
  isCurrent: boolean;
  onSelect: (index: number) => void;
}

export default function VinylCard({ track, index, isPlaying, isCurrent, onSelect }: VinylCardProps) {
  const hue = (index * 24) % 360;

  return (
    <div
      className="vinyl-wrapper grayscale-hover"
      onClick={() => onSelect(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(index); }}
      aria-label={`Play ${track.title}`}
    >
      {/* Card sleeve */}
      <div className="vinyl-sleeve">
        <div
          className="absolute inset-0 rounded"
          style={{
            background: `linear-gradient(135deg, hsl(${hue}, 30%, 20%) 0%, hsl(${hue + 30}, 20%, 12%) 100%)`,
          }}
        />
        {/* Track number on sleeve */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold opacity-40" style={{ color: "var(--ink-light)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Vinyl disc — sits in the row, behind sleeve via negative margin + z-index */}
      <div className="vinyl-disc" />

      {/* Track info */}
      <div className="ml-3 flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: isCurrent ? "white" : "var(--ink-light)" }}>
          {track.title}
        </p>
        <p className="text-xs truncate" style={{ color: "var(--ink-mid)" }}>
          SEHNYA
        </p>
      </div>

      {/* Playing indicator */}
      {isCurrent && (
        <div className="flex items-end gap-0.5 h-4 ml-2">
          <span className={`w-0.5 bg-white rounded-full ${isPlaying ? "animate-bounce" : ""}`} style={{ height: "60%", animationDelay: "0ms" }} />
          <span className={`w-0.5 bg-white rounded-full ${isPlaying ? "animate-bounce" : ""}`} style={{ height: "100%", animationDelay: "150ms" }} />
          <span className={`w-0.5 bg-white rounded-full ${isPlaying ? "animate-bounce" : ""}`} style={{ height: "40%", animationDelay: "300ms" }} />
        </div>
      )}
    </div>
  );
}
