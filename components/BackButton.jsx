"use client";

import Link from "next/link";

export default function BackButton({ href = "/" }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
      <Link href={href}>
        <button
          aria-label="Go back"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.03)",
            color: "#e6eef8",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 6px 14px rgba(0,0,0,0.4)",
          }}
        >
          ← Back
        </button>
      </Link>
    </div>
  );
}
