# Phase 4: Dify Cloud Workflows Setup Guide

## Overview

This guide walks you through setting up all Dify workflows for TrendTok AI. The workflows are the automation engine that powers:
- Trend discovery
- Video generation
- TikTok posting
- Performance tracking

**Estimated time**: 2-3 hours

## Step 1: Set Up Dify Cloud Account

1. Go to https://cloud.dify.ai
2. Sign up or log in
3. Create a new workspace: "trendtok-ai"
4. You're ready to create workflows

## Step 2: Create Database

### Option A: Use Vercel Postgres (Recommended)
1. Go to Vercel Dashboard → Storage
2. Click "Create Database" → PostgreSQL
3. Copy the connection string
4. Run the SQL from `setup-database.sql`:
   ```bash
   psql your-connection-string < setup-database.sql
   ```

### Option B: Use Railway.app
1. Go to https://railway.app
2. New project → PostgreSQL
3. Copy connection string
4. Run setup script

### Option C: Use Local PostgreSQL
```bash
createdb trendtok_ai
psql trendtok_ai < setup-database.sql
```

## Step 3: Add Dify Environment Variables to Vercel

In your Vercel project settings, add:

```
VITE_DIFY_API_KEY=sk-tinyfish-2hY49-DKorEJV3lutZ6dheSbdxdihNSv
VITE_DIFY_API_URL=https://api.dify.ai/v1
DATABASE_URL=your-postgres-connection-string
GOOGLE_API_KEY=your-google-cloud-api-key
TIKTOK_API_TOKEN=your-tiktok-api-token
```

## Step 4: Create Dify Workflows

### Workflow 1: Trending Discovery (30 mins)

**In Dify UI:**
1. Click "Create Workflow" → Select "Blank"
2. Name: `trending-discovery`
3. Add nodes:
   - **Start**: No input
   - **HTTP Request**:
     - Method: GET
     - URL: `https://agent.tinyfish.ai/api/trends`
     - Headers: Add `Authorization: Bearer sk-tinyfish-2hY49-DKorEJV3lutZ6dheSbdxdihNSv`
   - **LLM (GPT-4)**:
     - System: "You are a data analyst specializing in social media trends."
     - User: "Parse this trending data and extract: topic, source, engagement_score, hashtags. Return as JSON array."
   - **Database Query**:
     - Query: `INSERT INTO trending_topics (title, source, engagement_score, hashtags) VALUES ($1, $2, $3, $4)`
   - **End**: Return the parsed data
4. Click "Publish"
5. Test: Click "Run" and verify data appears in PostgreSQL

**Connection Steps:**
```
Start → HTTP Request → LLM → Database Query → End
```

### Workflow 2: Video Generation (30 mins)

**In Dify UI:**
1. Click "Create Workflow" → Select "Blank"
2. Name: `video-generation`
3. Add nodes:
   - **Start**: Input variables: `topic_id`, `style`, `duration`
   - **Database Query**:
     - Query: `SELECT * FROM trending_topics WHERE id = $1`
   - **LLM (GPT-4)**:
     - Prompt: "Create a detailed video prompt for Google Veo about {{topic}}. Include visual style, pacing, and key elements."
   - **HTTP Request**:
     - Method: POST
     - URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
     - Headers: Add `x-goog-api-key: {{google_api_key}}`
     - Body: `{"contents": [{"parts": [{"text": "Generate a {{duration}}s video: {{prompt}}"}]}]}`
   - **Delay**: 300 seconds (wait for processing)
   - **Database Query**:
     - Query: `INSERT INTO generated_videos (topic_id, title, video_url, duration, status) VALUES ($1, $2, $3, $4, 'ready')`
   - **End**: Return video details
4. Click "Publish"
5. Test: Go to React app → Video Studio → Generate Video

### Workflow 3: TikTok Posting (30 mins)

**In Dify UI:**
1. Click "Create Workflow" → Select "Blank"
2. Name: `tiktok-posting`
3. Add nodes:
   - **Start**: Input: `video_id`, `caption_override`, `schedule_time`
   - **Database Query**:
     - Query: `SELECT * FROM generated_videos WHERE id = $1`
   - **LLM (GPT-4)**:
     - Prompt: "Create a viral TikTok caption (max 150 chars) with hashtags. Topic: {{topic}}"
   - **HTTP Request** (TikTok API):
     - Method: POST
     - URL: `https://open-api.tiktok.com/v1/video/upload/`
     - Headers: Add `Authorization: Bearer {{tiktok_api_token}}`
     - Body: Upload video with caption
   - **Database Query**:
     - Query: `INSERT INTO tiktok_posts (video_id, caption, tiktok_post_id, status) VALUES ($1, $2, $3, 'posted')`
   - **End**: Return post details
4. Click "Publish"
5. Test: Use test TikTok account to verify posts work

### Workflow 4: Performance Tracking (30 mins)

**In Dify UI:**
1. Click "Create Workflow" → Select "Blank"
2. Name: `performance-tracking`
3. Add nodes:
   - **Start**: Input: `post_id`
   - **Database Query**:
     - Query: `SELECT tiktok_post_id FROM tiktok_posts WHERE id = $1`
   - **HTTP Request** (TikTok API):
     - Method: GET
     - URL: `https://open-api.tiktok.com/v1/video/query/`
     - Headers: Add `Authorization: Bearer {{tiktok_api_token}}`
     - Params: `post_id={{tiktok_post_id}}`
   - **LLM (GPT-4)**:
     - Prompt: "Analyze metrics: views={{views}}, likes={{likes}}, comments={{comments}}. Calculate engagement rate and provide insights."
   - **Database Query**:
     - Query: `INSERT INTO analytics_data (post_id, views, likes, comments, shares) VALUES ($1, $2, $3, $4, $5)`
   - **End**: Return metrics
4. Click "Publish"
5. Test: Run 1 hour after posting

## Step 5: Verify Integration

### Test Trend Discovery
```bash
curl -X POST https://trendtok-dashboard.vercel.app/api/dify/discover-trends \
  -H "Content-Type: application/json"
```

### Test Video Generation
In React App:
1. Go to Dashboard
2. Click "Discover Trends" button
3. Select a trend
4. Go to "Video Studio"
5. Click "Generate Video"
6. Wait 5-10 minutes
7. Check "Approval Queue" for generated video

### Test Posting
1. Approve video in Approval Queue
2. Go to "Publishing" page
3. Click "Publish Now"
4. Verify post appears on test TikTok account

### Test Analytics
1. Wait 1+ hour after posting
2. Go to "Analytics" page
3. Verify metrics appear

## Step 6: Set Up Automations (Optional)

Create scheduled workflows:

**Daily Trend Discovery** (9:00 AM):
- Trigger: Scheduled (daily)
- Workflow: trending-discovery

**Weekly Auto Post** (Monday 10:00 AM):
- Trigger: Scheduled (weekly)
- Workflow: full-automation-flow

**Hourly Metrics Update** (Every hour):
- Trigger: Scheduled (hourly)
- Workflow: performance-tracking (for all recent posts)

## Troubleshooting

### Workflow Not Running
- Check DIFY_API_KEY is correct
- Verify workflow is published (toggle "Published" in Dify)
- Check Dify execution logs for errors

### Database Connection Failed
- Test connection: `psql $DATABASE_URL -c "SELECT 1"`
- Verify connection string in Vercel env vars
- Check firewall rules if self-hosted

### TikTok API Errors
- Verify token is fresh (may need re-authorization)
- Check API rate limits (100 requests/hour)
- Test with curl first

### Video Generation Hangs
- Increase delay from 300 to 600 seconds
- Check Google API quota usage
- Verify API key has Generative AI access

## Success Indicators

✅ All workflows created and published in Dify
✅ Database tables populated with test data
✅ React app can trigger workflows
✅ Videos generate from trending topics
✅ Posts appear on test TikTok account
✅ Metrics appear in Analytics dashboard
✅ Automations run on schedule

## Next Steps

After Phase 4 is complete:

1. **Phase 5: Polish & Refinement**
   - Enhance dark mode
   - Add loading spinners
   - Improve error messages
   - Add animations

2. **Phase 6: Google Sites Integration**
   - Create landing page
   - Embed React app as iframe
   - Add features documentation
   - Set up custom domain

3. **Launch**
   - Public beta testing
   - Performance monitoring
   - User feedback collection

## Support

- Dify Docs: https://docs.dify.ai
- TikTok API Docs: https://developers.tiktok.com
- Railway Docs: https://docs.railway.app
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres

---

**Status**: Phase 4 ready for implementation
**Estimated Duration**: 2-3 hours
**Complexity**: Medium
