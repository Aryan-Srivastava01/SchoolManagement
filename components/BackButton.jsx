"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="
        flex items-center gap-2 px-4 py-2
        rounded-xl bg-white/10 border border-white/20 
        text-white font-medium 
        hover:bg-white/20 transition-all duration-200 
        shadow-md backdrop-blur-xl
        cursor-pointer
      "
    >
      ← Back
    </button>
  );
}
