import { test, expect } from '@playwright/test';

test('pulse page visual regression', async ({ page }) => {
    await page.goto('http://localhost:3000/pulse');

    // Wait for data to load
    await page.waitForSelector('text=New Pairs');
    await page.waitForTimeout(2000); // Wait for animations/tickers to settle slightly

    // Desktop snapshot
    await expect(page).toHaveScreenshot('pulse-desktop.png', { fullPage: true });

    // Mobile snapshot
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('pulse-mobile.png', { fullPage: true });
});
