// src/components/Loader.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );
};

export default Loader;