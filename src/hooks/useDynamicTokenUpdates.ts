import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addToken, updateTokenMetrics } from '@/store/tokensSlice';
import { Token } from '@/types';

const tokenImages = [
    '/assets/token_photos/1109222.jpg',
    '/assets/token_photos/3900_3_06.jpg',
    '/assets/token_photos/3e24c17e-0ea2-439a-93bc-4285215a3c07.jpg',
    '/assets/token_photos/4600_3_10.jpg',
    '/assets/token_photos/6367467.jpg',
    '/assets/token_photos/7400_7_04.jpg',
    '/assets/token_photos/EmT4yP6S_normal.jpg',
    '/assets/token_photos/afd43f6c-6870-4ce3-b69c-a80d878e4e49.jpg',
    '/assets/token_photos/bitcoin-3d-illustration.jpg',
    '/assets/token_photos/fun-bird-3d-illustration.jpg',
    '/assets/token_photos/fun-dog-3d-illustration.jpg',
];

const tokenNames = [
    'ROCKET', 'MOON', 'PEPE', 'DOGE', 'SHIB', 'WOJAK', 'LAMBO', 'YOLO',
    'WAGMI', 'GEM', 'PUMP', 'CHAD', 'KING', 'LEGEND', 'EPIC', 'BASED',
    'ALPHA', 'SIGMA', 'GIGA', 'MEGA', 'ULTRA', 'SUPER', 'HYPER', 'QUANTUM'
];

const generateNewToken = (category: "new" | "final" | "migrated"): Token => {
    const symbol = tokenNames[Math.floor(Math.random() * tokenNames.length)];
    const imageIndex = Math.floor(Math.random() * tokenImages.length);

    const basePrice = category === 'new' ? 0.00001 : category === 'final' ? 0.001 : 0.01;
    const baseMarketCap = category === 'new' ? 3000 : category === 'final' ? 50000 : 100000;
    const baseVolume = category === 'new' ? 500 : category === 'final' ? 20000 : 50000;

    const randomMultiplier = 1 + (Math.random() * 0.5 - 0.25);

    return {
        id: `${symbol.toLowerCase()}_${category}_${Date.now()}_${Math.random()}`,
        symbol,
        name: `${symbol} Token`,
        avatar: tokenImages[imageIndex],
        createdAtSecondsAgo: 0, // Always start at 0 for new tokens
        price: basePrice * randomMultiplier,
        marketCap: Math.floor(baseMarketCap * randomMultiplier),
        volume24h: Math.floor(baseVolume * randomMultiplier),
        tx24h: Math.floor(Math.random() * 100) + 1,
        holders: category === 'new' ? Math.floor(Math.random() * 30) + 50 : Math.floor(Math.random() * 500) + 100,
        liquidityUSD: Math.floor(baseMarketCap * 0.1 * randomMultiplier),
        change1h: (Math.random() * 40) - 20,
        change24h: (Math.random() * 200) - 100,
        category,
        virtualCurve: Math.random() > 0.7,
        // New Axiom-specific fields
        proTraders: Math.floor(Math.random() * 20), // 0-20 pro traders
        qualityScore: Math.floor(Math.random() * 11), // 0-10 quality score
        snipersHoldingPercent: Math.floor(Math.random() * 30), // 0-30% snipers
        insidersHoldingPercent: Math.floor(Math.random() * 20), // 0-20% insiders
        bondingCurveProgress: category === 'final' ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 50), // 0-100%
        topHoldersPercent: Math.floor(Math.random() * 40) + 20, // 20-60% top holders
        kingScore: {
            current: Math.floor(Math.random() * 9) + 1,
            max: 10
        },
    };
};

export function useDynamicTokenUpdates() {
    const dispatch = useAppDispatch();

    // Add new tokens periodically
    useEffect(() => {
        // New Pairs: Very fast updates (every 1-3 seconds)
        const addNewPairToken = () => {
            const newToken = generateNewToken('new');
            dispatch(addToken(newToken));

            // Schedule next token
            const nextDelay = Math.random() * 2000 + 1000; // 1-3 seconds
            setTimeout(addNewPairToken, nextDelay);
        };
        addNewPairToken();

        // Final Stretch: Medium updates (every 15-30 seconds)
        const addFinalStretchToken = () => {
            const newToken = generateNewToken('final');
            dispatch(addToken(newToken));

            // Schedule next token
            const nextDelay = Math.random() * 15000 + 15000; // 15-30 seconds
            setTimeout(addFinalStretchToken, nextDelay);
        };
        addFinalStretchToken();

        // Migrated: Slower updates (every 4-10 seconds)
        const addMigratedToken = () => {
            const newToken = generateNewToken('migrated');
            dispatch(addToken(newToken));

            // Schedule next token
            const nextDelay = Math.random() * 6000 + 4000; // 4-10 seconds
            setTimeout(addMigratedToken, nextDelay);
        };
        addMigratedToken();

        return () => {
            // Cleanup will happen automatically when component unmounts
        };
    }, [dispatch]);

    // Increment time for all tokens every second
    useEffect(() => {
        const timeInterval = setInterval(() => {
            dispatch(updateTokenMetrics());
        }, 1000); // Every 1 second

        return () => clearInterval(timeInterval);
    }, [dispatch]);
}
