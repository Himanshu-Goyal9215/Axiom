# Axiom Pulse Replica

A pixel-perfect replica of the Axiom Pulse token discovery interface, built with Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit, and React Query. This project simulates a live trading terminal with real-time token updates, price flashes, and dynamic data feeds.

## 🚀 Features

### **1. Real-Time Trading Terminal Simulation**
-   **Live Price Updates**: Simulated WebSocket updates via `useMockTicker` hook with price flash animations.
-   **Dynamic Token Feeds**:
    -   **New Pairs**: Updates every 1-3 seconds (fastest).
    -   **Final Stretch**: Updates every 15-30 seconds.
    -   **Migrated**: Updates every 4-10 seconds.
-   **Organic Metrics**:
    -   Time increments continuously (0s → 1s → 2s...).
    -   Market Cap fluctuates randomly (-5% to +5%).
    -   Holder counts vary organically (+/- 2-3).

### **2. Pixel-Perfect UI**
-   **Token Row Design**: Exact DOM structure match with 74x74px images, virtual curve animations, and specific badge styling.
-   **Hover Cards**: Detailed "Token Info Card" layout (replacing standard profiles) with real-time stats, security checks, and social links.
-   **Layout**: Collapsible columns, mobile-optimized design, and custom scrollbars.
-   **Visual Effects**: "Bluish Glow" for new tokens (<10s old), smooth transitions, and hover overlays.

### **3. Advanced Data Visualization**
-   **Sparklines**: Simulated chart data in detail modals.
-   **Badges & Indicators**:
    -   **Security**: Mint/Freeze Authority disabled, LP Burned.
    -   **Holders**: Top 10%, Snipers %, Insiders %.
    -   **Scores**: Quality Score (0-10), King Score (0-10).
    -   **Progress**: Bonding Curve progress bar.

---

## 🏗 Architecture & Design Decisions

### **Tech Stack**
-   **Framework**: Next.js 14 (App Router)
-   **State Management**:
    -   **Redux Toolkit**: Handles high-frequency updates (prices, metrics) to minimize re-renders.
    -   **React Query**: Manages initial data fetching and caching.
-   **Styling**: Tailwind CSS with custom color tokens (e.g., `virtualCurve`, `primaryGreen`) and Radix UI primitives.
-   **Testing**: Jest for unit tests, Playwright for visual regression.

### **Key Decisions**
-   **Hybrid State**: Redux is used for the "live" data because it allows for normalized state updates and efficient `createSelector` memoization, which is critical for performance when updating dozens of rows every second.
-   **CSS Animations**: Used for high-frequency effects (like price flashes) to avoid JS overhead.
-   **Mocking Strategy**: A REST API simulation at `/pages/api/tokens.ts` combined with a client-side `useDynamicTokenUpdates` hook to mimic a WebSocket connection.

---

## 🔄 Dynamic Update System

The system is designed to feel alive, mirroring the actual Axiom Trade Pulse platform behavior:

### **Token Lifecycle**
1.  **Insertion**: New tokens are inserted at the top of their respective columns (New Pairs, Final Stretch, Migrated).
2.  **Queueing**: Existing tokens shift down; the oldest token (position 20) is removed to maintain a clean list.
3.  **Aging**: Every token's "Created Time" increments by 1 second every second.

### **Update Frequencies**
| Category | Update Rate | Description |
| :--- | :--- | :--- |
| **New Pairs** | 1-3s | Recently launched tokens with new liquidity. |
| **Final Stretch** | 15-30s | Tokens nearing bonding curve completion. |
| **Migrated** | 4-10s | Mature tokens that have completed migration. |

---

## ✅ Implementation Status

### **Completed**
-   [x] **Core Layout**: Header, Footer, and 3-column Pulse grid.
-   [x] **Token Data**: 60+ tokens with realistic mock data and images.
-   [x] **Interactivity**: Hover cards, click-to-copy, external links.
-   [x] **Performance**: Optimized rendering with `memo` and selective state updates.
-   [x] **Visual Accuracy**: <2px difference from reference screenshots.

### **Pending / Next Steps**
-   [ ] **Virtualization**: Implement `react-window` for lists > 200 items.
-   [ ] **Real Backend**: Connect to a live Solana RPC or indexer API.
-   [ ] **Wallet Integration**: Add actual Solana wallet connection (currently UI only).

---

## 🛠 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open the app**:
    Navigate to [http://localhost:3000/pulse](http://localhost:3000/pulse).

---

## 🧪 Testing

-   **Unit Tests**:
    ```bash
    npm test
    ```
-   **Visual Regression**:
    ```bash
    ./scripts/visual-check.sh
    ```

---

## 🎬 Demo Script

If presenting this project, follow this flow:
1.  **Intro**: "This is the Axiom Pulse Replica, a high-performance trading dashboard."
2.  **Live Updates**: Point out the price flashes and the "Created Time" counting up second-by-second.
3.  **New Tokens**: Watch the "New Pairs" column for a few seconds to see a new token appear at the top.
4.  **Hover Interaction**: Hover over a token image to reveal the detailed Info Card.
5.  **Responsiveness**: Resize the window to show how columns stack on mobile.
