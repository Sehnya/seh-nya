import { useState, useCallback, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import UnderConstruction from "../components/UnderConstruction";
import VinylSection from "../components/VinylSection";
import MusicPlayer from "../components/MusicPlayer";

export default function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTrackChange = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  }, []);

  const handlePlayPause = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  // Attempt autoplay on mount — will silently fail if browser blocks it
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: "var(--ink-bg)" }}>
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content */}
      <main className="pb-24">
        {/* Hero section */}
        <Hero />

        {/* Biography */}
        <Biography />

        {/* Undeveloped pages */}
        <div id="music"><UnderConstruction page="Music" /></div>
        <div id="merch"><UnderConstruction page="Store" /></div>
        <div id="contact"><UnderConstruction page="Contact" /></div>
      </main>

      {/* Popout music browser — fixed bottom right */}
      <VinylSection
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlaying}
        onTrackSelect={handleTrackChange}
      />

      {/* Fixed bottom music player */}
      <MusicPlayer
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlaying}
        onTrackChange={handleTrackChange}
        onPlayPause={handlePlayPause}
      />
    </div>
  );
}
