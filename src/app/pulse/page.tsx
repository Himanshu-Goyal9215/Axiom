'use client';

import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectGroupedTokens } from '@/store/tokensSlice';
import { TokenList } from '@/components/molecules/TokenList';
import { TokenDetailModal } from '@/components/organisms/TokenDetailModal';
import { NewTokenToast } from '@/components/molecules/NewTokenToast';
import { useTokenData } from '@/hooks/useTokenData';
import { useDynamicTokenUpdates } from '@/hooks/useDynamicTokenUpdates';
import { Token } from '@/types';

export default function PulsePage() {
    const { isLoading, error } = useTokenData();
    useDynamicTokenUpdates(); // Enable real-time updates

    const { newPairs, finalStretch, migrated } = useAppSelector(selectGroupedTokens);
    const [selectedToken, setSelectedToken] = useState<Token | null>(null);
    const [newToken, setNewToken] = useState<Token | null>(null);

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center p-4">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    <p className="mt-4 text-sm text-muted">Loading tokens...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center p-4">
                <div className="text-center">
                    <p className="text-sm text-accent-red">Error loading tokens</p>
                    <p className="mt-2 text-xs text-muted">{error.message}</p>
                </div>
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-background px-4 md:px-6">
            <NewTokenToast token={newToken} onClose={() => setNewToken(null)} />

            {/* Pulse Header & Controls */}
            <div className="mx-auto max-w-[1600px] pt-12 pb-4">
                <div className="flex items-end justify-between mb-4">
                    {/* Left: Title & Chain Indicator */}
                    <div className="flex items-center gap-4 mb-1">
                        <h1 className="text-[22px] font-bold text-white tracking-tight leading-none">Pulse</h1>
                        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#18181b] border border-primaryStroke">
                            <div className="w-4 h-4 relative">
                                <img src="/assets/solana.png" alt="Solana" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xs font-bold text-slate-400">SOL</span>
                        </div>
                        <button className="p-1 rounded hover:bg-[#18181b] transition-colors text-slate-500">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="5" cy="12" r="2" />
                                <circle cx="19" cy="12" r="2" />
                            </svg>
                        </button>

                        {/* Star Icon */}
                        <button className="p-1.5 hover:bg-[#18181b] transition-colors text-slate-500 hover:text-white">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        </button>

                        {/* Settings Icon */}
                        <button className="p-1.5 hover:bg-[#18181b] transition-colors text-slate-500 hover:text-white">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                            </svg>
                        </button>
                    </div>

                    {/* Right: Global Display Controls */}
                    <div className="flex items-center gap-4">
                        {/* Question Mark Icon */}
                        <button className="p-1.5 hover:bg-[#18181b] transition-colors text-slate-500 hover:text-white">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </button>

                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181b] border border-primaryStroke hover:bg-[#27272a] transition-colors group">
                            <svg className="w-4 h-4 text-slate-400 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                            </svg>
                            <span className="text-sm font-medium text-slate-300 group-hover:text-white">Display</span>
                            <svg className="w-3 h-3 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-1 text-slate-400">
                            <button className="p-1.5 hover:text-white transition-colors">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>
                            </button>
                            <button className="p-1.5 hover:text-white transition-colors">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <line x1="9" y1="3" x2="9" y2="21" />
                                </svg>
                            </button>
                            <button className="p-1.5 hover:text-white transition-colors">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                </svg>
                            </button>
                            <button className="p-1.5 hover:text-white transition-colors">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181b] border border-primaryStroke ml-2">
                                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <path d="M9 3v18" />
                                </svg>
                                <span className="text-sm font-medium text-white">1</span>
                                <div className="w-px h-3 bg-slate-600 mx-1"></div>
                                <span className="text-sm font-medium text-slate-400">0</span>
                                <svg className="w-3 h-3 text-slate-500 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[1600px]">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <TokenList
                        title="New Pairs"
                        tokens={newPairs}
                        onTokenClick={setSelectedToken}
                        className="border border-primaryStroke bg-[#111111]"
                    />
                    <TokenList
                        title="Final Stretch"
                        tokens={finalStretch}
                        onTokenClick={setSelectedToken}
                        className="border border-primaryStroke bg-[#111111]"
                    />
                    <TokenList
                        title="Migrated"
                        tokens={migrated}
                        onTokenClick={setSelectedToken}
                        className="border border-primaryStroke bg-[#111111]"
                    />
                </div>
            </div>

            <TokenDetailModal
                token={selectedToken}
                isOpen={!!selectedToken}
                onClose={() => setSelectedToken(null)}
            />
        </div>
    );
}
