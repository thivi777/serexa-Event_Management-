"use client";
import React from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';

export default function StoragePage() {
  return (
    <DashboardLayout>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Storage</h1>
        <div className="bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-3xl p-12 text-center text-gray-500">
           Manage your project assets and exported versions.
        </div>
      </div>
    </DashboardLayout>
  );
}
