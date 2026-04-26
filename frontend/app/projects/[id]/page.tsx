"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/app/components/DashboardLayout';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;
  const [showCreatedToast, setShowCreatedToast] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'agent', text: string}>>([
    { role: 'agent', text: 'Prototype created! Your screens are connected and ready to interact.' }
  ]);

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
      setMessages(prev => [
        ...prev, 
        { role: 'agent', text: data.agentResponse }
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'agent', text: "Sorry, I had trouble connecting. Is the backend running?" }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-10 overflow-hidden relative flex flex-col h-full bg-[#f8f9fa] dark:bg-[#16181a]">
        
        {/* Top Navigation Bar */}
        <header className="flex justify-between items-center mb-10 z-10">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 border border-[var(--panel-border)] rounded-full flex items-center justify-center bg-white dark:bg-[#232629] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition shadow-sm" onClick={() => router.push('/')}>
                <span className="text-lg">☰</span>
             </div>
             <span className="text-sm font-medium text-gray-500 dark:text-gray-400">serexa - user dashboard</span>
           </div>
           
           <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-[#232629] text-[var(--foreground)] rounded-full text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                Remix
              </button>
              <div className="w-10 h-10 rounded-full border border-[var(--panel-border)] overflow-hidden shadow-sm">
                <img src="https://i.pravatar.cc/100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
           </div>
        </header>

        {/* Main Canvas Area */}
        <div className="flex-1 relative mb-24">
           {/* Grid Layout of Samples */}
           <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 flex gap-6 opacity-80 pointer-events-none">
              <div className="w-48 aspect-video bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-xl shadow-lg relative overflow-hidden">
                 <img src="https://i.pravatar.cc/400?u=d1" className="w-full h-full object-cover opacity-60" />
                 <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white bg-black/40 px-2 py-0.5 rounded-full">User Dashboard</div>
              </div>
              <div className="w-48 aspect-video bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-xl shadow-lg relative overflow-hidden">
                 <img src="https://i.pravatar.cc/400?u=d2" className="w-full h-full object-cover opacity-60" />
                 <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white bg-black/40 px-2 py-0.5 rounded-full">User Settings</div>
              </div>
              <div className="w-48 aspect-video bg-[var(--panel-bg)] border-2 border-blue-500 rounded-xl shadow-2xl relative overflow-hidden">
                 <img src="https://i.pravatar.cc/400?u=d3" className="w-full h-full object-cover" />
                 <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white">▶</div>
              </div>
           </div>

           {/* Prototype Created Overlay */}
           {showCreatedToast && (
             <div className="absolute left-10 top-1/4 w-72 bg-white/90 dark:bg-[#232629]/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/20 dark:border-white/5 animate-fade-in group">
                <div className="flex items-center justify-between mb-4">
                   <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center text-sm">👁️👁️</div>
                   <button onClick={() => setShowCreatedToast(false)} className="opacity-0 group-hover:opacity-50 transition p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">✕</button>
                </div>
                <h3 className="text-xl font-bold mb-2">Prototype created</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  Your screens are connected and ready to interact. Add, edit and connect more screens to create an interactive app experience.
                </p>
                <button onClick={() => setShowCreatedToast(false)} className="bg-gray-200 dark:bg-[#1a1c1e] px-6 py-2 rounded-full text-sm font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-300 transition">Let's go!</button>
             </div>
           )}
           
           {/* Right Tool Sidebar */}
           <div className="absolute right-0 top-1/3 space-y-4 pr-10">
              {[ {icon: '↖', active: true}, {icon: '◰'}, {icon: '✎'}, {icon: '✋'}, {icon: '📁'}, {icon: '⑊'}, {icon: '☆'} ].map((tool, i) => (
                <div key={i} className={`w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer transition-all ${tool.active ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg scale-110' : 'bg-white dark:bg-[#232629] border border-[var(--panel-border)] text-gray-400 dark:text-gray-500 hover:scale-105'}`}>
                   <span className="text-lg font-bold">{tool.icon}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Bottom Navigation Interface */}
        <div className="fixed bottom-8 left-0 right-0 px-10 flex justify-between items-end z-20 pointer-events-none">
           {/* Agent Log Pill */}
           <div className={`bg-white/80 dark:bg-[#232629]/80 backdrop-blur-xl border border-[var(--panel-border)] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto transition-all ${showLog ? 'w-80' : 'w-48'} hover:-translate-y-1`}>
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

           {/* Central Search Bar */}
           <div className="flex-1 max-w-3xl mx-8 pointer-events-auto">
              <div className="bg-white/90 dark:bg-[#232629]/90 backdrop-blur-2xl border border-[var(--panel-border)] rounded-3xl p-3 shadow-2xl flex items-center gap-2">
                 <div className="flex items-center gap-2 px-2">
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-lg text-gray-500">+</button>
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-lg text-gray-500">◰</button>
                 </div>
                 
                 <div className="flex-1">
                    <input 
                      type="text"
                      className="w-full bg-transparent border-none outline-none text-sm font-medium text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      placeholder="What would you like to change or create?"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                 </div>

                 <div className="flex items-center gap-2 pr-1">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-[#1a1c1e] rounded-full text-[10px] font-bold text-gray-600 dark:text-gray-400 border border-[var(--panel-border)] cursor-pointer hover:bg-gray-200 transition">
                       <span>🎨</span> 3 Flash <span>▼</span>
                    </div>
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-400 group relative">
                       🎙️
                       {isSending && <span className="absolute inset-0 flex items-center justify-center animate-ping text-[8px]">●</span>}
                    </button>
                    <button 
                      onClick={handleSendMessage}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400'}`}
                    >
                       {isSending ? '...' : '↑'}
                    </button>
                 </div>
              </div>
           </div>

           {/* Status Controls */}
           <div className="flex items-center gap-3 pointer-events-auto">
              <div className="p-2 border border-[var(--panel-border)] rounded-lg bg-white/80 dark:bg-[#232629]/80 backdrop-blur-lg shadow-lg">☁️</div>
              <div className="bg-white/80 dark:bg-[#232629]/80 backdrop-blur-lg border border-[var(--panel-border)] rounded-full px-6 py-2.5 text-[11px] font-black shadow-xl flex items-center gap-4">
                 <span className="text-gray-800 dark:text-gray-200">5%</span>
                 <span className="w-px h-3 bg-gray-200 dark:bg-gray-700"></span>
                 <span className="text-gray-400">?</span>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
