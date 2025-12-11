"use client";

import { useEffect, useState } from "react";
import DeleteIcon from "@/components/DeleteButton";
import BackButton from "@/components/BackButton";
import toast from "react-hot-toast";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Fetch schools
  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch(`${baseUrl}/api/schools`, {
          cache: "no-store",
        });

        const data = await res.json();
        setSchools(data);
      } catch (err) {
        toast.error("Failed to load schools.");
      } finally {
        setLoading(false);
      }
    }

    fetchSchools();
  }, []);

  // Remove school instantly from UI
  const handleDelete = (id) => {
    setSchools((prev) => prev.filter((school) => school.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading schools...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-700 p-6">
      
      {/* Back Button */}
      <div className="mb-4">
        <BackButton />
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Schools
      </h2>

      {schools.length === 0 ? (
        <p className="text-center text-white text-lg">No schools found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {schools.map((s) => (
            <div
              key={s.id}
              className="relative bg-white shadow-md rounded-xl overflow-hidden"
            >
              {/* Delete Icon */}
              <DeleteIcon id={s.id} onDelete={handleDelete} />

              <img
                src={s.image}
                className="w-full h-40 object-cover"
                alt={s.name}
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold">{s.name}</h3>
                <p className="text-gray-600">{s.address}</p>
                <p className="font-bold">{s.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
