"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";

export default function AddSchool() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image") formData.append("image", value[0]);
        else formData.append(key, value);
      });

      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("School added successfully!");
        reset();
      } else toast.error(result.error || "Something went wrong");
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FIXED → Inline animation must be inside return */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div
        style={{
          minHeight: "100vh",
          padding: "40px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "radial-gradient(circle at top left, #0f172a, #000000)",
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            position: "absolute",
            top: 25,
            left: 25,
            padding: "8px 14px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "8px",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            backdropFilter: "blur(10px)",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            width: "90%",
            maxWidth: "600px",
            padding: "50px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
            backdropFilter: "blur(14px)",
            animation: "fadeIn 0.35s ease",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "700",
              marginBottom: "25px",
              color: "#fff",
            }}
          >
            Add School
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {inputField(
              "School Name *",
              "name",
              register,
              errors,
              {
                required: "School name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              }
            )}

            {textAreaField(
              "Address *",
              "address",
              register,
              errors,
              {
                required: "Address is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
              }
            )}

            {inputField("City *", "city", register, errors, { required: "City is required" })}
            {inputField("State", "state", register, errors)}

            {inputField(
              "Contact *",
              "contact",
              register,
              errors,
              {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              }
            )}

            {inputField(
              "Email *",
              "email_id",
              register,
              errors,
              {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              }
            )}

            <label style={labelStyle}>Image *</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("image", {
                required: "Image is required",
                validate: {
                  fileSize: (files) =>
                    files[0]?.size < 2 * 1024 * 1024 ||
                    "Image must be under 2MB",
                },
              })}
              style={fileStyle}
            />
            {errors.image && (
              <p style={errorMessage}>{errors.image.message}</p>
            )}

            <button
              disabled={loading}
              type="submit"
              style={{
                marginTop: "28px",
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background: loading
                  ? "gray"
                  : "linear-gradient(135deg, #2563eb, #1e40af)",
                color: "white",
                fontSize: "17px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "0.25s",
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

/* INLINE STYLES */

const labelStyle = {
  marginTop: "16px",
  marginBottom: "6px",
  display: "block",
  color: "#e5e7eb",
  fontWeight: 500,
};

const inputBase = {
  width: "100%",
  padding: "13px 15px",
  borderRadius: "10px",
  fontSize: "15px",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.18)",
  outline: "none",
};

const textAreaBase = {
  ...inputBase,
  height: "90px",
  resize: "none",
};

const fileStyle = {
  ...inputBase,
  padding: "10px",
};

const errorMessage = {
  color: "#f87171",
  fontSize: "13px",
  marginTop: "4px",
};

/* HELPERS */

function inputField(label, name, register, errors, validation = {}) {
  return (
    <>
      <label style={labelStyle}>{label}</label>
      <input
        {...register(name, validation)}
        placeholder={label}
        style={inputBase}
      />
      {errors[name] && <p style={errorMessage}>{errors[name].message}</p>}
    </>
  );
}

function textAreaField(label, name, register, errors, validation = {}) {
  return (
    <>
      <label style={labelStyle}>{label}</label>
      <textarea
        {...register(name, validation)}
        placeholder={label}
        style={textAreaBase}
      />
      {errors[name] && <p style={errorMessage}>{errors[name].message}</p>}
    </>
  );
}
