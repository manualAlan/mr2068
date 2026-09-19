"use client";

import { useState } from "react";
import "./candidate-actions.css";

type CandidateActionsProps = {
  name: string;
  region: string;
  commitments: string[];
};

export default function CandidateActions({ name, region, commitments }: CandidateActionsProps) {
  const [message, setMessage] = useState("");
  const [fallback, setFallback] = useState("");

  const campaignUrl = () => {
    const url = new URL(window.location.href);
    url.hash = "";
    url.search = "";
    return url.href;
  };

  async function copyLink() {
    const url = campaignUrl();
    try {
      await navigator.clipboard.writeText(url);
      setFallback("");
      setMessage("Campaign link copied. Ready to share.");
    } catch {
      setFallback(url);
      setMessage("Select and copy the link below.");
    }
  }

  function saveBrief() {
    const text = [
      `${name} for ${region}`,
      "CAPRICA 2068 | LIBERAL-CONSERVATIVE ALLIANCE",
      "",
      "THE LOCAL PLAN",
      ...commitments.flatMap((commitment, index) => ["", `${index + 1}. ${commitment}`]),
      "",
      "These are campaign proposals, not completed projects. Read the full local plan for funding, safeguards and the authorities responsible.",
      "",
      `Full campaign: ${campaignUrl()}`,
      "",
      "THE SHARED NATIONAL PRIORITIES",
      "Homes and independence. Enterprise and productive work. Reliable infrastructure. Effective public services. Personal freedom and accountable government.",
    ].join("\n");
    const objectUrl = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = `${region.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-campaign-2068.txt`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    setMessage("Your short campaign brief is ready to save.");
  }

  return <div className="candidate-actions" role="group" aria-label={`${name} campaign sharing tools`}>
    <div className="candidate-actions-buttons">
      <button type="button" onClick={copyLink}>Copy campaign link <span aria-hidden="true">↗</span></button>
      <button type="button" onClick={saveBrief}>Save a short brief <span aria-hidden="true">↓</span></button>
    </div>
    <p className="candidate-actions-status" role="status" aria-live="polite">{message}</p>
    {fallback && <label className="candidate-actions-fallback">Campaign link<input type="url" readOnly value={fallback} onFocus={event => event.currentTarget.select()} /></label>}
  </div>;
}
