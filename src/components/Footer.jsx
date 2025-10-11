import React from 'react';
import { FaHeart } from 'react-icons/fa'; // Dil ke icon ke liye

// Yeh socialLinks prop App.jsx se aayega
export default function Footer({ socialLinks }) {
  return (
    <footer className="bg-[#eaeff5] lg:hidden  col-span-1 md:col-span-2 lg:col-span-5 -m-5 mt-5 p-5">
      <div className="w-full pt-2 flex  items-center justify-center ">
        
        {/* Left Side: "Made with love" text */}
        <div className="text-gray-700 font-semibold">
          Made with <FaHeart className="inline text-red-500 mx-1" /> by Gaurav
        </div>
      </div>
      <div className="text-center text-gray-600 text-sm mt-4">
        &copy; {new Date().getFullYear()} Gaurav. All Rights Reserved.
      </div>
    </footer>
  );
}