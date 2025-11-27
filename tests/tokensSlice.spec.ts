import tokensReducer, { setTokens, setSort, selectSortedTokens } from '../src/store/tokensSlice';
import { Token } from '../src/types';

const mockTokens: Token[] = [
    { id: '1', symbol: 'A', price: 10, marketCap: 1000, volume24h: 500, change24h: 10, category: 'new', name: 'A', avatar: '', createdAtSecondsAgo: 0, tx24h: 0, holders: 0, liquidityUSD: 0, change1h: 0 },
    { id: '2', symbol: 'B', price: 20, marketCap: 500, volume24h: 1000, change24h: -5, category: 'new', name: 'B', avatar: '', createdAtSecondsAgo: 0, tx24h: 0, holders: 0, liquidityUSD: 0, change1h: 0 },
];

describe('tokensSlice', () => {
    it('should handle initial state', () => {
        expect(tokensReducer(undefined, { type: 'unknown' })).toEqual({
            ids: [],
            entities: {},
            sortKey: 'marketCap',
            sortDirection: 'desc',
            pinnedIds: [],
        });
    });

    it('should set tokens', () => {
        const actual = tokensReducer(undefined, setTokens(mockTokens));
        expect(actual.ids).toEqual(['1', '2']);
        expect(actual.entities['1']).toEqual(mockTokens[0]);
    });

    it('should sort tokens by price desc', () => {
        const state = {
            tokens: {
                ids: ['1', '2'],
                entities: { '1': mockTokens[0], '2': mockTokens[1] },
                sortKey: 'price' as const,
                sortDirection: 'desc' as const,
                pinnedIds: [],
            }
        };
        const sorted = selectSortedTokens(state);
        expect(sorted[0].id).toBe('2'); // Price 20
        expect(sorted[1].id).toBe('1'); // Price 10
    });

    it('should sort tokens by marketCap asc', () => {
        const state = {
            tokens: {
                ids: ['1', '2'],
                entities: { '1': mockTokens[0], '2': mockTokens[1] },
                sortKey: 'marketCap' as const,
                sortDirection: 'asc' as const,
                pinnedIds: [],
            }
        };
        const sorted = selectSortedTokens(state);
        expect(sorted[0].id).toBe('2'); // MC 500
        expect(sorted[1].id).toBe('1'); // MC 1000
    });
});
