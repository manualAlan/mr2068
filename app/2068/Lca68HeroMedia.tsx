"use client";

/* eslint-disable jsx-a11y/media-has-caption -- Decorative city footage with instrumental music, no spoken information. */
import { useEffect, useRef, useState } from "react";

export default function Lca68HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicTimerRef = useRef<number | null>(null);
  // Start with music enabled. Browsers may still block audible autoplay; in
  // that case the catch below falls back to silent video while keeping the
  // visual loop running.
  const [muted, setMuted] = useState(false);

  const stopMusic = () => {
    if (musicTimerRef.current !== null) window.clearInterval(musicTimerRef.current);
    musicTimerRef.current = null;
    audioContextRef.current?.close();
    audioContextRef.current = null;
  };

  const startMusic = () => {
    if (audioContextRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    audioContextRef.current = context;
    const chords = [[261.63, 329.63, 392], [220, 277.18, 329.63], [246.94, 311.13, 369.99], [196, 246.94, 293.66]];
    let step = 0;
    const playChord = () => {
      const now = context.currentTime;
      chords[step++ % chords.length].forEach((frequency) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.026, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.1);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(now);
        oscillator.stop(now + 2.15);
      });
    };
    void context.resume().then(() => { playChord(); musicTimerRef.current = window.setInterval(playChord, 2000); });
  };

  useEffect(() => {
    const unlockMusic = () => startMusic();
    window.addEventListener("pointerdown", unlockMusic, { once: true, passive: true });
    window.addEventListener("keydown", unlockMusic, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlockMusic);
      window.removeEventListener("keydown", unlockMusic);
      stopMusic();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = 0.65;
    video.muted = false;
    video.play().catch(() => {
      setMuted(true);
      video.muted = true;
      // Keep the video moving silently when audible autoplay is disallowed.
      void video.play();
    });
  }, []);

  const toggleMusic = async () => {
    const nextMuted = !muted;
    setMuted(nextMuted);

    if (nextMuted) stopMusic();
    else startMusic();

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
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
      >
        <source src="/video/caprica-2068-city.mp4" type="video/mp4" />
      </video>
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
