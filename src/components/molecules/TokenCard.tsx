'use client';

import { memo, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Token } from '@/types';
import { formatNumber, formatTimeAgo, formatPrice, formatPercentage } from '@/lib/formatters';
import { Search, ExternalLink } from 'lucide-react';
import { TokenHoverCard } from './TokenHoverCard';

interface TokenCardProps {
    id: string;
    onClick: () => void;
}

export const TokenCard = memo(({ id, onClick }: TokenCardProps) => {
    const token = useAppSelector((state) => state.tokens.entities[id]);
    const [flash, setFlash] = useState<'up' | 'down' | null>(null);
    const [prevPrice, setPrevPrice] = useState(token?.price || 0);

    useEffect(() => {
        if (!token) return;

        if (token.price > prevPrice) {
            setFlash('up');
            setTimeout(() => setFlash(null), 500);
        } else if (token.price < prevPrice) {
            setFlash('down');
            setTimeout(() => setFlash(null), 500);
        }

        setPrevPrice(token.price);
    }, [token?.price]);

    if (!token) return null;

    const isPositive1h = token.change1h > 0;
    const isPositive24h = token.change24h > 0;

    return (
        <TokenHoverCard token={token}>
            <div
                onClick={onClick}
                className="group relative rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:border-border-hover hover:bg-card-hover cursor-pointer"
            >
                {/* Top Row: Avatar, Symbol/Name, Time, Badges */}
                <div className="flex items-start gap-2 mb-2">
                    <img
                        src={token.avatar}
                        alt={token.name}
                        className="h-8 w-8 rounded-full flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground truncate">
                                {token.symbol}
                            </span>
                            {token.flags?.includes('DS') && (
                                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-accent-yellow/10 text-accent-yellow rounded">
                                    DS
                                </span>
                            )}
                            {token.flags?.includes('locked') && (
                                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-accent-green/10 text-accent-green rounded">
                                    🔒
                                </span>
                            )}
                        </div>
                        <div className="text-xs text-muted truncate">{token.name}</div>
                    </div>

                    <div className="text-xs text-muted whitespace-nowrap">
                        {formatTimeAgo(token.createdAtSecondsAgo)}
                    </div>
                </div>

                {/* Bottom Row: Metrics */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <div>
                        <span className="text-muted">MC: </span>
                        <span className="text-foreground font-medium">${formatNumber(token.marketCap)}</span>
                    </div>
                    <div>
                        <span className="text-muted">Vol: </span>
                        <span className="text-foreground font-medium">${formatNumber(token.volume24h)}</span>
                    </div>
                    <div className="col-span-2">
                        <span
                            className={`font-semibold transition-all duration-300 ${flash === 'up' ? 'animate-flash-up text-accent-green' :
                                flash === 'down' ? 'animate-flash-down text-accent-red' :
                                    'text-foreground'
                                }`}
                        >
                            {formatPrice(token.price)}
                        </span>
                        <span className={`ml-2 text-xs ${isPositive1h ? 'text-accent-green' : 'text-accent-red'}`}>
                            {formatPercentage(token.change1h)} 1h
                        </span>
                        <span className={`ml-2 text-xs ${isPositive24h ? 'text-accent-green' : 'text-accent-red'}`}>
                            {formatPercentage(token.change24h)} 24h
                        </span>
                    </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle search action
                        }}
                        className="p-1.5 rounded bg-card-hover hover:bg-border transition-colors"
                    >
                        <Search className="h-3.5 w-3.5 text-secondary" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle external link action
                        }}
                        className="p-1.5 rounded bg-card-hover hover:bg-border transition-colors"
                    >
                        <ExternalLink className="h-3.5 w-3.5 text-secondary" />
                    </button>
                </div>
            </div>
        </TokenHoverCard>
    );
});

TokenCard.displayName = 'TokenCard';
