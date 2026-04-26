import React from 'react';

export function RightToolbar() {
  return (
    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-40">
      <div className="bg-[#f1f3f4] rounded-full p-1 shadow-md border border-gray-200 flex flex-col gap-1">
        <button className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-full bg-transparent hover:bg-gray-200 text-gray-600 flex items-center justify-center transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V7a5 5 0 0110 0v4" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 11v8a2 2 0 002 2h10a2 2 0 002-2v-8m-9 4h2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
