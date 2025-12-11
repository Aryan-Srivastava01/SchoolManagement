"use client";

import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DeleteIcon({ id, onDelete }) {
  const handleDelete = async () => {
    if (!confirm("Delete this school?")) return;

    const res = await fetch(`/api/schools?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("School deleted!");
      onDelete(id); // instantly remove from UI
    } else {
      toast.error(data.error || "Failed to delete");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="
        absolute top-2 right-2 
        bg-white/80 backdrop-blur-xl
        hover:bg-red-600 hover:text-white
        text-red-600 p-2 rounded-full 
        shadow-md transition-all
      "
    >
      <Trash2 size={16} />
    </button>
  );
}
