export type Token = {
    id: string;
    symbol: string;
    name: string;
    avatar: string;
    createdAtSecondsAgo: number;
    price: number;
    marketCap: number;
    volume24h: number;
    tx24h: number;
    holders: number;
    liquidityUSD: number;
    change1h: number;
    change24h: number;
    category: "new" | "final" | "migrated";
    flags?: string[];
    description?: string;
    // New fields to match Axiom
    proTraders?: number; // Number of pro traders holding
    qualityScore?: number; // QLS score (0-10)
    snipersHoldingPercent?: number; // Snipers holding %
    insidersHoldingPercent?: number; // Insiders holding %
    bondingCurveProgress?: number; // Bonding curve progress %
    topHoldersPercent?: number; // Top 10 holders %
    kingScore?: { current: number; max: number }; // King crown score (e.g., 6/7)
    twitter?: {
        handle: string;
        followers: number;
        joinedDate: string;
    };
    creator?: {
        name: string;
        avatar: string;
    };
    similarTokens?: {
        id: string;
        name: string;
        avatar: string;
        timeAgo: string;
        marketCap: number;
    }[];
    reusedImageTokens?: {
        id: string;
        name: string;
        avatar: string;
        timeAgo: string;
        marketCap: number;
    }[];
    virtualCurve?: boolean;
};

export type Tick = {
    id: string;
    price: number;
    changePct: number;
    timestamp: number;
};
