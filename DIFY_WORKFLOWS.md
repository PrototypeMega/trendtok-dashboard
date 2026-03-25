# TrendTok AI - Dify Cloud Workflows Setup Guide

This guide will help you set up all four essential Dify workflows for the TrendTok AI platform.

## Prerequisites
- Dify Cloud account (free tier available at https://cloud.dify.ai)
- API keys for:
  - TinyFish (web scraping): `sk-tinyfish-2hY49-DKorEJV3lutZ6dheSbdxdihNSv`
  - Google Veo (video generation)
  - TikTok API (posting videos)
  - OpenAI (caption generation)

## Workflow 1: Trend Discovery

**Purpose**: Automatically discover trending topics from Reddit, Twitter, and TikTok

**Steps in Dify UI**:
1. Create new workflow: "trending-discovery"
2. Add nodes in order:
   - **Start** node
   - **HTTP Request** node:
     - URL: `https://agent.tinyfish.ai/api/trends`
     - Method: GET
     - Headers: `Authorization: Bearer sk-tinyfish-2hY49-DKorEJV3lutZ6dheSbdxdihNSv`
   - **LLM** node (Claude/GPT-4):
     - Prompt: "Parse this trending data. Extract and structure: topic title, source (reddit/twitter/tiktok), engagement score (0-100), hashtags array. Return as JSON."
   - **Database Query** node:
     - Action: INSERT INTO trending_topics
     - Table: trending_topics
     - Values: title, source, engagement_score, hashtags, created_at
   - **End** node (return parsed data)

**Trigger**:
- Manual (button in React app)
- Scheduled (every 1 hour)

**Expected Output**:
```json
{
  "trends": [
    {
      "id": "trend-123",
      "title": "React 19 Features",
      "source": "twitter",
      "engagement_score": 87,
      "hashtags": ["#React", "#WebDevelopment", "#JavaScript"]
    }
  ]
}
```

---

## Workflow 2: Video Generation

**Purpose**: Generate AI videos from trending topics using Google Veo

**Steps in Dify UI**:
1. Create new workflow: "video-generation"
2. Add nodes in order:
   - **Start** node (input: topic_id, style, duration)
   - **LLM** node (Claude/GPT-4):
     - Prompt: "You're a video prompt expert. Create a detailed, viral-ready video prompt for Google Veo based on this trending topic: {{topic}}. Include: visual style, pacing, transitions, music hints, color palette. Max 200 words."
   - **HTTP Request** node (Google Veo API):
     - URL: `https://generativelanguage.googleapis.com/v1beta/files:generateVideo`
     - Method: POST
     - Headers: `Authorization: Bearer YOUR_GOOGLE_API_KEY`
     - Body: `{"prompt": "{{generated_prompt}}", "duration": "{{duration}}", "style": "{{style}}"}`
   - **Delay** node: Wait 300 seconds (for video processing)
   - **Database Query** node:
     - Action: INSERT INTO generated_videos
     - Table: generated_videos
     - Values: topic_id, video_url, title, duration, status, created_at
   - **End** node (return video URL)

**Trigger**:
- Manual (from React app)
- Invoked by Publishing workflow

**Expected Output**:
```json
{
  "video_id": "vid-456",
  "video_url": "https://storage.example.com/videos/vid-456.mp4",
  "duration": 30,
  "title": "React 19 Explained",
  "status": "ready"
}
```

---

## Workflow 3: TikTok Posting

**Purpose**: Post approved videos to TikTok with AI-generated captions

**Steps in Dify UI**:
1. Create new workflow: "tiktok-posting"
2. Add nodes in order:
   - **Start** node (input: video_id, approved_by, caption_override)
   - **LLM** node (Claude/GPT-4):
     - Prompt: "Create a viral TikTok caption (max 150 chars) for a video about {{topic}}. Include 3-5 relevant trending hashtags. Make it engaging and clickable."
   - **HTTP Request** node (TikTok API):
     - URL: `https://open-api.tiktok.com/v1/video/upload/`
     - Method: POST
     - Headers: `Authorization: Bearer YOUR_TIKTOK_TOKEN`
     - Body: Upload video with caption
   - **Database Query** node:
     - Action: INSERT INTO tiktok_posts
     - Table: tiktok_posts
     - Values: video_id, caption, tiktok_post_id, posted_at, status
   - **Webhook** node:
     - Send POST to: `https://trendtok-dashboard.vercel.app/api/webhooks/post-published`
     - Payload: Post details for React app notification
   - **Conditional** node:
     - Check if schedule_time is in future
     - If yes: Create scheduled task
     - If no: Publish immediately
   - **End** node

**Trigger**:
- Manual (from Publishing page)
- Scheduled (at specific time)

**Expected Output**:
```json
{
  "post_id": "post-789",
  "tiktok_post_id": "tiktok_12345",
  "status": "published",
  "caption": "React 19 just dropped! 🚀 #React #WebDev #JavaScript",
  "posted_at": "2026-03-26T14:30:00Z",
  "video_url": "https://www.tiktok.com/@youraccount/video/12345"
}
```

---

## Workflow 4: Performance Tracking

**Purpose**: Monitor video performance and collect metrics from TikTok

**Steps in Dify UI**:
1. Create new workflow: "performance-tracking"
2. Add nodes in order:
   - **Start** node (input: post_id)
   - **HTTP Request** node (TikTok API):
     - URL: `https://open-api.tiktok.com/v1/video/query/`
     - Method: GET
     - Headers: `Authorization: Bearer YOUR_TIKTOK_TOKEN`
     - Params: `post_id={{post_id}}`
   - **LLM** node (Claude/GPT-4):
     - Prompt: "Analyze these TikTok metrics and calculate engagement rate (likes + comments + shares) / views * 100. Provide brief insights on performance."
   - **Database Query** node:
     - Action: UPDATE analytics_data
     - Table: analytics_data
     - Values: views, likes, comments, shares, engagement_rate
   - **Conditional** node:
     - If engagement_rate > 10%: Add to "top performing" list
     - If engagement_rate < 2%: Flag for analysis
   - **Webhook** node:
     - Send to React dashboard for real-time updates
   - **End** node

**Trigger**:
- Scheduled (every 1 hour after posting)
- Manual refresh from Analytics page

**Expected Output**:
```json
{
  "metrics": {
    "views": 12500,
    "likes": 950,
    "comments": 245,
    "shares": 189,
    "engagement_rate": 9.6,
    "performance_tier": "excellent"
  },
  "insights": "Strong engagement. Consider similar content style for future posts."
}
```

---

## Integration with React App

### How React Triggers Workflows

1. **Dashboard Page**: "Discover Trends" button → `POST /api/dify/workflows/trending-discovery`
2. **Video Studio**: "Generate Video" button → `POST /api/dify/workflows/video-generation`
3. **Publishing Page**: "Publish Now" button → `POST /api/dify/workflows/tiktok-posting`
4. **Analytics Page**: Auto-refresh → `GET /api/dify/workflows/performance-tracking`

### Environment Variables Needed

Add these to Vercel:
```
DIFY_API_KEY=sk-tinyfish-2hY49-DKorEJV3lutZ6dheSbdxdihNSv
DIFY_API_URL=https://api.dify.ai/v1
GOOGLE_API_KEY=your-google-veo-api-key
TIKTOK_API_TOKEN=your-tiktok-api-token
DATABASE_URL=your-postgresql-connection-string
```

---

## Database Schema

The workflows expect these tables to exist in PostgreSQL:

```sql
-- Trending Topics
CREATE TABLE trending_topics (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  source VARCHAR(50),
  engagement_score FLOAT,
  hashtags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Generated Videos
CREATE TABLE generated_videos (
  id UUID PRIMARY KEY,
  topic_id UUID REFERENCES trending_topics,
  title VARCHAR(255),
  video_url TEXT,
  thumbnail_url TEXT,
  duration INT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- TikTok Posts
CREATE TABLE tiktok_posts (
  id UUID PRIMARY KEY,
  video_id UUID REFERENCES generated_videos,
  caption TEXT,
  tiktok_post_id VARCHAR(255),
  status VARCHAR(50),
  posted_at TIMESTAMP,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  shares INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics Data
CREATE TABLE analytics_data (
  id UUID PRIMARY KEY,
  post_id UUID REFERENCES tiktok_posts,
  views INT,
  likes INT,
  comments INT,
  shares INT,
  engagement_rate FLOAT,
  recorded_at TIMESTAMP DEFAULT NOW()
);
```

---

## Testing Workflows

1. **Test Trend Discovery**:
   - Go to Dify Dashboard
   - Click "Run" on trending-discovery workflow
   - Check PostgreSQL: `SELECT * FROM trending_topics ORDER BY created_at DESC LIMIT 5;`

2. **Test Video Generation**:
   - Provide sample topic_id from trending_topics
   - Monitor Dify execution logs
   - Verify video_url is valid

3. **Test TikTok Posting**:
   - Use test TikTok account
   - Verify caption is posted correctly
   - Check tiktok_posts table for record

4. **Test Performance Tracking**:
   - Wait 1 hour after posting (or run manually)
   - Check analytics_data table for metrics
   - Verify in Analytics page dashboard

---

## Troubleshooting

### Workflow Not Triggering from React
- Verify DIFY_API_KEY in Vercel environment variables
- Check React console for API errors
- Ensure workflow is published in Dify

### Video Generation Timeout
- Increase delay node duration to 600 seconds (10 min)
- Check Google Veo API quota
- Verify API key is valid

### TikTok Posting Fails
- Verify TikTok API token is fresh (may need re-authentication)
- Check if video format is correct
- Ensure caption doesn't exceed character limit

### No Metrics Appearing
- Verify TikTok API has read permissions
- Check if posts are actually live on TikTok
- Ensure analytics_data table exists

---

## Next Steps

After setting up workflows:
1. Create a PostgreSQL database (use Vercel Postgres or Railway)
2. Create tables from schema above
3. Update environment variables in Vercel
4. Test each workflow manually in Dify
5. Test end-to-end from React app
6. Enable scheduled triggers for automation

**Estimated setup time**: 1-2 hours

