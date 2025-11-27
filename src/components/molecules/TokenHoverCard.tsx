'use client';

import { useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Token } from '@/types';
import { Globe, Twitter, MessageCircle, Copy, ShieldCheck, AlertTriangle, Lock } from 'lucide-react';

interface TokenHoverCardProps {
    token: Token;
    children: React.ReactNode;
}

function formatNumber(num: number): string {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
}

function formatTime(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
}

export function TokenHoverCard({ token, children }: TokenHoverCardProps) {
    const [open, setOpen] = useState(false);

    const handleMouseEnter = () => setOpen(true);
    const handleMouseLeave = () => setOpen(false);

    return (
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
            <PopoverPrimitive.Trigger asChild>
                <div
                    className="inline-block"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {children}
                </div>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    className="z-50 w-[320px] rounded-xl border border-primaryStroke/50 bg-[#0b0b0d] shadow-2xl animate-in fade-in-0 zoom-in-95 p-4"
                    side="bottom"
                    align="start"
                    sideOffset={5}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-slate-800 flex-shrink-0 border border-primaryStroke/30">
                            <img src={token.avatar} alt={token.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-bold text-sm truncate">{token.name}</h3>
                                <span className="text-green-400 text-xs font-mono">{formatTime(token.createdAtSecondsAgo)} ago</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-slate-500 text-xs">{token.symbol}</span>
                                <Copy className="w-3 h-3 text-slate-600 cursor-pointer hover:text-slate-400" />
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Globe className="w-3.5 h-3.5" /></a>
                                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
                                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><MessageCircle className="w-3.5 h-3.5" /></a>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-[#1a1d20]/50 rounded p-2 border border-primaryStroke/20">
                            <div className="text-[10px] text-slate-500 mb-0.5">Market Cap</div>
                            <div className="text-white font-bold text-sm">{formatNumber(token.marketCap)}</div>
                        </div>
                        <div className="bg-[#1a1d20]/50 rounded p-2 border border-primaryStroke/20">
                            <div className="text-[10px] text-slate-500 mb-0.5">Liquidity</div>
                            <div className="text-white font-bold text-sm">{formatNumber(token.liquidityUSD || 0)}</div>
                        </div>
                        <div className="bg-[#1a1d20]/50 rounded p-2 border border-primaryStroke/20">
                            <div className="text-[10px] text-slate-500 mb-0.5">Volume (24h)</div>
                            <div className="text-white font-bold text-sm">{formatNumber(token.volume24h)}</div>
                        </div>
                        <div className="bg-[#1a1d20]/50 rounded p-2 border border-primaryStroke/20">
                            <div className="text-[10px] text-slate-500 mb-0.5">Transactions</div>
                            <div className="text-white font-bold text-sm">{token.tx24h}</div>
                        </div>
                    </div>

                    {/* Security Checks */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Mint Authority</span>
                            <div className="flex items-center gap-1 text-green-400">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Disabled</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Freeze Authority</span>
                            <div className="flex items-center gap-1 text-green-400">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Disabled</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">LP Status</span>
                            <div className="flex items-center gap-1 text-green-400">
                                <Lock className="w-3 h-3" />
                                <span>Burned</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-primaryStroke/20 mt-2">
                            <span className="text-slate-400">Top 10 Holders</span>
                            <span className="text-blue-400 font-medium">{token.topHoldersPercent}%</span>
                        </div>
                    </div>
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
}
