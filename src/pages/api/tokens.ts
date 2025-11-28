import type { NextApiRequest, NextApiResponse } from 'next';
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
    { symbol: 'SPOD', name: 'Spoderman' },
    { symbol: 'PEPE', name: 'Pepe Coin' },
    { symbol: 'DOGE', name: 'Dogecoin' },
    { symbol: 'SHIB', name: 'Shiba Inu' },
    { symbol: 'FLOKI', name: 'Floki Inu' },
    { symbol: 'WOJAK', name: 'Wojak Coin' },
    { symbol: 'MOON', name: 'Moon Token' },
    { symbol: 'ROCKET', name: 'Rocket Fuel' },
    { symbol: 'LAMBO', name: 'Lamborghini' },
    { symbol: 'YOLO', name: 'You Only Live Once' },
    { symbol: 'WAGMI', name: 'We Are Gonna Make It' },
    { symbol: 'GEM', name: 'Hidden Gem' },
    { symbol: 'PUMP', name: 'Pump Token' },
    { symbol: 'CHAD', name: 'Chad Token' },
    { symbol: 'KING', name: 'King of Memes' },
    { symbol: 'LEGEND', name: 'Legend Token' },
    { symbol: 'EPIC', name: 'Epic Coin' },
    { symbol: 'SUPREME', name: 'Supreme Token' },
    { symbol: 'BASED', name: 'Based Coin' },
    { symbol: 'ALPHA', name: 'Alpha Token' },
];

const generateToken = (index: number, category: "new" | "final" | "migrated"): Token => {
    const nameData = tokenNames[index % tokenNames.length];
    const imageIndex = index % tokenImages.length;

    const basePrice = category === 'new' ? 0.00001 : category === 'final' ? 0.001 : 0.01;
    const baseMarketCap = category === 'new' ? 3000 : category === 'final' ? 50000 : 100000;
    const baseVolume = category === 'new' ? 500 : category === 'final' ? 20000 : 50000;

    const randomMultiplier = 1 + (Math.random() * 0.5 - 0.25);

    return {
        id: `${nameData.symbol.toLowerCase()}_${category}_${index}`,
        symbol: nameData.symbol,
        name: nameData.name,
        avatar: tokenImages[imageIndex],
        createdAtSecondsAgo: category === 'new'
            ? Math.floor(Math.random() * 60)
            : category === 'final'
                ? Math.floor(Math.random() * 86400)
                : Math.floor(Math.random() * 604800),
        price: basePrice * randomMultiplier,
        marketCap: Math.floor(baseMarketCap * randomMultiplier),
        volume24h: Math.floor(baseVolume * randomMultiplier),
        tx24h: Math.floor(Math.random() * 1000) + 1,
        holders: Math.floor(Math.random() * 500) + 1,
        liquidityUSD: Math.floor(baseMarketCap * 0.1 * randomMultiplier),
        change1h: (Math.random() * 40) - 20,
        change24h: (Math.random() * 200) - 100,
        topHoldersPercent: Math.floor(Math.random() * 40) + 30, // Random between 30-70%
        category,
        flags: Math.random() > 0.5 ? ['DS'] : undefined,
        virtualCurve: index % 3 === 0,
        ...(index === 0 && category === 'new' ? {
            description: "'spoder man is the orignal 'retarded' or 'intentionally wrongly spelled' character without spoderman we would not have Gork Boden Tremp spoderman has never send to multi millions",
            twitter: {
                handle: "@SmartMoneyUSD1",
                followers: 85,
                joinedDate: "Sep 2025"
            },
            creator: {
                name: "That Dev Guy",
                avatar: tokenImages[0]
            }
        } : {}),
        ...(index === 19 && category === 'migrated' ? {
            description: "In Chinese slang, 大表哥 (dà biǎogē) means \"big cousin,\" implying respect and closeness.",
            virtualCurve: true,
            reusedImageTokens: [
                {
                    id: "reused_1",
                    name: "OLDTOKEN",
                    avatar: tokenImages[imageIndex],
                    timeAgo: "5mo",
                    marketCap: 3840
                },
                {
                    id: "reused_2",
                    name: "DUPLICATE",
                    avatar: tokenImages[imageIndex],
                    timeAgo: "3mo",
                    marketCap: 2100
                }
            ]
        } : {})
    };
};

// Generate 20 tokens for each category
const tokens: Token[] = [
    ...Array.from({ length: 20 }, (_, i) => generateToken(i, 'new')),
    ...Array.from({ length: 20 }, (_, i) => generateToken(i, 'final')),
    ...Array.from({ length: 20 }, (_, i) => generateToken(i, 'migrated')),
];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Token[]>
) {
    res.status(200).json(tokens);
}
