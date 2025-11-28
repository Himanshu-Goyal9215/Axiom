# Video Demo Script (1-2 Minutes)

**Total Duration:** ~90-110 seconds
**Goal:** Demonstrate pixel-perfect UI, real-time updates, and technical architecture.

---

### **0:00 - 0:15 | Introduction**
**(Action: Start on the main Pulse page, full screen desktop)**
"Hi, this is my submission for the Frontend Task. I've built a pixel-perfect replica of the Axiom Trade Pulse interface using Next.js 14, TypeScript, and Tailwind CSS. The goal was to achieve less than 2px visual difference from the original site while ensuring high performance."

### **0:15 - 0:45 | Core UI & Pixel Perfection**
**(Action: Slowly scroll down the list. Hover over a few token images to show the custom Hover Card. Point cursor at specific details like badges.)**
"As you can see, I've implemented all three core columns: New Pairs, Final Stretch, and Migrated.
I focused heavily on the atomic details:
-   The custom 74px token images with the virtual curve animation.
-   The exact typography hierarchy and color tokens.
-   And this complex Hover Card, which is triggered on interaction and displays real-time security stats and social links, built using Radix UI primitives for accessibility."

### **0:45 - 1:10 | Real-Time Updates & State Management**
**(Action: Stay still for a moment to let the viewer see the green/red price flashes and the time counter incrementing.)**
"Under the hood, this isn't just a static page. I'm using a hybrid state management approach.
-   **React Query** handles the initial data fetching.
-   **Redux Toolkit** manages the high-frequency live updates you see here.
I built a custom hook that simulates a WebSocket connection, pushing updates to the store every second. You can see the prices flashing, the 'Created Time' counting up live, and new tokens dynamically inserting at the top of the 'New Pairs' queue."

### **1:10 - 1:30 | Interactions & Responsiveness**
**(Action: Click a column header to Sort. Then resize the browser window down to mobile size to show the stacked layout.)**
"The application is fully interactive. I can sort these live lists by Market Cap or Volume instantly on the client side.
It's also fully responsive down to 320px. As I resize, you'll see the columns stack gracefully, ensuring a seamless experience on mobile devices."

### **1:30 - 1:45 | Code Quality & Performance**
**(Action: Briefly show a VS Code window with the folder structure or the Lighthouse score if you have a screenshot.)**
"Finally, the codebase follows an atomic architecture with strict TypeScript typing and memoized components to prevent unnecessary re-renders. The app achieves a Lighthouse score of over 90 on both mobile and desktop. Thanks for watching."

---

## **Recording Tips**
1.  **Resolution**: Record in 1080p or 4k.
2.  **Clean Up**: Close other browser tabs and hide bookmarks bar.
3.  **Audio**: Speak clearly and slightly slower than normal.
4.  **Tools**: OBS Studio or Loom are great for this.
