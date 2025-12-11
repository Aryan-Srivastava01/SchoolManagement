"use client";

import { useEffect, useState } from "react";
import DeleteIcon from "../../components/DeleteButton";
import BackButton from "../../components/BackButton";
import toast from "react-hot-toast";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch(`${baseUrl}/api/schools`, { cache: "no-store" });
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

  const handleDelete = (id) => {
    setSchools((prev) => prev.filter((school) => school.id !== id));
  };

  if (loading) {
    return (
      <div style={loadingScreenStyle}>
        Loading schools...
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      
      {/* Back Button */}
      <div style={{ position: "absolute", top: 25, left: 25 }}>
        <BackButton />
      </div>

      <h2 style={titleStyle}>Schools</h2>

      {schools.length === 0 ? (
        <p style={noSchoolsStyle}>No schools found.</p>
      ) : (
        <div style={gridStyle}>
          {schools.map((s) => (
            <div key={s.id} style={cardStyle}>
              <DeleteIcon id={s.id} onDelete={handleDelete} />

              <img
                src={s.image}
                alt={s.name}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              />

              <div style={{ padding: "14px 18px" }}>
                <h3 style={cardTitle}>{s.name}</h3>
                <p style={cardAddress}>{s.address}</p>
                <p style={cardCity}>{s.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------- INLINE STYLES ---------------------- */

const pageStyle = {
  minHeight: "100vh",
  padding: "40px 25px",
  background: "radial-gradient(circle at top left, #111827, #000000)",
  color: "white",
  fontFamily: "sans-serif",
  position: "relative",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "35px",
};

const loadingScreenStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "22px",
  color: "white",
  background: "radial-gradient(circle at top left, #111827, #000000)",
};

const noSchoolsStyle = {
  textAlign: "center",
  fontSize: "18px",
  opacity: 0.8,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "22px",
};

const cardStyle = {
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "14px",
  backdropFilter: "blur(14px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  overflow: "hidden",
  transition: "0.25s",
};

const cardTitle = {
  fontSize: "20px",
  fontWeight: "700",
  margin: "0 0 6px 0",
  color: "white",
};

const cardAddress = {
  fontSize: "14px",
  opacity: 0.8,
  margin: "0 0 4px 0",
};

const cardCity = {
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
  color: "#93c5fd",
};
