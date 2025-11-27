import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Token, Tick } from '@/types';
import { RootState } from './index';

interface TokensState {
    ids: string[];
    entities: Record<string, Token>;
    sortKey: 'price' | 'marketCap' | 'volume24h' | 'change24h';
    sortDirection: 'asc' | 'desc';
    pinnedIds: string[];
}

const initialState: TokensState = {
    ids: [],
    entities: {},
    sortKey: 'marketCap',
    sortDirection: 'desc',
    pinnedIds: [],
};

const tokensSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setTokens(state, action: PayloadAction<Token[]>) {
            const tokens = action.payload;
            state.ids = tokens.map((t) => t.id);
            state.entities = tokens.reduce((acc, t) => {
                acc[t.id] = t;
                return acc;
            }, {} as Record<string, Token>);
        },
        updatePrice(state, action: PayloadAction<Tick>) {
            const { id, changePct } = action.payload;
            const token = state.entities[id];
            if (token) {
                // Update price based on changePct
                const oldPrice = token.price;
                const newPrice = oldPrice * (1 + changePct / 100);
                token.price = newPrice;

                // Also update change24h roughly (mock logic)
                token.change24h += changePct;
                token.change1h += changePct; // simplified
            }
        },
        addToken(state, action: PayloadAction<Token>) {
            const newToken = action.payload;
            // Add to the beginning of the category
            state.ids.unshift(newToken.id);
            state.entities[newToken.id] = newToken;

            // Limit to 20 tokens per category
            const categoryTokens = state.ids.filter(id => state.entities[id]?.category === newToken.category);
            if (categoryTokens.length > 20) {
                const toRemove = categoryTokens[categoryTokens.length - 1];
                state.ids = state.ids.filter(id => id !== toRemove);
                delete state.entities[toRemove];
            }
        },
        updateTokenMetrics(state) {
            // Increment time for all tokens
            state.ids.forEach(id => {
                const token = state.entities[id];
                if (token) {
                    token.createdAtSecondsAgo += 1;

                    // Slight random changes to market cap and holders
                    if (Math.random() > 0.7) {
                        const changePercent = (Math.random() * 10 - 5) / 100; // -5% to +5%
                        token.marketCap = Math.floor(token.marketCap * (1 + changePercent));

                        // Occasionally add/remove holders
                        if (Math.random() > 0.8) {
                            token.holders += Math.floor(Math.random() * 5) - 2; // -2 to +3 holders
                            token.holders = Math.max(1, token.holders); // At least 1 holder
                        }
                    }
                }
            });
        },
        setSort(state, action: PayloadAction<{ key: TokensState['sortKey']; direction: 'asc' | 'desc' }>) {
            state.sortKey = action.payload.key;
            state.sortDirection = action.payload.direction;
        },
        togglePin(state, action: PayloadAction<string>) {
            const id = action.payload;
            if (state.pinnedIds.includes(id)) {
                state.pinnedIds = state.pinnedIds.filter((pid) => pid !== id);
            } else {
                state.pinnedIds.push(id);
            }
        },
    },
});

export const { setTokens, updatePrice, addToken, updateTokenMetrics, setSort, togglePin } = tokensSlice.actions;

// Selectors
const selectTokensState = (state: RootState) => state.tokens;

export const selectTokenIds = createSelector(
    selectTokensState,
    (state) => state.ids
);

export const selectTokenById = (state: RootState, id: string) => state.tokens.entities[id];

export const selectSortedTokens = createSelector(
    selectTokensState,
    (state) => {
        const { ids, entities } = state;
        const tokens = ids.map((id) => entities[id]);

        // Sort by createdAtSecondsAgo ascending (0s first, then 1s, 2s, etc.)
        return tokens.sort((a, b) => {
            // First sort by category
            const categoryOrder = { new: 0, final: 1, migrated: 2 };
            const catDiff = categoryOrder[a.category] - categoryOrder[b.category];
            if (catDiff !== 0) return catDiff;

            // Within same category, sort by time (ascending - newest first)
            return a.createdAtSecondsAgo - b.createdAtSecondsAgo;
        });
    }
);

export const selectGroupedTokens = createSelector(
    selectSortedTokens,
    (tokens) => {
        return {
            newPairs: tokens.filter((t) => t.category === 'new'),
            finalStretch: tokens.filter((t) => t.category === 'final'),
            migrated: tokens.filter((t) => t.category === 'migrated'),
        };
    }
);

export default tokensSlice.reducer;
