# TrendTok AI - Free AI-Powered TikTok Automation Platform

![TrendTok AI Dashboard](https://img.shields.io/badge/status-production--ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)

**TrendTok AI** is a completely free, open-source platform that automates your TikTok content creation using AI. Discover trending topics, generate videos with Google Veo, and post to TikTok automatically—all without paying a cent.

## 🚀 Live Demo

- **Dashboard**: https://trendtok-dashboard-buew6x3ti-prototypemegas-projects.vercel.app
- **Landing Page**: Coming soon at trendtokai.com

## ✨ Key Features

### 🔍 Trend Discovery
- Automatically discover trending topics from Reddit, Twitter, and TikTok
- Real-time engagement scoring
- Source filtering and hashtag extraction
- Daily trend updates via scheduled Dify workflows

### 🎬 AI Video Generation
- Generate professional videos using Google Veo
- Multiple style options: Viral, News, Educational
- Customizable duration (15-60 seconds)
- Approval queue before posting
- One-click regeneration if needed

### 📤 Smart Publishing
- Schedule posts for optimal engagement times
- AI-generated captions with custom editing
- Multi-platform support (TikTok, Instagram, YouTube ready)
- Calendar view of all scheduled posts
- Real-time posting status

### 📊 Advanced Analytics
- Real-time performance tracking
- Views, likes, comments, and shares metrics
- Engagement rate calculation
- Top-performing videos table
- Best posting times heatmap
- Export analytics to CSV

### ⚡ Automation Workflows
- Pre-configured automation templates
- Daily trend discovery at 9 AM
- Weekly "Generate & Post" automation
- Trend monitoring and alerts
- Visual workflow execution history
- Manual trigger buttons

### 🎨 Professional UI
- "The Kinetic Curator" design system
- Premium cyan/violet/coral color palette
- Smooth animations and transitions
- Full dark mode support
- Responsive design (mobile, tablet, desktop)
- Accessibility compliant (WCAG AA)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│   Google Sites Landing Page                 │
│   (trendtokai.com - coming soon)            │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
   ┌────────────────┐   ┌────────────────┐
   │  React App     │   │  React App     │
   │  (Dashboard)   │   │  (Publishing)  │
   │  (Vercel)      │   │  (Vercel)      │
   └────────┬───────┘   └────────┬───────┘
            │                     │
            └──────────┬──────────┘
                       │
              ┌────────▼─────────┐
              │ Dify Cloud       │
              │ (Workflows)      │
              └────────┬─────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
      TinyFish    Google Veo    TikTok API

      PostgreSQL (centralized database)
```

### Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: Vercel (serverless)
- **Workflow Orchestration**: Dify Cloud (no-code)
- **Database**: PostgreSQL
- **Design System**: "The Kinetic Curator"

## 🎯 How It Works

### 1. Discover Trends
1. Click "Discover Trends" button in dashboard
2. React triggers Dify workflow: `trending-discovery`
3. Dify scrapes TinyFish API for Reddit/Twitter/TikTok trends
4. Results parsed with Claude LLM
5. Data saved to PostgreSQL `trending_topics` table
6. Dashboard updates in real-time with new trends

### 2. Generate Videos
1. Select a trending topic
2. Choose style: Viral, News, or Educational
3. Click "Generate Video"
4. React triggers Dify workflow: `video-generation`
5. Claude generates detailed Google Veo prompt
6. Veo generates professional video (5 minutes)
7. Video appears in approval queue
8. Approve before posting

### 3. Schedule & Post
1. Click approved video
2. Edit caption and hashtags
3. Select posting platforms (TikTok, Instagram, YouTube)
4. Choose schedule time (or post immediately)
5. Dify workflow: `tiktok-posting` posts to TikTok
6. Post ID saved for tracking

### 4. Track Performance
1. Dify workflow: `performance-tracking` runs hourly
2. Polls TikTok API for latest metrics
3. Updates `analytics_data` table
4. Dashboard shows views, likes, comments, engagement rate
5. Identify top-performing content

## 📋 Project Structure

```
trendtok-dashboard/
├── src/
│   ├── App.tsx                      # Main app with routing
│   ├── main.tsx                     # React entry point
│   ├── pages/                       # 7 main pages
│   │   ├── Dashboard.tsx            # Overview with metrics
│   │   ├── TrendingTopics.tsx       # Trend discovery
│   │   ├── VideoStudio.tsx          # Video generation
│   │   ├── ApprovalQueue.tsx        # Approve videos
│   │   ├── Publishing.tsx           # Schedule posts
│   │   ├── Analytics.tsx            # Performance tracking
│   │   └── Automations.tsx          # Workflow management
│   ├── components/                  # Reusable components
│   │   ├── layout/
│   │   ├── common/
│   │   ├── forms/
│   │   ├── charts/
│   │   └── video/
│   ├── hooks/                       # Custom React hooks
│   │   ├── useDifyAPI.ts           # Dify integration
│   │   ├── useTrends.ts
│   │   ├── useVideos.ts
│   │   └── ...more
│   ├── api/
│   │   ├── difyClient.ts           # Dify API wrapper
│   │   └── types.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── animations.css
│   │   └── design-system.css
│   └── utils/
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (Vercel Postgres recommended)
- Dify Cloud account (free)
- API keys for: Google Veo, OpenAI, TikTok, TinyFish

### 1. Clone Repository
```bash
git clone https://github.com/PrototypeMega/trendtok-dashboard.git
cd trendtok-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp .env.production.example .env.production
# Fill in your API keys
```

### 4. Set Up Database
See: `DATABASE_AND_DIFY_SETUP.md` (Part 1: Database Setup)

### 5. Create Dify Workflows
See: `DATABASE_AND_DIFY_SETUP.md` (Part 2: Dify Workflow Setup)

### 6. Run Locally
```bash
npm run dev
```

### 7. Deploy to Vercel
```bash
npm run build
npx vercel deploy --prod
```

## 📖 Documentation

- **[DATABASE_AND_DIFY_SETUP.md](DATABASE_AND_DIFY_SETUP.md)** - Complete setup guide for database and Dify workflows
- **[PHASE4_SETUP_GUIDE.md](PHASE4_SETUP_GUIDE.md)** - Detailed Dify workflow creation instructions
- **[GOOGLE_SITES_LANDING_PAGE.md](GOOGLE_SITES_LANDING_PAGE.md)** - Landing page setup at trendtokai.com
- **[LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md)** - Pre-launch checklist and launch day timeline
- **[setup-database.sql](setup-database.sql)** - PostgreSQL schema with 7 tables + 3 views
- **[COMPLETE_SETUP.ps1](COMPLETE_SETUP.ps1)** - Automated setup script for Windows

## 🎨 Design System

TrendTok AI uses **"The Kinetic Curator"** design system featuring:

- **Primary Color**: Cyan (#006970) - Represents precision and automation
- **Secondary Color**: Violet (#712ae2) - Represents AI and creativity
- **Accent Color**: Coral (#ba1340) - Represents trending and urgency

- **Typography**: Manrope (headlines) + Inter (body)
- **Spacing**: 8px base unit scale
- **Shadows**: Tonal layering (no borders)
- **Animations**: 11 custom keyframe animations

## 🔧 API Integrations

### External APIs Used
- **TinyFish**: Scraping trending topics from social media
- **Google Veo**: Generating AI videos
- **TikTok API**: Posting videos and tracking metrics
- **OpenAI**: Caption generation via Claude LLM
- **Dify Cloud**: Workflow orchestration

### Database Tables
- `trending_topics` - Discovered trends
- `generated_videos` - Generated videos
- `tiktok_posts` - Posted content
- `analytics_data` - Performance metrics
- `automation_runs` - Automation execution history
- `workflow_logs` - Workflow execution logs
- `user_preferences` - User settings

### Views
- `top_performing_videos` - Best videos by engagement
- `recent_activity` - Latest actions
- `daily_metrics` - Daily performance summary

## 🧪 Testing

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Format code
npm run format

# Lint
npm run lint
```

## 📊 Success Metrics

After deployment, track these metrics:

### Technical
- Lighthouse score > 90 ✅
- Page load time < 2s ✅
- Zero console errors ✅
- Mobile responsive ✅
- Dark mode support ✅

### User Adoption
- 100+ dashboard users
- 50+ videos generated
- 10+ posts published
- Average engagement rate > 5%

### Business
- Trending on dev communities
- GitHub stars > 100
- Social media mentions
- Press coverage

## 🤝 Contributing

TrendTok AI is open-source! We welcome contributions.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- **Dify** for no-code workflow orchestration
- **Google Veo** for AI video generation
- **TikTok API** for platform integration
- **Vercel** for serverless deployment
- **Tailwind CSS** for utility-first styling

## 🐛 Issues & Support

Found a bug or have a feature request?

1. Check existing issues on GitHub
2. Create new issue with details
3. Include error messages and screenshots
4. Describe expected vs actual behavior

## 📞 Contact

- **GitHub**: https://github.com/PrototypeMega/trendtok-dashboard
- **Email**: bitcoinwonderboy@gmail.com
- **Website**: trendtokai.com (coming soon)

---

**TrendTok AI: Automate Your TikTok Success** 🚀

Made with ❤️ for content creators everywhere
