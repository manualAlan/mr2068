"use client";

/* eslint-disable jsx-a11y/media-has-caption -- Decorative city footage with instrumental music, no spoken information. */
import { useEffect, useRef, useState } from "react";

export default function Lca68HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectReducedMotion = () => {
      const video = videoRef.current;
      if (preference.matches && video) {
        video.autoplay = false;
        video.muted = true;
        video.pause();
      }
    };
    respectReducedMotion();
    preference.addEventListener("change", respectReducedMotion);
    return () => preference.removeEventListener("change", respectReducedMotion);
  }, []);

  const toggleMotion = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try { await video.play(); } catch { setPaused(true); }
    } else video.pause();
  };

  const toggleMusic = async () => {
    const nextMuted = !muted;
    setMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      videoRef.current.volume = 0.65;
      if (!nextMuted) {
        try { await videoRef.current.play(); } catch { setMuted(true); videoRef.current.muted = true; }
      }
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className="lca68-video"
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="metadata"
        poster="/images/caprica-2068-city-poster.png"
        aria-hidden="true"
        onPause={() => setPaused(true)}
        onPlay={() => setPaused(false)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
      >
        <source src="/video/caprica-2068-city.mp4" type="video/mp4" />
      </video>
      <button className="lca68-motion" type="button" onClick={toggleMotion} aria-label={paused ? "Play background video" : "Pause background video"} aria-pressed={paused}>
        <b>{paused ? "Play video" : "Pause video"}</b>
      </button>
      <button
        className="lca68-music"
        type="button"
        onClick={toggleMusic}
        aria-label={muted ? "Turn background music on" : "Turn background music off"}
        aria-pressed={!muted}
      >
        <span className={muted ? "lca68-music-bars is-muted" : "lca68-music-bars"} aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <b>{muted ? "Music off" : "Music on"}</b>
      </button>
    </>
  );
}
