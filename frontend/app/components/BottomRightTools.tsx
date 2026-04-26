import React from 'react';

export function BottomRightTools() {
  return (
    <div className="absolute bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      <button className="w-12 h-12 bg-[#7b61ff] rounded-full shadow-lg flex items-center justify-center hover:bg-[#6a50e5] transition border-2 border-white">
        <div className="w-5 h-5 border-2 border-white rounded-sm"></div>
      </button>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-600 bg-white/70 px-2 py-1 rounded-md shadow-sm">5%</span>
        <button className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold hover:bg-gray-300 shadow-sm border border-gray-300">
          ?
        </button>
      </div>
    </div>
  );
}
