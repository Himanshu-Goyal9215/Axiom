#!/bin/bash
echo "Running visual regression tests..."
npx playwright test tests/visual.spec.ts
