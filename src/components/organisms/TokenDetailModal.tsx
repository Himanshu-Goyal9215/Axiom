import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Token } from "@/types";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { X } from "lucide-react";

interface TokenDetailModalProps {
    token: Token | null;
    isOpen: boolean;
    onClose: () => void;
}

// Mock sparkline data generator
const generateSparklineData = (basePrice: number) => {
    const data = [];
    let price = basePrice;
    for (let i = 0; i < 20; i++) {
        price = price * (1 + (Math.random() * 0.1 - 0.05));
        data.push({ i, price });
    }
    return data;
};

export function TokenDetailModal({ token, isOpen, onClose }: TokenDetailModalProps) {
    if (!token) return null;

    const data = generateSparklineData(token.price);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0f1113] border-border text-foreground sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <img src={token.avatar} alt={token.name} className="h-8 w-8 rounded-full" />
                        <span>{token.name} ({token.symbol})</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="h-[150px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground">Price</span>
                            <span className="font-mono text-lg">${token.price.toFixed(6)}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground">Market Cap</span>
                            <span className="font-mono text-lg">${(token.marketCap / 1000).toFixed(1)}K</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground">Volume 24h</span>
                            <span className="font-mono text-lg">${(token.volume24h / 1000).toFixed(1)}K</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground">Holders</span>
                            <span className="font-mono text-lg">{token.holders}</span>
                        </div>
                    </div>
                    <div className="rounded-md bg-muted p-2 text-xs font-mono overflow-auto max-h-[100px]">
                        <pre>{JSON.stringify(token, null, 2)}</pre>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
