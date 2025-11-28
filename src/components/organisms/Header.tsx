'use client';

import Image from 'next/image';
import { Search, ChevronDown, Star, Bell, Wallet, User } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { name: 'Discover', href: '/discover', active: false },
    { name: 'Pulse', href: '/pulse', active: true },
    { name: 'Trackers', href: '/trackers', active: false },
    { name: 'Perpetuals', href: '/perpetuals', active: false },
    { name: 'Yield', href: '/yield', active: false },
    { name: 'Vision', href: '/vision', active: false },
    { name: 'Portfolio', href: '/portfolio', active: false },
    { name: 'Rewards', href: '/rewards', active: false },
];

export function Header() {
    const [searchFocused, setSearchFocused] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-primaryStroke">
            <div className="flex items-center justify-between px-4 h-14">
                {/* Left: Logo & Navigation */}
                <div className="flex items-center gap-6">
                    {/* Axiom Logo */}
                    <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6">
                            <Image
                                src="/assets/axiom.png"
                                alt="Axiom"
                                width={24}
                                height={24}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">AXIOM</span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${item.active
                                    ? 'text-[#3b82f6] bg-[#3b82f6]/10'
                                    : 'text-white hover:text-[#3b82f6] hover:bg-[#3b82f6]/5'
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Right: Search, SOL, Deposit, Icons */}
                <div className="flex items-center gap-3">
                    {/* Search Bar */}
                    <div
                        className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-backgroundSecondary border transition-colors ${searchFocused ? 'border-[#3b82f6]' : 'border-primaryStroke'
                            }`}
                    >
                        <Search className="w-4 h-4 text-textTertiary" />
                        <input
                            type="text"
                            placeholder="Search by Name or CA..."
                            className="bg-transparent text-sm text-white placeholder:text-textTertiary outline-none w-40"
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                        <span className="text-xs text-textTertiary">/</span>
                    </div>

                    {/* SOL Selector */}
                    <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-backgroundSecondary border border-primaryStroke hover:border-[#3b82f6] transition-colors">
                        <div className="relative w-4 h-4">
                            <Image
                                src="/assets/solana.png"
                                alt="Solana"
                                width={16}
                                height={16}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-sm font-medium text-white">SOL</span>
                        <ChevronDown className="w-4 h-4 text-textTertiary" />
                    </button>

                    {/* Deposit Button */}
                    <button className="px-4 py-1.5 rounded-lg bg-[#3b82f6] text-white text-sm font-semibold hover:bg-[#2563eb] transition-colors">
                        Deposit
                    </button>

                    {/* Star Icon */}
                    <button className="p-2 rounded-lg hover:bg-backgroundSecondary transition-colors">
                        <Star className="w-5 h-5 text-textSecondary" />
                    </button>

                    {/* Bell Icon */}
                    <button className="p-2 rounded-lg hover:bg-backgroundSecondary transition-colors">
                        <Bell className="w-5 h-5 text-textSecondary" />
                    </button>

                    {/* Wallet */}
                    <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primaryStroke hover:border-[#3b82f6] transition-colors">
                        <Wallet className="w-4 h-4 text-textSecondary" />
                        <span className="text-sm text-white">0</span>
                    </button>

                    {/* Balance */}
                    <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primaryStroke hover:border-[#3b82f6] transition-colors">
                        <span className="text-sm text-white">0</span>
                        <ChevronDown className="w-4 h-4 text-textTertiary" />
                    </button>

                    {/* User Profile */}
                    <button className="p-2 rounded-lg hover:bg-backgroundSecondary transition-colors">
                        <User className="w-5 h-5 text-textSecondary" />
                    </button>
                </div>
            </div>
        </header>
    );
}
