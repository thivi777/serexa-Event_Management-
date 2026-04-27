import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    ahead?: number;
    behind?: number;
}

const Badge: React.FC<BadgeProps> = ({ children, className = '', ahead = 0, behind = 0 }) => {
    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-[#ddf4ff] text-[#0969da] text-xs font-semibold rounded-full border border-transparent hover:bg-[#cde9ff] transition-colors cursor-pointer ${className}`}>
            <div className="flex items-center gap-1.5">
                <svg 
                    className="w-3.5 h-3.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
                    />
                </svg>
                {children}
            </div>
            
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/50 rounded-md text-[10px] opacity-80">
                <span className="text-gray-600">{behind}</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">{ahead}</span>
            </div>

            <button className="ml-1 opacity-50 hover:opacity-100 transition-opacity">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </button>
        </div>
    );
};

export default Badge;
