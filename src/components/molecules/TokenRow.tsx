'use client';

import { memo, useEffect, useState, useRef } from 'react';
import { Token } from '@/types';
import { Search, ExternalLink, Users, Trophy, Crown, Copy } from 'lucide-react';
import { TokenHoverCard } from './TokenHoverCard';

interface TokenRowProps {
    token: Token;
}

function formatTime(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
}

function formatNumber(num: number): string {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
}

export const TokenRow = memo(function TokenRow({ token }: TokenRowProps) {
    const [flash, setFlash] = useState(false);
    const prevPriceRef = useRef<number>();
    const isNew = token.createdAtSecondsAgo < 10;

    useEffect(() => {
        if (prevPriceRef.current !== undefined && prevPriceRef.current !== token.price) {
            setFlash(true);
            const timer = setTimeout(() => setFlash(false), 500);
            return () => clearTimeout(timer);
        }
        prevPriceRef.current = token.price;
    }, [token?.price]);

    if (!token) return null;

    return (
        <div className={`relative flex items-center gap-3 px-4 py-3 hover:bg-[#1a1d20] transition-colors border-b border-primaryStroke/10 group ${isNew ? 'bg-blue-500/5' : ''}`}>
            {/* New Token Glow Effect */}
            {isNew && (
                <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none" />
            )}

            {/* Token Image */}
            <TokenHoverCard token={token}>
                <div className="relative w-[56px] h-[56px] flex-shrink-0 cursor-pointer">
                    <img
                        src={token.avatar}
                        alt={token.name}
                        className={`w-full h-full rounded-lg object-cover border ${isNew ? 'border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.3)]' : 'border-primaryStroke/30'}`}
                    />
                    {token.virtualCurve && (
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#6366f1] rounded-full border-[2px] border-[#0b0b0d]"></div>
                    )}
                </div>
            </TokenHoverCard>

            {/* Middle: Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                {/* Row 1: Symbol & Name */}
                <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-white truncate leading-none">{token.symbol}</span>
                    <span className="text-[13px] text-slate-500 truncate leading-none font-medium">{token.name}</span>
                    <Copy className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                </div>

                {/* Row 2: Stats (No Wrap) */}
                <div className="flex items-center gap-3 text-[11px] leading-none text-slate-400 whitespace-nowrap overflow-hidden">
                    <span className="font-bold text-green-400">{formatTime(token.createdAtSecondsAgo)}</span>
                    <div className="flex items-center gap-1">
                        <ExternalLink className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                        <Search className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                    </div>

                    <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{token.holders}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 20V10" />
                            <path d="M18 20V4" />
                            <path d="M6 20v-4" />
                        </svg>
                        <span>1</span>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-500">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{token.qualityScore || 0}/10</span>
                    </div>

                    <div className="flex items-center gap-1 text-purple-400">
                        <Crown className="w-3.5 h-3.5" />
                        <span>{token.kingScore?.current || 0}/{token.kingScore?.max || 10}</span>
                    </div>
                </div>

                {/* Row 3: Badges */}
                <div className="flex items-center gap-1.5 mt-0.5 overflow-hidden">
                    {token.snipersHoldingPercent !== undefined && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20">
                            <span className="text-[10px] font-medium text-red-400 whitespace-nowrap">👻 {token.snipersHoldingPercent}%</span>
                        </div>
                    )}
                    {token.bondingCurveProgress !== undefined && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-500/10 border border-green-500/20">
                            <span className="text-[10px] font-medium text-green-400 whitespace-nowrap">💊 {token.bondingCurveProgress}%</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-500/10 border border-green-500/20">
                        <span className="text-[10px] font-medium text-green-400 whitespace-nowrap">🔒 0%</span>
                    </div>
                </div>
            </div>

            {/* Right: Market Data */}
            <div className="flex flex-col items-end gap-1 text-right flex-shrink-0 min-w-[80px]">
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-medium">MC</span>
                    <span className={`text-[13px] font-bold ${flash ? 'text-green-400' : 'text-white'}`}>
                        {formatNumber(token.marketCap)}
                    </span>
                </div>

                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-medium">V</span>
                    <span className="text-[11px] font-bold text-white">{formatNumber(token.volume24h)}</span>
                </div>

                <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-slate-500 font-medium">F</span>
                    <span className="text-[10px] text-slate-300">0.02</span>
                    <span className="text-[10px] text-slate-500 font-medium">TX</span>
                    <span className="text-[10px] text-slate-300">{token.tx24h}</span>

                    {/* Progress Bar */}
                    <div className="w-8 h-1.5 bg-slate-800 rounded-full overflow-hidden ml-1">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 to-green-400"
                            style={{ width: `${Math.min(token.tx24h, 100)}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
