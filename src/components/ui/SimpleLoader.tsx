import React from 'react'

export default function SimpleLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full py-20">
      <div className="relative">
        {/* Main spinning ring */}
        <div className="w-12 h-12 border-4 border-[#0039F0]/10 border-t-[#0039F0] rounded-full animate-spin"></div>
        
        {/* Subtle inner pulsing dot */}
        <div className="absolute inset-0 m-auto w-2 h-2 bg-[#0039F0] rounded-full animate-pulse"></div>
      </div>
      
      {/* Optional minimalist text */}
      <div className="mt-4 flex items-center space-x-1">
        <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">Loading</span>
        <span className="flex space-x-0.5">
          <span className="w-1 h-1 bg-[#0039F0] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1 h-1 bg-[#0039F0] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1 h-1 bg-[#0039F0] rounded-full animate-bounce"></span>
        </span>
      </div>
    </div>
  )
}
