'use client';

import { useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Token } from '@/types';
import { Globe, Twitter, MessageCircle } from 'lucide-react';

interface TokenHoverCardProps {
    token: Token;
    children: React.ReactNode;
}

function formatNumber(num: number): string {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return `${num.toFixed(0)}`;
}

function formatTime(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d`;
    return `${Math.floor(seconds / 2592000)}mo`;
}

export function TokenHoverCard({ token, children }: TokenHoverCardProps) {
    const [open, setOpen] = useState(false);

    const handleMouseEnter = () => setOpen(true);
    const handleMouseLeave = () => setOpen(false);

    // Use reusedImageTokens if available, otherwise use similarTokens
    const relatedTokens = token.reusedImageTokens || token.similarTokens || [];

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
                    className="z-50 w-[360px] rounded-2xl bg-[#000000] shadow-2xl animate-in fade-in-0 zoom-in-95 overflow-hidden"
                    side="bottom"
                    align="start"
                    sideOffset={8}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Smaller Token Image - centered with white background */}
                    <div className="w-full bg-white flex items-center justify-center p-8">
                        <div className="w-48 h-48">
                            <img
                                src={token.avatar}
                                alt={token.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 bg-[#000000]">
                        {/* Token Name and Time */}
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-white font-bold text-lg">{token.name}</h3>
                            <span className="text-green-400 text-xs font-medium">{formatTime(token.createdAtSecondsAgo)} ago</span>
                        </div>

                        {/* Symbol */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-slate-500 text-sm">{token.symbol}</span>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mb-4">
                            <a href="#" className="text-slate-500 hover:text-white transition-colors">
                                <Globe className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-500 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-500 hover:text-white transition-colors">
                                <MessageCircle className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Similar Tokens Section */}
                        {relatedTokens.length > 0 && (
                            <div className="pt-4">
                                <h4 className="text-slate-600 text-xs mb-3">Similar Tokens</h4>
                                <div className="space-y-3">
                                    {relatedTokens.map((relatedToken) => (
                                        <div
                                            key={relatedToken.id}
                                            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
                                        >
                                            <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-white">
                                                <img
                                                    src={relatedToken.avatar}
                                                    alt={relatedToken.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-white font-medium text-sm">{relatedToken.name}</div>
                                                <div className="text-slate-600 text-xs">TX: {relatedToken.timeAgo}</div>
                                            </div>
                                            <div className="text-yellow-600 font-semibold text-sm">
                                                {formatNumber(relatedToken.marketCap)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
}
