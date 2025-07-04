import React from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">
      <h1 className="text-gray text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
        Empower your future with the courses designed to{" "}
        <span className="text-blue-800">fit your choice.</span>
      </h1>

      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>

      <p className="md:hidden text-gray-500 max-w-sm mx-auto">
        We bring together world-class instructors to help you achieve your
        prfessional goals.
      </p>
      <SearchBar />
    </div>
  );
};

export default Hero;
