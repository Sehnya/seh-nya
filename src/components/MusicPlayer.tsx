import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

export interface Track {
  title: string;
  src: string;
}

export const TRACKS: Track[] = [
  { title: "Midnight Velvet", src: "/music/track-01.wav" },
  { title: "Honey Drip", src: "/music/track-02.wav" },
  { title: "Soft Landing", src: "/music/track-03.wav" },
  { title: "Brown Sugar Haze", src: "/music/track-04.wav" },
  { title: "After Hours", src: "/music/track-05.wav" },
  { title: "Golden Hour", src: "/music/track-06.wav" },
  { title: "Silk & Smoke", src: "/music/track-07.wav" },
  { title: "Tender", src: "/music/track-08.wav" },
  { title: "Faded Love", src: "/music/track-09.wav" },
  { title: "Ocean Floor", src: "/music/track-10.wav" },
  { title: "Warm Enough", src: "/music/track-11.wav" },
  { title: "Slow Burn", src: "/music/track-12.wav" },
  { title: "Lavender Dusk", src: "/music/track-13.wav" },
  { title: "Still Waters", src: "/music/track-14.wav" },
  { title: "Eclipse", src: "/music/track-15.wav" },
];

interface MusicPlayerProps {
  currentTrackIndex: number;
  isPlaying: boolean;
  onTrackChange: (index: number) => void;
  onPlayPause: (playing: boolean) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({
  currentTrackIndex,
  isPlaying,
  onTrackChange,
  onPlayPause,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const track = TRACKS[currentTrackIndex]!;

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = track.src;
    audio.load();

    if (isPlaying) {
      audio.play().catch(() => {
        // Browser blocked autoplay — wait for user interaction
        onPlayPause(false);
      });
    }
  }, [currentTrackIndex]);

  // Play/pause state sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        onPlayPause(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Volume sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Time update listener
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => {
      // Auto-advance to next track
      const next = (currentTrackIndex + 1) % TRACKS.length;
      onTrackChange(next);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrackIndex, onTrackChange]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
  }, []);

  const handlePrev = useCallback(() => {
    const prev = currentTrackIndex === 0 ? TRACKS.length - 1 : currentTrackIndex - 1;
    onTrackChange(prev);
  }, [currentTrackIndex, onTrackChange]);

  const handleNext = useCallback(() => {
    const next = (currentTrackIndex + 1) % TRACKS.length;
    onTrackChange(next);
  }, [currentTrackIndex, onTrackChange]);

  const toggleMute = useCallback(() => {
    setIsMuted(m => !m);
  }, []);

  // Generate a hue for the album art thumbnail
  const hue = (currentTrackIndex * 24) % 360;

  return (
    <div className="music-player">
      {/* Progress bar - full width at top of player */}
      <div className="px-4 pt-2">
        <input
          type="range"
          className="progress-bar"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Seek"
        />
      </div>

      <div className="flex items-center gap-4 px-4 py-3">
        {/* Album art thumbnail */}
        <div
          className="w-12 h-12 rounded flex-shrink-0 grayscale-hover"
          style={{
            background: `linear-gradient(135deg, hsl(${hue}, 30%, 20%) 0%, hsl(${hue + 30}, 20%, 12%) 100%)`,
          }}
        />

        {/* Track info */}
        <div className="min-w-0 flex-shrink-0 w-40">
          <p className="text-sm font-medium truncate" style={{ color: "var(--ink-light)" }}>
            {track.title}
          </p>
          <p className="text-xs truncate" style={{ color: "var(--ink-mid)" }}>
            SEHNYA
          </p>
        </div>

        {/* Transport controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Previous track"
          >
            <SkipBack size={18} color="var(--ink-light)" />
          </button>
          <button
            onClick={() => onPlayPause(!isPlaying)}
            className="p-2.5 rounded-full transition-colors"
            style={{ background: "var(--ink-light)" }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={20} color="var(--ink-bg)" fill="var(--ink-bg)" />
            ) : (
              <Play size={20} color="var(--ink-bg)" fill="var(--ink-bg)" />
            )}
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Next track"
          >
            <SkipForward size={18} color="var(--ink-light)" />
          </button>
        </div>

        {/* Time display */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs font-mono" style={{ color: "var(--ink-mid)" }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleMute}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={16} color="var(--ink-mid)" />
            ) : (
              <Volume2 size={16} color="var(--ink-mid)" />
            )}
          </button>
          <input
            type="range"
            className="volume-slider"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
