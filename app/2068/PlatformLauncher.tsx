"use client";

export default function PlatformLauncher() {
  return (
    <button
      className="lca68-platform-link"
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("lca:open-platforms"))}
      aria-label="Open the platform focus areas"
    >
      <span>Check out our Platforms</span>
      <i aria-hidden="true" />
    </button>
  );
}
