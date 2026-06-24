#!/bin/bash
# ═══════════════════════════════════════════
# PAULILY International — npm install helper
# Run this in your local PowerShell or CMD
# ═══════════════════════════════════════════

echo "Installing dependencies for paulily-intl..."
cd paulily-intl
npm install --registry=https://registry.npmmirror.com

echo ""
echo "✅ Dependencies installed successfully!"
echo ""
echo "Next steps:"
echo "1. Run: npm run dev"
echo "2. Open: http://localhost:3000"
echo "3. Sanity Studio: http://localhost:3000/studio"
echo ""
