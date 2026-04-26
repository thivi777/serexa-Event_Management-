"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Explore', path: '/explore', icon: '🔍' },
  { name: 'Calendar', path: '/calendar', icon: '📅' },
  { name: 'Favorites', path: '/favorites', icon: '⭐' },
  { name: 'Storage', path: '/storage', icon: '☁️' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-dot-pattern">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--sidebar-bg)] border-r border-[var(--panel-border)] flex flex-col z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-[var(--background)] font-bold text-xl">S</div>
            <span className="font-bold text-lg text-[var(--foreground)]">Serexa</span>
          </div>
          
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  pathname === item.path
                    ? 'bg-[var(--foreground)] text-[var(--background)]'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button className="w-full bg-[#f8f9fa] dark:bg-[#1e2124] border border-[var(--panel-border)] py-3 rounded-2xl text-sm font-semibold hover:border-gray-400 transition">
             Join Exclusive
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {children}
      </main>
    </div>
  );
}
