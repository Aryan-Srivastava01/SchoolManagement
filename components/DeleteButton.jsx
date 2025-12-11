"use client";

import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

export default function DeleteIcon({ id, onDelete }) {
  const [hover, setHover] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this school?")) return;

    const res = await fetch(`/api/schools?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("School deleted!");
      onDelete(id);
    } else {
      toast.error(data.error || "Failed to delete");
    }
  };

  return (
    <button
      onClick={handleDelete}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",

        padding: "7px",
        borderRadius: "50%",
        cursor: "pointer",
        border: "none",

        background: hover
          ? "#dc2626" // red
          : "rgba(255,255,255,0.85)",

        color: hover ? "#ffffff" : "#dc2626",

        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        backdropFilter: "blur(10px)",
        transition: "0.25s ease",
      }}
    >
      <Trash2 size={16} />
    </button>
  );
}
