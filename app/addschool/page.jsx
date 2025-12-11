"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import BackButton from "@/components/BackButton";

export default function AddSchool() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔥 Show toast when a required field is missing
  const onError = (errors) => {
    const firstError = Object.values(errors)[0];

    if (firstError?.type === "required") {
      toast.error(`${firstError.message || "This field is required"}`);
    } else if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "image") {
          formData.append("image", data.image[0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("School added successfully!");
        reset();
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Back Button */}
        <div className="mb-4">
          <BackButton />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="
            w-full max-w-xl p-8
            rounded-2xl backdrop-blur-xl bg-white/10 
            shadow-2xl border border-white/10 
            space-y-6 animate-fadeIn
          "
        >
          <h2 className="text-3xl font-bold text-center text-white tracking-wide">
            Add School
          </h2>

          {/* School Name */}
          <div className="space-y-1">
            <label className="font-medium text-gray-100">School Name *</label>
            <input
              {...register("name", { required: "School name is required" })}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter school name"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="font-medium text-gray-100">Address *</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address"
            />
          </div>

          {/* City */}
          <div className="space-y-1">
            <label className="font-medium text-gray-100">City *</label>
            <input
              {...register("city", { required: "City is required" })}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city"
            />
          </div>

          {/* State */}
          <div className="space-y-1">
            <label className="font-medium text-gray-100">State</label>
            <input
              {...register("state")}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter state"
            />
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <label className="font-medium text-gray-100">Contact *</label>
            <input
              {...register("contact", { required: "Contact is required" })}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contact number"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="font-medium text-gray-100">Email *</label>
            <input
              {...register("email_id", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>

          {/* Image */}
          <div className="space-y-1">
            <label className="font-medium text-gray-100">Image *</label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-gray-200 cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
