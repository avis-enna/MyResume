#!/bin/bash

echo "🧪 Testing Mobile Compatibility..."
echo "=================================="

# Test 1: Check if server is running
echo "📡 Checking if development server is running..."
if curl -s http://localhost:3002 > /dev/null; then
    echo "✅ Server is running on localhost:3002"
else
    echo "❌ Server is not running. Please start with 'npm run dev'"
    exit 1
fi

# Test 2: Run Lighthouse mobile audit
echo "🚀 Running Lighthouse mobile audit..."
lighthouse http://localhost:3002 \
    --emulated-form-factor=mobile \
    --throttling.cpuSlowdownMultiplier=4 \
    --output=json \
    --output-path=./mobile-test-results.json \
    --quiet

if [ $? -eq 0 ]; then
    echo "✅ Lighthouse mobile audit completed"
    echo "📊 Results saved to mobile-test-results.json"
else
    echo "❌ Lighthouse audit failed"
fi

# Test 3: Check mobile viewport
echo "🔍 Testing mobile viewport configuration..."
VIEWPORT_CHECK=$(curl -s http://localhost:3002 | grep -o 'name="viewport"[^>]*')
if [[ $VIEWPORT_CHECK == *"width=device-width"* ]]; then
    echo "✅ Mobile viewport is properly configured"
else
    echo "⚠️  Mobile viewport may need adjustment"
fi

echo ""
echo "🎯 Mobile Testing Complete!"
echo "Open http://localhost:3002 in Chrome DevTools mobile mode to test"
echo "Press F12 → Device Toolbar (📱) → Select iPhone/Android"
