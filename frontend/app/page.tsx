"use client";
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import Badge from '@/app/components/Badge';
import { getDashboardStats } from '@/services/dashboardService';
import { remixProject } from '@/services/projectService';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [remixToast, setRemixToast] = useState<{ show: boolean, id: string | null }>({ show: false, id: null });
  const [chatInput, setChatInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'agent', text: string}>>([
    { role: 'agent', text: 'Welcome to your Workspace. How can I help you manage your projects today?' }
  ]);
  const router = useRouter();

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isSending) return;
    
    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsSending(true);
    setShowLog(true);

    try {
      const { chatWithAgent } = await import('@/services/projectService');
      const data = await chatWithAgent(userMsg);
      setMessages(prev => [...prev, { role: 'agent', text: data.agentResponse }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'agent', text: "Sorry, I had trouble connecting. Is your backend running?" }]);
    } finally {
      setIsSending(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleRemix = async () => {
    try {
      const data = await remixProject('');
      setRemixToast({ show: true, id: data.newProjectId });
      
      // Refresh stats to show new counts
      loadStats();
      
      // Auto-hide toast after 10 seconds if not clicked
      setTimeout(() => setRemixToast({ show: false, id: null }), 10000);
    } catch (err) {
      console.error("Remix failed", err);
      alert("Backend error: Make sure your server is running and restarted!");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
           <div>
             <h1 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Curator Workspace</h1>
             <h2 className="text-4xl font-bold text-[var(--foreground)]">Management Dashboard</h2>
           </div>
           <div className="flex items-center gap-4">
              {stats?.currentBranch && (
                <Badge className="hidden md:flex">
                  {stats.currentBranch}
                </Badge>
              )}
              <button className="p-2 border border-[var(--panel-border)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </button>
              <div className="w-10 h-10 rounded-full border border-[var(--panel-border)] overflow-hidden shadow-sm">
                <img src="https://i.pravatar.cc/100" alt="Profile" className="w-full h-full object-cover" />
              </div>
           </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           <div className="bg-[var(--panel-bg)] border border-[var(--panel-border)] p-6 rounded-[2rem] shadow-sm">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Active</span>
             <div className="text-4xl font-bold mt-1">{stats?.activeProjects || 0}</div>
             <div className="text-xs text-green-500 font-medium mt-2">+2 from last week</div>
           </div>
           <div className="bg-[var(--panel-bg)] border border-[var(--panel-border)] p-6 rounded-[2rem] shadow-sm">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Pending</span>
             <div className="text-4xl font-bold mt-1">{stats?.pendingApprovals || 0}</div>
             <div className="text-xs text-orange-500 font-medium mt-2">Awaiting review</div>
           </div>
        </section>

        <section className="space-y-6">
           <div className="flex justify-between items-end">
             <h3 className="text-xl font-bold">Recent Projects</h3>
             <button onClick={handleRemix} className="bg-[var(--accent)] text-[var(--background)] px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-gray-200 dark:shadow-none hover:scale-105 transition">
               Remix Project
             </button>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {stats?.recentActivity.map((activity: any) => (
                <div key={activity.id} className="group cursor-pointer">
                  <div className="aspect-video bg-gray-100 dark:bg-[#1a1c1e] rounded-[2.5rem] border border-[var(--panel-border)] overflow-hidden mb-4 relative transition-all group-hover:border-gray-400 group-hover:shadow-xl">
                      {/* Dummy Canvas Preview */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition">
                         <div className="w-1/2 h-1/2 border-2 border-[var(--foreground)] rounded-xl transform rotate-12"></div>
                      </div>
                  </div>
                  <div className="px-2">
                    <h4 className="font-bold text-lg mb-0.5">{activity.name}</h4>
                    <span className="text-sm text-gray-500">Last edited {activity.time}</span>
                  </div>
                </div>
              ))}
           </div>
        </section>

        {/* New Interactive Hero & Next Steps Section (User Request) */}
        <div id="center" className="mt-20 mb-12 relative z-10">
           <div className="hero">
              <div className="base bg-blue-500/10 rounded-full blur-3xl w-40 h-40 absolute"></div>
              <div className="framework text-4xl">🎨</div>
              <div className="vite text-3xl opacity-50">✨</div>
           </div>
           <button className="counter">
              <span>View workspace analytics</span>
           </button>
        </div>

        <div id="next-steps" className="mb-20 relative z-10">
           <div id="docs">
              <div className="icon">📄</div>
              <h4 className="font-bold mb-2">Read Documentation</h4>
              <p className="text-sm text-gray-500">Learn how to use Serexa to its full potential.</p>
              <ul>
                <li><a href="#">Quickstart</a></li>
                <li><a href="#">API Ref</a></li>
              </ul>
           </div>
           <div className="px-8">
              <div className="icon">🚀</div>
              <h4 className="font-bold mb-2">Next Steps</h4>
              <p className="text-sm text-gray-500">Take your first project to production.</p>
              <ul>
                <li><a href="#">Deploy App</a></li>
                <li><a href="#">Share</a></li>
              </ul>
           </div>
        </div>
      </div>
      
      {/* Remix Success Toast as seen in Screenshot */}
      {remixToast.show && (
        <div className="absolute bottom-32 right-1/2 transform translate-x-1/2 md:translate-x-0 md:right-32 z-50 animate-bounce-in">
          <div className="bg-[var(--panel-bg)] backdrop-blur-xl border border-[var(--panel-border)] rounded-[2rem] p-4 shadow-2xl flex items-center gap-6 pr-6">
            <span className="ml-4 text-sm font-medium text-gray-700 dark:text-gray-300">Finished creating your remix!</span>
            <button 
              onClick={() => router.push(`/projects/${remixToast.id}`)}
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition"
            >
              Open project
            </button>
            <button 
               onClick={() => setRemixToast({ show: false, id: null })}
               className="text-gray-400 hover:text-gray-600 transition p-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Agent Log Pill - Consistent with Project View */}
      <div className={`fixed bottom-8 left-10 z-20 pointer-events-auto transition-all ${showLog ? 'w-80' : 'w-48'} hover:-translate-y-1`}>
         <div className="bg-white/80 dark:bg-[#232629]/80 backdrop-blur-xl border border-[var(--panel-border)] rounded-2xl overflow-hidden shadow-2xl">
            {showLog && (
              <div className="max-h-64 overflow-y-auto p-4 space-y-4 border-b border-[var(--panel-border)]">
                 {messages.map((msg, i) => (
                   <div key={i} className={`text-[11px] leading-relaxed ${msg.role === 'user' ? 'text-blue-500 font-bold' : 'text-gray-600 dark:text-gray-400'}`}>
                      <span className="uppercase tracking-widest opacity-50 block mb-1">{msg.role === 'user' ? 'You' : 'Agent'}</span>
                      {msg.text}
                   </div>
                 ))}
              </div>
            )}
            <div 
              onClick={() => setShowLog(!showLog)}
              className="px-5 py-4 flex justify-between items-center text-xs font-bold text-gray-800 dark:text-gray-200 cursor-pointer"
            >
               <div className="flex items-center gap-2">
                  <span className="scale-125">{isSending ? '♻️' : '⚙️'}</span> <span>Agent log</span>
               </div>
               <span className={`transition-transform opacity-40 ${showLog ? 'rotate-180' : ''}`}>▼</span>
            </div>
         </div>
      </div>

      {/* Search Overlay - Now Functional */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-xl z-10">
         <div className="bg-white/90 dark:bg-[#232629]/90 backdrop-blur-2xl border border-[var(--panel-border)] rounded-[2rem] p-3 shadow-2xl flex items-center gap-4">
            <span className="ml-4 text-gray-400 font-medium whitespace-nowrap hidden md:inline">What would you like to change or create?</span>
            <div className="flex-1 h-12 bg-white dark:bg-[#1a1c1e] rounded-2xl border border-[var(--panel-border)] flex items-center px-4">
               <input 
                 type="text"
                 className="bg-transparent border-none outline-none w-full text-sm font-medium"
                 placeholder="..."
                 value={chatInput}
                 onChange={(e) => setChatInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
               />
            </div>
            <button 
               onClick={handleSendMessage}
               disabled={isSending}
               className={`w-10 h-10 ${isSending ? 'bg-gray-400' : 'bg-black dark:bg-white text-white dark:text-black'} rounded-[1.2rem] flex items-center justify-center shadow-lg transform rotate-45 group hover:rotate-0 transition`}
            >
                <span className={`transform ${isSending ? '' : '-rotate-45 group-hover:rotate-0'} transition text-sm`}>
                   {isSending ? '...' : '🚀'}
                </span>
            </button>
         </div>
      </div>
    </DashboardLayout>
  );
}
