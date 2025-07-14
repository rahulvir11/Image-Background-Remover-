import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 bg-gray-50 min-h-[80vh]">
      {/* Left */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Remove Image Background Instantly
        </h1>
        <p className="text-lg text-gray-600">
          Upload your image and let our AI remove the background in seconds.
        </p>

        <button
        type="button"
        onClick={()=>navigate('/result')}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Upload Image
        </button>
       
        
      </div>

      {/* Right */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <video
          src="/remove-background-demo.mp4"
          loop
          autoPlay
          muted
          playsInline
          className="rounded-xl shadow-lg w-full max-w-md"
        />
      </div>
    </section>
  );
};

export default HeroSection;
