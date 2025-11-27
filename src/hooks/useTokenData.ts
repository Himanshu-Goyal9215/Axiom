import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTokens, updatePrice, selectTokenIds } from '@/store/tokensSlice';
import { useAppSelector } from '@/store/hooks';
import { Token } from '@/types';
import { useMockTicker } from './useMockTicker';

const fetchTokens = async (): Promise<Token[]> => {
    const res = await fetch('/api/tokens');
    if (!res.ok) {
        throw new Error('Failed to fetch tokens');
    }
    return res.json();
};

export const useTokenData = () => {
    const dispatch = useDispatch();
    const tokenIds = useAppSelector(selectTokenIds);

    const { data, isLoading, error } = useQuery({
        queryKey: ['tokens'],
        queryFn: fetchTokens,
    });

    // Sync initial data to Redux
    useEffect(() => {
        if (data) {
            dispatch(setTokens(data));
        }
    }, [data, dispatch]);

    // Subscribe to live updates
    useMockTicker(tokenIds, (tick) => {
        dispatch(updatePrice(tick));
    });

    return { isLoading, error };
};
