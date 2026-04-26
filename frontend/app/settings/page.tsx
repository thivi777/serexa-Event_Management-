"use client";
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import { getUserPreferences, updatePreferences } from '@/services/userService';

export default function SettingsPage() {
  const [prefs, setPrefs] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrefs() {
      try {
        const data = await getUserPreferences();
        setPrefs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPrefs();
  }, []);

  if (loading) return <DashboardLayout><div className="p-10">Loading settings...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="flex-1 p-10 overflow-y-auto pb-32">
        <header className="flex justify-between items-center mb-12">
           <h1 className="text-3xl font-bold">Settings</h1>
           <button className="bg-[var(--accent)] text-[var(--background)] px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:opacity-90 transition">
             Save changes
           </button>
        </header>

        <div className="max-w-3xl space-y-12">
          {/* Profile Section */}
          <section>
            <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 rounded-full border-2 border-[var(--panel-border)] overflow-hidden">
                 <img src="https://i.pravatar.cc/200" alt="Profile" className="w-full h-full object-cover" />
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-1">Profile information</h3>
                  <p className="text-sm text-gray-500">Update your personal details and identity.</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Name</label>
                <input type="text" defaultValue="Julian Vance" className="w-full bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-2xl px-4 py-3 focus:border-gray-400 transition outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                <input type="email" defaultValue="julian.vance@obsidian.gold" className="w-full bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-2xl px-4 py-3 focus:border-gray-400 transition outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                <input type="text" defaultValue="+1 (555) 012-3456" className="w-full bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-2xl px-4 py-3 focus:border-gray-400 transition outline-none" />
              </div>
            </div>
          </section>

          <hr className="border-[var(--panel-border)]" />

          {/* Security Section */}
          <section>
              <h3 className="text-xl font-bold mb-1">Security</h3>
              <p className="text-sm text-gray-500 mb-8">Manage your credentials and authentication.</p>

              <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Current Password</label>
                   <input type="password" placeholder="••••••••" className="w-full bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-2xl px-4 py-3 focus:border-gray-400 transition outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">New Password</label>
                    <input type="password" className="w-full bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-2xl px-4 py-3 focus:border-gray-400 transition outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Confirm Password</label>
                    <input type="password" className="w-full bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-2xl px-4 py-3 focus:border-gray-400 transition outline-none" />
                  </div>
                </div>
                <button className="bg-[var(--foreground)] text-[var(--background)] px-6 py-2.5 rounded-xl text-xs font-bold hover:scale-105 transition">Update Credentials</button>
              </div>
          </section>

          <hr className="border-[var(--panel-border)]" />

          {/* Notifications Section */}
          <section>
              <div className="flex justify-between items-start mb-8">
                 <div>
                   <h3 className="text-xl font-bold mb-1">Notifications</h3>
                   <p className="text-sm text-gray-500">Control your elite concierge alerts.</p>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Email Notifications</h4>
                      <p className="text-xs text-gray-500">Weekly digest and product updates.</p>
                    </div>
                    <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer shadow-inner">
                       <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Concierge Direct</h4>
                      <p className="text-xs text-gray-500">Members-only curated content.</p>
                    </div>
                    <div className="w-10 h-5 bg-orange-400 rounded-full relative cursor-pointer shadow-inner">
                       <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                 </div>
              </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
