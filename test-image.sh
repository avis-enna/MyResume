#!/bin/bash

echo "🖼️  Testing Profile Image Loading..."
echo "====================================="

# Test 1: Check if image file exists
echo "📁 Checking if profile image exists..."
if [ -f "/Users/ssivared/MyResume/public/profile-photo.png" ]; then
    echo "✅ profile-photo.png exists"
    echo "   Size: $(ls -lh /Users/ssivared/MyResume/public/profile-photo.png | awk '{print $5}')"
else
    echo "❌ profile-photo.png not found"
    exit 1
fi

# Test 2: Check if image is accessible via HTTP
echo "🌐 Testing HTTP accessibility..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/profile-photo.png)
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Image accessible via HTTP (Status: $HTTP_STATUS)"
else
    echo "❌ Image not accessible via HTTP (Status: $HTTP_STATUS)"
fi

# Test 3: Check image properties
echo "🔍 Image file properties:"
file /Users/ssivared/MyResume/public/profile-photo.png

# Test 4: Test page loading
echo "📄 Testing page load..."
PAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002)
if [ "$PAGE_STATUS" = "200" ]; then
    echo "✅ Portfolio page loads successfully (Status: $PAGE_STATUS)"
else
    echo "❌ Portfolio page failed to load (Status: $PAGE_STATUS)"
fi

echo ""
echo "🎯 Image Testing Complete!"
echo "Open http://localhost:3002 to verify the profile image is visible"
