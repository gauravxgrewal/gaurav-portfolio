import React from "react";

// Reusable card for skills and contact icons
export default function InfoCard({ href = "#", ariaLabel, icon, text }) {
  return (
    <a
      aria-label={ariaLabel}
      className="flex cursor-pointer flex-col justify-center items-center gap-2 bg-white rounded-2xl lg:py-2 py-5  text-center text-gray-700 font-medium transition-transform hover:scale-105 hover:bg-green-50"
    >
      {icon}
      {text && <span>{text}</span>}
    </a>
  );
}