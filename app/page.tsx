import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 animate-fadeIn">
        
        <h1 className="text-4xl font-bold text-center text-white mb-8 tracking-wide">
          School Management Panel
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Add School Card */}
          <Link
            href="/addschool"
            className="
              group p-6 bg-white/10 rounded-xl border border-white/10 
              hover:bg-white/20 transition-all duration-300 shadow-lg
              flex flex-col items-center text-center cursor-pointer
            "
          >
            <div
              className="h-20 w-20 rounded-full bg-blue-600 group-hover:bg-blue-700 flex items-center justify-center text-white text-3xl font-bold shadow-md"
            >
              +
            </div>

            <h2 className="text-xl font-semibold text-white mt-4">
              Add School
            </h2>
            <p className="text-gray-300 text-sm mt-1">
              Enter school details and upload image
            </p>
          </Link>

          {/* Show Schools Card */}
          <Link
            href="/showschool"
            className="
              group p-6 bg-white/10 rounded-xl border border-white/10 
              hover:bg-white/20 transition-all duration-300 shadow-lg
              flex flex-col items-center text-center cursor-pointer
            "
          >
            <div
              className="h-20 w-20 rounded-full bg-green-600 group-hover:bg-green-700 flex items-center justify-center text-white text-3xl font-bold shadow-md"
            >
              🔍
            </div>

            <h2 className="text-xl font-semibold text-white mt-4">
              Show Schools
            </h2>
            <p className="text-gray-300 text-sm mt-1">
              Browse schools in a clean card layout
            </p>
          </Link>

        </div>

      </div>
    </div>
  );
}
