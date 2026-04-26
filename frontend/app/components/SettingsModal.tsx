"use client";
import React, { useState, useEffect } from 'react';
import { getUserPreferences } from '@/services/userService';
import { getApiKeys, createApiKey as createApiKeyService } from '@/services/apiKeyService';

export function SettingsModal({ onClose }: { onClose: () => void }) {
  const [prefs, setPrefs] = useState({ usage: { currentCredits: 0, maxCredits: 400 }, allowAiTraining: true, emailPreferences: false });
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching settings from backend...");
        const [prefsData, keysData] = await Promise.all([
          getUserPreferences(),
          getApiKeys()
        ]);
        setPrefs(prefsData);
        setKeys(keysData);
        setError(null);
      } catch (err) {
        console.error("Backend integration error", err);
        setError("Could not connect to backend server. Please check if it's running on port 8000.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const createKey = async () => {
    try {
      const newKeyData = await createApiKeyService({});
      setKeys(prev => [...prev, { id: Date.now(), key: newKeyData.newKey, createdAt: new Date().toISOString(), lastUsed: 'never' }]);
    } catch(err) {
      console.error(err);
    }
  };

  const usagePercent = prefs.usage.maxCredits > 0 ? (prefs.usage.currentCredits / prefs.usage.maxCredits) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-[#eff0f1] w-[600px] h-[75vh] max-h-[800px] rounded-[1.5rem] shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center px-6 py-5 border-b border-gray-200">
          <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-gray-200 mr-2 transition">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 pb-20">
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          {loading ? (
             <div className="flex items-center justify-center h-full text-gray-500">Loading settings...</div>
          ) : (
            <>
              {/* Usage Section */}
              <section>
                <h3 className="text-base font-semibold text-gray-800 mb-4">Usage today</h3>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Daily credits</span>
                  <span>{prefs.usage.currentCredits} / {prefs.usage.maxCredits}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-800 rounded-full" style={{ width: `${usagePercent}%` }}></div>
                </div>
              </section>
              
              <hr className="border-gray-200" />

              {/* AI Training Section */}
              <section className="flex items-start justify-between">
                <div className="pr-12">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Allow AI model training</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Let Google use your future Stitch conversations to train its generative AI models. Opting out does not apply to any feedback that you may choose to provide. <a href="#" className="underline">Learn more.</a>
                  </p>
                </div>
                <input type="checkbox" defaultChecked={prefs.allowAiTraining} className="mt-1 w-5 h-5 rounded !border-gray-300 text-slate-800 focus:ring-slate-800" />
              </section>

              <hr className="border-gray-200" />

              {/* Email Preferences */}
              <section className="flex items-start justify-between">
                <div className="pr-12">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Email preferences</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Receive emails for updates, tips, and offers.
                  </p>
                </div>
                <input type="checkbox" defaultChecked={prefs.emailPreferences} className="mt-1 w-5 h-5 rounded !border-gray-300 text-slate-800 focus:ring-slate-800" />
              </section>

              <hr className="border-gray-200" />

              {/* API Key Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-800">API key</h3>
                  <button onClick={createKey} className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full transition">
                    Create key
                  </button>
                </div>
                
                <div className="bg-[#f2f2f3] border border-[#d1d2d3] rounded-xl p-4 mb-4 flex items-start gap-4 text-sm text-gray-600">
                  <div className="mt-1">⚠️</div>
                  <div>
                    <p className="font-semibold text-gray-800">Abuse auto-detection on</p>
                    <p>For your protection, we automatically disable any API keys found to be publicly exposed to prevent abuse. <a href="#" className="underline dark:text-gray-900 border-gray-500 text-gray-600">Learn more.</a></p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 border-b border-gray-200 pb-2 mb-2 px-2">
                  <span className="flex-1">API key</span>
                  <span className="w-24 text-right">Created at</span>
                  <span className="w-24 text-right">Last used</span>
                </div>
                {keys.map((k, index) => (
                   <div key={index} className="flex items-center justify-between text-sm border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 mb-2 shadow-sm">
                      <span className="flex-1 font-mono text-gray-600">{k.key}</span>
                      <span className="w-24 text-right text-gray-500 text-xs">{new Date(k.createdAt).toLocaleDateString()}</span>
                      <span className="w-24 text-right text-gray-400 text-xs">{k.lastUsed}</span>
                   </div>
                ))}
                
                <p className="text-xs text-gray-500 mt-4">For information about how to use the API, see the API documentation.</p>
              </section>
            </>
          )}

        </div>
        
        {/* Absolute Save overlay */}
        <div className="absolute top-5 right-6">
           <button onClick={onClose} className="bg-white hover:bg-gray-50 text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm border border-gray-200 transition">
             Save changes
           </button>
        </div>
      </div>
    </div>
  );
}
