import React from 'react';

export function FloatingActionWindow({ onRemix }: { onRemix: () => void }) {
  return (
    <div className="bg-[#e8eaed]/80 backdrop-blur-md rounded-3xl py-4 px-8 w-[600px] shadow-sm border border-gray-100 flex items-center justify-between">
      <div className="flex-1 text-center font-medium">
        <p className="text-gray-500 mb-1">Want to ask Stitch to do something?</p>
        <button onClick={onRemix} className="underline text-gray-800 decoration-gray-400 decoration-2 underline-offset-4 hover:text-gray-900 transition mb-1 cursor-pointer">
          Remix this project
        </button>
        <p className="text-gray-500">to make it your own so that you can!</p>
      </div>
      <div className="flex items-center gap-3 text-gray-400 pl-4 border-l border-gray-300">
        <span className="cursor-pointer hover:text-gray-600">⚡</span>
        <span className="cursor-pointer hover:text-gray-600">🎤</span>
        <span className="cursor-pointer hover:text-gray-600">↑</span>
      </div>
    </div>
  );
}
