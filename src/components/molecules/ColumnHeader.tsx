'use client';

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

export function ColumnHeader({ title, count }: ColumnHeaderProps) {
    return (
        <div className="flex items-center justify-between bg-[#111111] px-4 py-3 border-b border-[#27272a]">
            {/* Title & Count */}
            <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-bold text-white whitespace-nowrap tracking-tight">
                    {title}
                </h2>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1a1d20]">
                    <svg className="w-3 h-3 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <span className="text-[11px] font-bold text-slate-300">{count}</span>
                </div>
            </div>

            {/* Right Side Controls - Only P1/P2/P3 Tabs */}
            <div className="flex items-center gap-2">
                {/* P1/P2/P3 Tabs */}
                <div className="flex items-center gap-0.5 bg-[#1a1d20] rounded p-0.5">
                    <button className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-[#27272a] rounded shadow-sm">P1</button>
                    <button className="px-1.5 py-0.5 text-[10px] font-medium text-slate-500 hover:text-white transition-colors">P2</button>
                    <button className="px-1.5 py-0.5 text-[10px] font-medium text-slate-500 hover:text-white transition-colors">P3</button>
                </div>
            </div>
        </div>
    );
}
