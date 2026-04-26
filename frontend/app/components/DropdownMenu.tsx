import React from 'react';

export function DropdownMenu({ onOpenSettings }: { onOpenSettings: () => void }) {
  return (
    <div className="absolute top-14 left-0 w-64 bg-[#f8f9fa] border border-gray-200 shadow-lg rounded-2xl py-2 flex flex-col font-medium text-sm text-gray-700">
      <button className="flex items-center px-4 py-2 hover:bg-gray-200 text-left">
        <span className="mr-3 text-gray-500">&lt;</span> Go to all projects
      </button>
      <button className="flex items-center px-4 py-2 hover:bg-gray-200 text-left">
        <span className="mr-3 text-gray-500">↓</span> Download project
      </button>
      <button className="flex items-center px-4 py-2 hover:bg-gray-200 text-left">
        <span className="mr-3 text-gray-500">📄</span> Duplicate project
      </button>
      <div className="border-t border-gray-200 my-1"></div>
      <button className="flex items-center px-4 py-2 hover:bg-gray-200 text-left">
        <span className="mr-3 text-gray-500">ⓘ</span> Help
      </button>
      <div className="border-t border-gray-200 my-1"></div>
      <button className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 text-left">
        <div className="flex items-center"><span className="mr-3 text-gray-500">💻</span> Appearance</div>
      </button>
      <button onClick={onOpenSettings} className="flex items-center px-4 py-2 hover:bg-gray-200 text-left">
        <span className="mr-3 text-gray-500">⚙️</span> Settings
      </button>
      <div className="border-t border-gray-200 my-1"></div>
      <button className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 text-left text-gray-500">
        <div className="flex items-center"><span className="mr-3">⌘</span> Command menu</div>
        <span className="text-xs">Ctrl+K</span>
      </button>
    </div>
  );
}
