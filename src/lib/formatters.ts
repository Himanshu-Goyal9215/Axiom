/**
 * Format large numbers with K/M suffixes
 * @example formatNumber(1234567) => "1.23M"
 * @example formatNumber(45678) => "45.7K"
 */
export function formatNumber(num: number): string {
    if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(2)}M`;
    }
    if (num >= 1_000) {
        return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toFixed(0);
}

/**
 * Format time ago in human-readable format
 * @example formatTimeAgo(120) => "Created 2m ago"
 * @example formatTimeAgo(3600) => "Created 1h ago"
 */
export function formatTimeAgo(seconds: number): string {
    if (seconds < 60) {
        return `Created ${seconds}s ago`;
    }
    if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `Created ${minutes}m ago`;
    }
    if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `Created ${hours}h ago`;
    }
    const days = Math.floor(seconds / 86400);
    return `Created ${days}d ago`;
}

/**
 * Format price with appropriate decimal places
 * @example formatPrice(0.000123) => "$0.000123"
 * @example formatPrice(1.23) => "$1.23"
 */
export function formatPrice(price: number): string {
    if (price < 0.0001) {
        return `$${price.toFixed(8)}`;
    }
    if (price < 0.01) {
        return `$${price.toFixed(6)}`;
    }
    if (price < 1) {
        return `$${price.toFixed(4)}`;
    }
    return `$${price.toFixed(2)}`;
}

/**
 * Format percentage with + prefix for positive values
 * @example formatPercentage(5.67) => "+5.67%"
 * @example formatPercentage(-3.21) => "-3.21%"
 */
export function formatPercentage(value: number): string {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
}
