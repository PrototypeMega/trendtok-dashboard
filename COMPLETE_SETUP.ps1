# TrendTok AI - Complete Setup Automation Script
# This script helps you set up the entire TrendTok AI system

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          TrendTok AI - Complete Setup Script              ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Function to prompt for input
function Get-UserInput {
    param(
        [string]$Prompt,
        [string]$Default = "",
        [switch]$IsSecret
    )

    if ($Default) {
        Write-Host "$Prompt [$Default]: " -NoNewline -ForegroundColor Yellow
    } else {
        Write-Host "$Prompt: " -NoNewline -ForegroundColor Yellow
    }

    $input = if ($IsSecret) {
        Read-Host -AsSecureString
    } else {
        Read-Host
    }

    if ([string]::IsNullOrWhiteSpace($input)) {
        return $Default
    }
    return $input
}

# Check Node.js
Write-Host "📋 Checking prerequisites..." -ForegroundColor Green
$nodeVersion = node -v 2>$null
if (-not $nodeVersion) {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green

# Check Git
$gitVersion = git --version 2>$null
if (-not $gitVersion) {
    Write-Host "❌ Git not found. Please install Git from https://git-scm.com" -ForegroundColor Red
    exit 1
}
Write-Host "✓ $gitVersion" -ForegroundColor Green

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 1: Gather API Keys" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "You'll need these API keys. Get them from:" -ForegroundColor Yellow
Write-Host "  1. Dify: https://dify.ai (Settings → API Keys)" -ForegroundColor Gray
Write-Host "  2. TinyFish: https://agent.tinyfish.ai/api-keys" -ForegroundColor Gray
Write-Host "  3. Google Cloud: https://console.cloud.google.com (enable Veo API)" -ForegroundColor Gray
Write-Host "  4. OpenAI: https://platform.openai.com/api-keys" -ForegroundColor Gray
Write-Host "  5. TikTok Dev: https://developer.tiktok.com" -ForegroundColor Gray
Write-Host ""

$difyKey = Get-UserInput "Dify API Key" "dify_sk_" -IsSecret
$tinyFishKey = Get-UserInput "TinyFish API Key" "" -IsSecret
$googleKey = Get-UserInput "Google Veo API Key" "" -IsSecret
$openaiKey = Get-UserInput "OpenAI API Key" "" -IsSecret
$tikTokKey = Get-UserInput "TikTok User Access Token" "" -IsSecret

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 2: Database Setup" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "Choose database option:" -ForegroundColor Yellow
Write-Host "  1. Vercel Postgres (Recommended)" -ForegroundColor Gray
Write-Host "  2. Self-hosted PostgreSQL" -ForegroundColor Gray
Write-Host ""

$dbChoice = Get-UserInput "Database option (1 or 2)" "1"

if ($dbChoice -eq "1") {
    Write-Host ""
    Write-Host "📌 Vercel Postgres Setup:" -ForegroundColor Cyan
    Write-Host "1. Go to https://vercel.com/dashboard" -ForegroundColor Gray
    Write-Host "2. Click your 'trendtok-dashboard' project" -ForegroundColor Gray
    Write-Host "3. Go to 'Storage' tab → 'Create Database' → 'Postgres'" -ForegroundColor Gray
    Write-Host "4. Name: 'trendtok-db'" -ForegroundColor Gray
    Write-Host "5. Copy the connection string" -ForegroundColor Gray
    Write-Host ""

    $dbUrl = Get-UserInput "PostgreSQL Connection String" ""
} else {
    Write-Host ""
    Write-Host "📌 Self-Hosted PostgreSQL Setup:" -ForegroundColor Cyan
    Write-Host "1. Install from https://postgresql.org/download/windows" -ForegroundColor Gray
    Write-Host "2. Create database: CREATE DATABASE trendtok_db;" -ForegroundColor Gray
    Write-Host "3. Format: postgresql://user:password@localhost:5432/trendtok_db" -ForegroundColor Gray
    Write-Host ""

    $dbUrl = Get-UserInput "PostgreSQL Connection String" ""
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 3: Load Database Schema" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "📌 To load the schema:" -ForegroundColor Cyan
Write-Host "Option A - Using psql CLI:" -ForegroundColor Gray
Write-Host "  psql 'CONNECTION_STRING' -f setup-database.sql" -ForegroundColor DarkGray
Write-Host ""
Write-Host "Option B - Using Vercel dashboard SQL editor:" -ForegroundColor Gray
Write-Host "  1. Open setup-database.sql" -ForegroundColor DarkGray
Write-Host "  2. Copy all SQL code" -ForegroundColor DarkGray
Write-Host "  3. Paste into Vercel SQL editor" -ForegroundColor DarkGray
Write-Host "  4. Click 'Run'" -ForegroundColor DarkGray
Write-Host ""

$schemaLoaded = Get-UserInput "Have you loaded the schema? (yes/no)" "no"
if ($schemaLoaded -ne "yes" -and $schemaLoaded -ne "y") {
    Write-Host ""
    Write-Host "⚠️  Please load the schema first. Then run this script again." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 4: Configure Environment Variables" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Create .env.production file
$envContent = @"
DATABASE_URL=$dbUrl
VITE_DIFY_API_KEY=$difyKey
VITE_DIFY_API_URL=https://api.dify.ai/v1
VITE_TINYFISH_API_KEY=$tinyFishKey
VITE_GOOGLE_API_KEY=$googleKey
OPENAI_API_KEY=$openaiKey
VITE_TIKTOK_USER_TOKEN=$tikTokKey
VITE_APP_URL=https://trendtok-dashboard.vercel.app
NODE_ENV=production
"@

$envPath = Join-Path $PSScriptRoot ".env.production"
$envContent | Set-Content -Path $envPath
Write-Host "✓ Created .env.production" -ForegroundColor Green

Write-Host ""
Write-Host "📌 Add these to Vercel Environment Variables:" -ForegroundColor Cyan
Write-Host "1. Go to https://vercel.com/prototypemegas-projects/trendtok-dashboard" -ForegroundColor Gray
Write-Host "2. Settings → Environment Variables" -ForegroundColor Gray
Write-Host "3. Add each variable (copy from .env.production)" -ForegroundColor Gray
Write-Host ""

$envConfigured = Get-UserInput "Have you configured Vercel environment variables? (yes/no)" "no"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 5: Create Dify Workflows" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "📌 Follow the Dify setup guide:" -ForegroundColor Cyan
Write-Host "  File: DATABASE_AND_DIFY_SETUP.md (Part 2: Dify Workflow Setup)" -ForegroundColor Gray
Write-Host ""
Write-Host "Create these 4 workflows in Dify Cloud:" -ForegroundColor Yellow
Write-Host "  1. trending-discovery" -ForegroundColor Gray
Write-Host "  2. video-generation" -ForegroundColor Gray
Write-Host "  3. tiktok-posting" -ForegroundColor Gray
Write-Host "  4. performance-tracking" -ForegroundColor Gray
Write-Host ""

$workflowsCreated = Get-UserInput "Have you created all 4 Dify workflows? (yes/no)" "no"
if ($workflowsCreated -ne "yes" -and $workflowsCreated -ne "y") {
    Write-Host ""
    Write-Host "⚠️  Please create the Dify workflows first. See DATABASE_AND_DIFY_SETUP.md" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 6: Deploy to Vercel" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "Deploying to Vercel..." -ForegroundColor Green
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Build successful" -ForegroundColor Green
Write-Host ""

npx vercel deploy --prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Deployment had issues. Check the output above." -ForegroundColor Yellow
} else {
    Write-Host "✓ Deployment successful!" -ForegroundColor Green
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "STEP 7: Create Google Sites Landing Page" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "📌 Follow the Google Sites setup guide:" -ForegroundColor Cyan
Write-Host "  File: GOOGLE_SITES_LANDING_PAGE.md" -ForegroundColor Gray
Write-Host ""
Write-Host "Create landing page at trendtokai.com with:" -ForegroundColor Yellow
Write-Host "  1. Home page (hero section, CTA)" -ForegroundColor Gray
Write-Host "  2. Features page" -ForegroundColor Gray
Write-Host "  3. How it works page" -ForegroundColor Gray
Write-Host "  4. Documentation page" -ForegroundColor Gray
Write-Host "  5. Contact page" -ForegroundColor Gray
Write-Host ""

$landingPageCreated = Get-UserInput "Have you created the Google Sites landing page? (yes/no)" "no"

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                   Setup Complete! 🎉                       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "📊 Deployment Summary:" -ForegroundColor Green
Write-Host "  ✓ React Dashboard: https://trendtok-dashboard.vercel.app" -ForegroundColor Cyan
Write-Host "  ✓ GitHub Repo: https://github.com/PrototypeMega/trendtok-dashboard" -ForegroundColor Cyan
Write-Host "  " + $(if ($landingPageCreated -eq "yes") { "✓" } else { "⏳" }) + " Landing Page: https://trendtokai.com" -ForegroundColor Cyan
Write-Host ""

Write-Host "📌 Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Test the dashboard at https://trendtok-dashboard.vercel.app" -ForegroundColor Gray
Write-Host "  2. Click 'Discover Trends' and watch the workflow run" -ForegroundColor Gray
Write-Host "  3. Generate a video and review the approval queue" -ForegroundColor Gray
Write-Host "  4. Schedule and publish a post" -ForegroundColor Gray
Write-Host "  5. Monitor analytics and metrics" -ForegroundColor Gray
Write-Host ""

Write-Host "📚 Documentation Files:" -ForegroundColor Yellow
Write-Host "  - LAUNCH_CHECKLIST.md (final checks before launch)" -ForegroundColor Gray
Write-Host "  - DATABASE_AND_DIFY_SETUP.md (troubleshooting)" -ForegroundColor Gray
Write-Host "  - GOOGLE_SITES_LANDING_PAGE.md (landing page setup)" -ForegroundColor Gray
Write-Host "  - PHASE4_SETUP_GUIDE.md (Dify detailed guide)" -ForegroundColor Gray
Write-Host ""

Write-Host "🚀 Ready to launch TrendTok AI!" -ForegroundColor Green
