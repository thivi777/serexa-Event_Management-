import React from 'react';

export function LeftHeader({ onToggleMenu }: { onToggleMenu: () => void }) {
  return (
    <button 
      onClick={onToggleMenu}
      className="flex items-center gap-4 bg-[#f1f3f4] hover:bg-[#e8eaed] text-gray-800 px-4 py-3 rounded-full shadow-sm transition border border-transparent"
    >
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <span className="font-semibold text-[15px] mr-2">serexa - user dashboard</span>
    </button>
  );
}
