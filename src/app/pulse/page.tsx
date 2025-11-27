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

            {/* Pulse Header */}
            <div className="mx-auto max-w-[1800px] pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-white">Pulse</h1>
                        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#1a1d20] border border-primaryStroke/30">
                            <div className="w-4 h-4 relative">
                                <img src="/assets/solana.png" alt="Solana" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xs font-bold text-slate-400">SOL</span>
                        </div>
                        <button className="p-1.5 rounded hover:bg-[#1a1d20] transition-colors">
                            <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="5" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="12" cy="19" r="2" />
                            </svg>
                        </button>
                    </div>

                    {/* Global Display Controls */}
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1d20] border border-primaryStroke/30 hover:bg-[#25282c] transition-colors">
                            <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                <line x1="3" y1="18" x2="3.01" y2="18" />
                            </svg>
                            <span className="text-sm font-medium text-slate-300">Display</span>
                            <svg className="w-3 h-3 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-2 text-slate-400">
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
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1d20] border border-primaryStroke/30 ml-2">
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
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
                    <TokenList
                        title="New Pairs"
                        tokens={newPairs}
                        onTokenClick={setSelectedToken}
                        className="rounded-l-xl border-y border-l border-r-0"
                    />
                    <TokenList
                        title="Final Stretch"
                        tokens={finalStretch}
                        onTokenClick={setSelectedToken}
                        className="border-y border-l border-r-0"
                    />
                    <TokenList
                        title="Migrated"
                        tokens={migrated}
                        onTokenClick={setSelectedToken}
                        className="rounded-r-xl border"
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
