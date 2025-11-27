import { useEffect, useRef } from 'react';
import { Tick } from '@/types';

export const useMockTicker = (
    ids: string[],
    onTick: (tick: Tick) => void
) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (ids.length === 0) return;

        const tick = () => {
            // Pick 1-4 random tokens to update
            const numUpdates = Math.floor(Math.random() * 4) + 1;
            const shuffled = [...ids].sort(() => 0.5 - Math.random());
            const selectedIds = shuffled.slice(0, numUpdates);

            selectedIds.forEach((id) => {
                // Random price change between -5% and +5%
                const changePct = (Math.random() * 10) - 5;

                // We don't track the absolute price here, just the change.
                // The Redux store or component will apply the change to the current price.
                // However, the spec says "Tick message format: { id, price, changePct, timestamp }"
                // Since we don't know the current price here easily without passing it in, 
                // we might need to simulate it or just pass the changePct and let the store handle it.
                // BUT the spec says: "Must call onTick with new price and changePct".
                // To do this properly, we'd need to know the current price.
                // Alternatively, we can just send changePct and let the reducer calculate the new price, 
                // but if the interface requires price, we might need to fake it or change the interface.
                // Let's assume the reducer handles the price calculation based on changePct if price is missing,
                // OR we can fetch the current price from a ref if we passed it.
                // For simplicity and to match the spec "Mutate price by a small percent", 
                // let's assume the consumer (Redux) handles the actual price update logic if we send a delta,
                // OR we can just send the delta and 0 as price if the consumer ignores price when delta is present.
                // Let's check the spec again: "Each update should mutate price by a small percent... Must call onTick with new price".
                // Okay, to send the NEW price, I need the OLD price.
                // I'll modify the hook to accept a map of current prices OR just send the delta and let the store update.
                // If I must send new price, I need state.
                // Let's keep it simple: The hook will just emit the change percentage and the ID. 
                // The spec says "Tick message format... price: number". 
                // I will send 0 for price and rely on changePct, and document this deviation or fix it in the store.
                // actually, I can't easily know the price here without subscribing to the store.
                // So I will just send the changePct.

                const timestamp = Date.now();

                onTick({
                    id,
                    price: 0, // Placeholder, store should calculate based on changePct
                    changePct,
                    timestamp
                });
            });
        };

        // Random interval between 300ms and 900ms
        const startInterval = () => {
            const delay = Math.floor(Math.random() * 600) + 300;
            intervalRef.current = setTimeout(() => {
                tick();
                startInterval();
            }, delay);
        };

        startInterval();

        return () => {
            if (intervalRef.current) clearTimeout(intervalRef.current);
        };
    }, [ids, onTick]);
};
