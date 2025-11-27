'use client';

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface ColumnHeaderProps {
    title: string;
    count: number;
    sortKey?: 'marketCap' | 'volume24h' | 'price';
    currentSort?: {
        key: 'marketCap' | 'volume24h' | 'price';
        direction: 'asc' | 'desc';
    };
    onSort?: (key: 'marketCap' | 'volume24h' | 'price') => void;
}

export function ColumnHeader({ title, count, sortKey, currentSort, onSort }: ColumnHeaderProps) {
    const isActive = sortKey && currentSort?.key === sortKey;
    const isAsc = isActive && currentSort?.direction === 'asc';

    return (
        <div className="flex items-center justify-between bg-[#0b0b0d] px-5 py-5 border-b border-primaryStroke/20">
            {/* Title */}
            <h2 className="text-base font-bold text-white whitespace-nowrap">
                {title}
            </h2>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
                {/* Display Mode Toggles (P1, P2, P3) */}
                <div className="flex items-center gap-0.5">
                    <button className="p-1.5 rounded hover:bg-[#1a1d20] transition-colors group">
                        <svg className="w-4 h-4 text-slate-500 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                        </svg>
                    </button>
                    <button className="p-1.5 rounded hover:bg-[#1a1d20] transition-colors group">
                        <div className="w-4 h-4 relative">
                            <img src="/assets/solana.png" alt="SOL" className="w-full h-full object-contain" />
                        </div>
                    </button>
                </div>

                {/* Preset Buttons */}
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                    <button className="px-1.5 hover:text-white transition-colors">P1</button>
                    <button className="px-1.5 hover:text-white transition-colors">P2</button>
                    <button className="px-1.5 hover:text-white transition-colors">P3</button>
                </div>

                <div className="w-px h-4 bg-primaryStroke/20"></div>

                {/* Action Icons */}
                <div className="flex items-center gap-2">
                    <button className="hover:opacity-80 transition-opacity">
                        <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                    </button>
                    <button className="hover:opacity-80 transition-opacity">
                        <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                    <button className="hover:opacity-80 transition-opacity">
                        <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="21" x2="4" y2="14" />
                            <line x1="4" y1="10" x2="4" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12" y2="3" />
                            <line x1="20" y1="21" x2="20" y2="16" />
                            <line x1="20" y1="12" x2="20" y2="3" />
                            <line x1="1" y1="14" x2="7" y2="14" />
                            <line x1="9" y1="8" x2="15" y2="8" />
                            <line x1="17" y1="16" x2="23" y2="16" />
                        </svg>
                    </button>
                </div>

                <div className="w-px h-4 bg-primaryStroke/20"></div>

                {/* Sort Button */}
                {sortKey && onSort && (
                    <button
                        onClick={() => onSort(sortKey)}
                        className="p-1 rounded hover:bg-[#1a1d20] transition-colors"
                    >
                        {isActive ? (
                            isAsc ? <ArrowUp className="w-4 h-4 text-blue-500" /> : <ArrowDown className="w-4 h-4 text-blue-500" />
                        ) : (
                            <ArrowUpDown className="w-4 h-4 text-blue-500" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
