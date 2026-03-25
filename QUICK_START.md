# TrendTok AI - Quick Start Guide

## 🎯 TL;DR - Next 3 Steps to Launch

### Step 1: Set Up Database (20 minutes)
```
1. Go to https://vercel.com/dashboard
2. Click "trendtok-dashboard" project → "Storage" tab
3. Create Postgres database named "trendtok-db"
4. Copy connection string
5. Go to Vercel project Settings → Environment Variables
6. Add: DATABASE_URL = [your connection string]
7. Load schema:
   - Option A: Copy setup-database.sql to Vercel SQL editor and click Run
   - Option B: psql 'CONNECTION_STRING' -f setup-database.sql
```

### Step 2: Create Dify Workflows (45 minutes)
```
1. Go to https://dify.ai and sign in
2. Create 4 workflows (see DATABASE_AND_DIFY_SETUP.md Part 2):
   - trending-discovery
   - video-generation
   - tiktok-posting
   - performance-tracking
3. Get your Dify API key from Account Settings
4. Add to Vercel Environment Variables:
   - VITE_DIFY_API_KEY
   - VITE_DIFY_API_URL=https://api.dify.ai/v1
```

### Step 3: Add API Keys (15 minutes)
```
Get keys from:
1. Google Cloud Console → Google Veo API → Get key
2. https://platform.openai.com → API Keys → Create key
3. TinyFish → Get your existing API key
4. TikTok Developer → Get client credentials
5. Add all to Vercel Environment Variables (see .env.production.example)
6. Vercel automatically redeploys when env vars change
```

---

## ✅ Current Status

### ✓ Complete
- React dashboard with 7 pages (Dashboard, Trends, Video Studio, Approval Queue, Publishing, Analytics, Automations)
- Design system: "The Kinetic Curator" (cyan/violet/coral)
- Dark mode support with animations
- Deployed to Vercel: https://trendtok-dashboard-buew6x3ti-prototypemegas-projects.vercel.app
- GitHub repository: https://github.com/PrototypeMega/trendtok-dashboard
- Dify API client ready (src/api/difyClient.ts)
- Database schema designed (setup-database.sql)

### 📋 In Progress
- [ ] Database setup (PostgreSQL)
- [ ] Dify workflows creation
- [ ] Environment variables configuration
- [ ] End-to-end testing

### ⏳ Not Started
- [ ] Google Sites landing page (trendtokai.com)
- [ ] Marketing campaign
- [ ] Social media announcements

---

## 🚀 Live Dashboard

Your dashboard is **already deployed** and live at:
- **Preview**: https://trendtok-dashboard-buew6x3ti-prototypemegas-projects.vercel.app
- **Note**: Currently shows placeholder data (no API integration yet)

Once you complete Steps 1-3 above, the dashboard will be fully operational with real data.

---

## 📚 Full Documentation Files

| File | Purpose |
|------|---------|
| `DATABASE_AND_DIFY_SETUP.md` | Complete setup guide (READ THIS NEXT) |
| `PHASE4_SETUP_GUIDE.md` | Detailed Dify workflow instructions |
| `GOOGLE_SITES_LANDING_PAGE.md` | Landing page setup guide |
| `LAUNCH_CHECKLIST.md` | Pre-launch and launch day tasks |
| `setup-database.sql` | PostgreSQL schema |
| `.env.production.example` | Environment variables template |
| `COMPLETE_SETUP.ps1` | Automated setup script |
| `README.md` | Full project documentation |

---

## 🎬 Quick Commands

```powershell
# Run locally (for testing)
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel deploy --prod

# Check deployment status
npx vercel list

# View Vercel logs
npx vercel logs

# Open Vercel dashboard
npx vercel open
```

---

## 🆘 Common Issues & Fixes

### Database won't connect
- Check CONNECTION_STRING is copied exactly
- Verify DATABASE_URL is in Vercel Environment Variables
- Test with: `psql 'CONNECTION_STRING'`

### Dify workflows failing
- Verify API keys are correct (Dify, Google, OpenAI, TikTok)
- Check workflow test execution in Dify Studio UI
- Look at execution logs in Dify for specific errors

### Dashboard shows no data
- Open browser DevTools (F12) → Network tab
- Check if Dify API calls are succeeding
- Verify VITE_DIFY_API_KEY is in environment variables

### Vercel deploy fails
- Wait 5 minutes and try again (temporary network issues)
- Check build logs: `npx vercel logs`
- Ensure all dependencies are installed: `npm install`

---

## 📊 Testing Checklist

Once setup is complete:

- [ ] Dashboard loads at deployment URL
- [ ] Click "Discover Trends" → See trending topics populate
- [ ] Select trend → Click "Generate Video" → Video appears after 5 min
- [ ] Video appears in Approval Queue
- [ ] Click "Approve" → Video appears in Publishing section
- [ ] Schedule post → Post appears in calendar
- [ ] Wait 1 hour → Analytics show views/likes data
- [ ] Dark mode toggle works
- [ ] All pages responsive on mobile

---

## 🎯 Success Criteria

### For Minimum Launch
1. ✓ Dashboard deployed and accessible
2. ✓ Database connected and schema loaded
3. ✓ Dify workflows created and tested
4. ✓ All 4 API integrations working (Veo, OpenAI, TinyFish, TikTok)
5. ✓ End-to-end flow works (Discover → Generate → Post → Track)

### For Full Launch
Add:
6. ✓ Google Sites landing page created
7. ✓ Marketing materials prepared
8. ✓ Analytics and error tracking configured
9. ✓ Social media posts scheduled
10. ✓ ProductHunt launch prepared

---

## ⏱️ Estimated Timeline

- Database Setup: **20 minutes** ✓ Easy
- Dify Workflows: **45 minutes** ✓ Follow the guide
- API Keys: **15 minutes** ✓ Copy-paste
- Testing: **30 minutes** ✓ Click buttons
- **Total: ~2 hours to fully operational**

Landing page, marketing, and launch: **1-2 additional days**

---

## 🎓 Learning Resources

If you're new to any of these tools:

- **Dify**: https://docs.dify.ai (free workflow builder)
- **Vercel**: https://vercel.com/docs (serverless deployment)
- **PostgreSQL**: https://www.postgresql.org/docs (SQL database)
- **React**: https://react.dev (UI framework)
- **Tailwind CSS**: https://tailwindcss.com (styling)

---

## 🚀 Ready to Launch?

1. **Read**: DATABASE_AND_DIFY_SETUP.md (this is your step-by-step guide)
2. **Do**: Follow the 3 steps above in order
3. **Test**: Verify each step works before moving to next
4. **Launch**: Share your dashboard URL once complete!

---

**Good luck! You're about to launch TrendTok AI! 🎉**

Questions? Check the full documentation files or the GitHub issues page.
