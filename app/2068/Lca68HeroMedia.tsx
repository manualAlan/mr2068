"use client";

import { useRef, useState } from "react";

export default function Lca68HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMusic = async () => {
    const nextMuted = !muted;
    setMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      videoRef.current.volume = 0.65;
      if (!nextMuted) await videoRef.current.play();
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
        preload="auto"
        poster="/images/caprica-2068-city-poster.png"
        aria-hidden="true"
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
