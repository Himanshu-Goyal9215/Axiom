'use client';

import { Zap, Wallet, Twitter, Compass, Activity, Hash, TrendingUp, DollarSign, Globe, FileText } from 'lucide-react';

export function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a] border-t border-primaryStroke">
            <div className="flex items-center justify-between px-4 h-12">
                {/* Left: PRESET 1 & Action Buttons */}
                <div className="flex items-center gap-3">
                    {/* PRESET 1 Button */}
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#3b82f6]/10 border border-[#3b82f6]/30 hover:bg-[#3b82f6]/20 transition-colors">
                        <Zap className="w-4 h-4 text-[#3b82f6]" />
                        <span className="text-sm font-medium text-[#3b82f6]">PRESET 1</span>
                    </button>

                    {/* Wallet Button */}
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-backgroundSecondary hover:bg-primaryStroke/50 transition-colors">
                        <Wallet className="w-4 h-4 text-textSecondary" />
                        <span className="text-sm text-textSecondary">Wallet</span>
                    </button>

                    {/* Twitter Button */}
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-backgroundSecondary hover:bg-primaryStroke/50 transition-colors">
                        <Twitter className="w-4 h-4 text-textSecondary" />
                        <span className="text-sm text-textSecondary">Twitter</span>
                    </button>

                    {/* Discover Button */}
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-backgroundSecondary hover:bg-primaryStroke/50 transition-colors">
                        <Compass className="w-4 h-4 text-textSecondary" />
                        <span className="text-sm text-textSecondary">Discover</span>
                    </button>

                    {/* Pulse Button */}
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-backgroundSecondary hover:bg-primaryStroke/50 transition-colors">
                        <Activity className="w-4 h-4 text-textSecondary" />
                        <span className="text-sm text-textSecondary">Pulse</span>
                    </button>

                    {/* PNL Indicator */}
                    <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5">
                        <Hash className="w-4 h-4 text-textTertiary" />
                        <span className="text-sm font-medium text-primaryGreen">PNL</span>
                    </div>

                    {/* Additional Stats */}
                    <div className="hidden xl:flex items-center gap-4 ml-2">
                        <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-primaryGreen" />
                            <span className="text-sm text-textSecondary">$137k</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4 text-textTertiary" />
                            <span className="text-sm text-textSecondary">$1125.91</span>
                        </div>
                    </div>
                </div>

                {/* Right: Status & Settings */}
                <div className="flex items-center gap-3">
                    {/* Connection Status */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-primaryGreen/10">
                        <div className="w-2 h-2 rounded-full bg-primaryGreen animate-pulse"></div>
                        <span className="text-xs font-medium text-primaryGreen">Connection is stable</span>
                    </div>

                    {/* GLOBAL Dropdown */}
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-backgroundSecondary hover:bg-primaryStroke/50 transition-colors">
                        <Globe className="w-4 h-4 text-textSecondary" />
                        <span className="text-sm text-textSecondary">GLOBAL</span>
                        <svg className="w-3 h-3 text-textTertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Icon Buttons */}
                    <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded hover:bg-backgroundSecondary transition-colors">
                            <svg className="w-5 h-5 text-textSecondary" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                            </svg>
                        </button>
                        <button className="p-1.5 rounded hover:bg-backgroundSecondary transition-colors">
                            <svg className="w-5 h-5 text-textSecondary" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </button>
                        <button className="p-1.5 rounded hover:bg-backgroundSecondary transition-colors">
                            <svg className="w-5 h-5 text-textSecondary" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                        </button>
                        <button className="p-1.5 rounded hover:bg-backgroundSecondary transition-colors">
                            <svg className="w-5 h-5 text-textSecondary" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </button>
                        <button className="p-1.5 rounded hover:bg-backgroundSecondary transition-colors">
                            <FileText className="w-5 h-5 text-textSecondary" />
                        </button>
                    </div>

                    {/* Docs Link */}
                    <a
                        href="#"
                        className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-backgroundSecondary transition-colors"
                    >
                        <span className="text-sm text-textSecondary">Docs</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
