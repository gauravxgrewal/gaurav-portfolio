import React from "react";

export default function StatCard({ label, count }) {
  return (
    <div className="flex cursor-pointer justify-center transition-transform hover:scale-105 hover:bg-green-50 items-center font-bold text-lg gap-2 bg-white  p-5  rounded-2xl">
      {label}
      <p className="bg-gray-800 h-9 w-9 flex items-center justify-center rounded-full text-white text-base font-bold">
        {count}
      </p>
    </div>
  );
}