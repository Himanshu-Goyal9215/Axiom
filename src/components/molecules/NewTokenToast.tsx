'use client';

import { useEffect, useState } from 'react';
import { Token } from '@/types';
import { X } from 'lucide-react';

interface NewTokenToastProps {
    token: Token | null;
    onClose: () => void;
}

export function NewTokenToast({ token, onClose }: NewTokenToastProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (token) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 300); // Wait for animation
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [token, onClose]);

    if (!token && !visible) return null;

    return (
        <div
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-lg border border-accent-green/20 bg-[#1a1d20] p-3 shadow-2xl transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                }`}
        >
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                <img src={token?.avatar} alt={token?.name} className="h-full w-full object-cover" />
                <div className="absolute bottom-0 right-0 rounded-tl bg-accent-green px-1 text-[8px] font-bold text-black">
                    NEW
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{token?.symbol}</span>
                    <span className="text-xs text-muted-foreground">{token?.name}</span>
                </div>
                <div className="text-xs text-accent-green">
                    Created just now
                </div>
            </div>
            <button
                onClick={() => setVisible(false)}
                className="ml-2 rounded-full p-1 text-muted-foreground hover:bg-white/10 hover:text-white"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
