'use client';

import { Token } from '@/types';
import { TokenRow } from './TokenRow';
import { ColumnHeader } from './ColumnHeader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSort } from '@/store/tokensSlice';

interface TokenListProps {
    title: string;
    tokens: Token[];
    onTokenClick: (token: Token) => void;
    className?: string;
}

export function TokenList({ title, tokens, onTokenClick, className }: TokenListProps) {
    const dispatch = useAppDispatch();
    const { sortKey, sortDirection } = useAppSelector((state) => state.tokens);

    const handleSort = (key: 'marketCap' | 'volume24h' | 'price') => {
        const newDirection = sortKey === key && sortDirection === 'desc' ? 'asc' : 'desc';
        dispatch(setSort({ key, direction: newDirection }));
    };

    return (
        <div className={`flex flex-col h-full bg-[#111111] border border-[#27272a] overflow-hidden ${className}`}>
            <ColumnHeader
                title={title}
                count={tokens.length}
                sortKey="marketCap"
                currentSort={{ key: sortKey as 'marketCap' | 'volume24h' | 'price', direction: sortDirection }}
                onSort={handleSort}
            />

            <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
                {tokens.map((token) => (
                    <TokenRow
                        key={token.id}
                        token={token}
                    />
                ))}
            </div>
        </div>
    );
}
