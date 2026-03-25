# TrendTok AI - Database & Dify Setup Guide

## Part 1: Database Setup

### Option A: Vercel Postgres (Recommended - Easiest)

**Step 1: Create Vercel Postgres Database**
1. Go to https://vercel.com/dashboard
2. Navigate to your project "trendtok-dashboard"
3. Click "Storage" tab at the top
4. Click "Create Database" → "Postgres"
5. Name it: `trendtok-db`
6. Select region closest to you
7. Click "Create"
8. Wait for provisioning (2-3 minutes)

**Step 2: Connection String**
1. Click the database you just created
2. Copy the "Postgres" connection string
3. It looks like: `postgresql://user:password@host:port/dbname`
4. Keep this safe - you'll need it in Step 3

**Step 3: Load Schema**
You have two options:

**Option A1: Using Vercel's SQL Editor (Easiest)**
1. In Vercel dashboard, click your Postgres database
2. Click "Query" tab
3. Open the file `setup-database.sql` from your desktop
4. Copy all the SQL code
5. Paste into the Vercel SQL editor
6. Click "Run" to execute all tables and views
7. Check for any errors

**Option A2: Using psql CLI (Command line)**
1. Make sure you have PostgreSQL client installed:
   ```powershell
   # Download from https://www.postgresql.org/download/windows/
   # Or use Chocolatey: choco install postgresql
   ```
2. Get your connection string from Vercel dashboard (Step 2)
3. Run in PowerShell:
   ```powershell
   $env:PGPASSWORD="your_password_from_connection_string"
   psql -h host -U user -d dbname -f "C:\Users\DouglasAhammer\Desktop\setup-database.sql"
   ```
4. Verify it worked - check for table creation messages

**Step 4: Add to Vercel Environment Variables**
1. Go to Vercel project settings
2. Click "Environment Variables"
3. Add new variable:
   - Name: `DATABASE_URL`
   - Value: Your PostgreSQL connection string from Step 2
4. Save

---

### Option B: Self-Hosted PostgreSQL (Advanced)

**Step 1: Install PostgreSQL Locally**
1. Download from https://www.postgresql.org/download/windows/
2. Run installer
3. Remember the password you set for `postgres` user
4. Default port is 5432

**Step 2: Create Database**
```powershell
# Open PowerShell as Administrator
# Connect to PostgreSQL
psql -U postgres

# In psql prompt:
CREATE DATABASE trendtok_db;
\c trendtok_db
```

**Step 3: Load Schema**
```powershell
psql -U postgres -d trendtok_db -f "C:\Users\DouglasAhammer\Desktop\setup-database.sql"
```

**Step 4: Expose for Vercel** (if you want Vercel to access it)
This is complex and requires:
- Port forwarding on your router
- IP whitelist setup
- SSL certificates
- Generally NOT recommended

**Better option**: Use Vercel Postgres instead (Option A above)

---

## Part 2: Dify Workflow Setup

### Prerequisites
1. **Dify Cloud Account**
   - Go to https://dify.ai
   - Sign up free
   - Verify email

2. **API Keys You'll Need**
   - TinyFish API key (you have this ✓)
   - Google Veo API key (from Google Cloud Console)
   - OpenAI API key (for Claude LLM calls)
   - TikTok API credentials (from TikTok Developer Portal)

### Step 1: Get API Keys

**Get OpenAI API Key:**
1. Go to https://platform.openai.com/account/api-keys
2. Click "Create new secret key"
3. Copy and save it safely

**Get Google Veo API Key:**
1. Go to https://console.cloud.google.com
2. Create new project: "TrendTok AI"
3. Enable "Google Veo API" in API library
4. Create OAuth 2.0 credentials
5. Copy API key

**Get TikTok API Credentials:**
1. Go to https://developer.tiktok.com
2. Sign in or create account
3. Create app: "TrendTok AI"
4. Fill in app description
5. Copy Client Key and Client Secret
6. Get User Access Token (this requires user authentication)

### Step 2: Create Dify Workflows

**Important**: All 4 workflows interact with the same PostgreSQL database. The data flows:
- Workflow outputs save to PostgreSQL
- React dashboard reads from PostgreSQL
- Real-time status updates happen via Dify API polling

**Workflow 1: Trend Discovery**

1. **Go to Dify Studio**: https://dify.ai/studio
2. **Click "+ New Workflow"**
3. **Name it**: `trending-discovery`
4. **Set Trigger**: Manual trigger (users will click button in React dashboard)
5. **Add nodes in this order**:

   **Node 1: HTTP Request - TinyFish API**
   - Type: HTTP Request
   - Method: GET
   - URL: `https://api.tinyfish.ai/trending?platforms=reddit,twitter,tiktok`
   - Headers:
     - Authorization: `Bearer YOUR_TINYFISH_API_KEY`
   - Save response as: `raw_trends`

   **Node 2: LLM (Claude) - Parse Trends**
   - Model: Claude 3 (or latest)
   - Prompt:
   ```
   Parse these trending topics and extract structured data:
   Topics: {{raw_trends}}

   Return JSON array with fields:
   - title (topic name)
   - description (brief 1-2 sentence explanation)
   - source (reddit, twitter, or tiktok)
   - engagement_score (1-100 estimate)
   - hashtags (array of related hashtags)

   Return ONLY valid JSON, no markdown.
   ```
   - Save response as: `parsed_trends`

   **Node 3: Database - Insert Trends**
   - Type: Database Insert
   - Connection: Select your PostgreSQL database
   - Table: `trending_topics`
   - Mapping:
     - user_id: `{{current_user_id}}` (or use hardcoded UUID)
     - title: `{{parsed_trends.title}}`
     - description: `{{parsed_trends.description}}`
     - source: `{{parsed_trends.source}}`
     - engagement_score: `{{parsed_trends.engagement_score}}`
     - hashtags: `{{parsed_trends.hashtags}}`
     - status: `'discovered'`
     - created_at: `{{current_timestamp}}`

   **Node 4: Return Output**
   - Return the `parsed_trends` as JSON
   - This will be sent back to React

6. **Test it**:
   - Click "Run" button
   - Check that it completes without errors
   - Look for data inserted into `trending_topics` table

---

**Workflow 2: Video Generation**

1. **In Dify Studio, click "+ New Workflow"**
2. **Name it**: `video-generation`
3. **Set Trigger**: Manual trigger + 2 inputs:
   - Input 1: `topic_id` (text)
   - Input 2: `style` (text) - options: viral, news, educational
   - Input 3: `duration` (number) - seconds

4. **Add nodes**:

   **Node 1: Database Query - Get Topic**
   - Query: `SELECT * FROM trending_topics WHERE id = {{topic_id}}`
   - Save as: `topic_data`

   **Node 2: LLM (Claude) - Generate Veo Prompt**
   - Prompt:
   ```
   You are a professional video prompt writer for Google Veo AI.

   Topic: {{topic_data.title}}
   Description: {{topic_data.description}}
   Style: {{style}}
   Duration: {{duration}} seconds

   Write a detailed, compelling video generation prompt for Google Veo.
   Include:
   - Visual style description
   - Scene composition
   - Camera movement
   - Color palette
   - Audio style

   The prompt should be 2-3 sentences, specific and compelling.
   ```
   - Save as: `veo_prompt`

   **Node 3: HTTP Request - Google Veo API**
   - Type: HTTP Request
   - Method: POST
   - URL: `https://generativelanguage.googleapis.com/v1beta/models/veo-1.0-preview:generateContent`
   - Headers:
     - Authorization: `Bearer {{GOOGLE_API_KEY}}`
     - Content-Type: `application/json`
   - Body (JSON):
   ```json
   {
     "prompt": "{{veo_prompt}}",
     "duration": {{duration}},
     "format": "mp4"
   }
   ```
   - Save as: `veo_response`

   **Node 4: Wait for Completion**
   - Wait 300 seconds (5 minutes) for video generation
   - This is a built-in Wait node in Dify

   **Node 5: Database Insert - Save Video**
   - Table: `generated_videos`
   - Mapping:
     - topic_id: `{{topic_id}}`
     - title: `{{topic_data.title}}`
     - prompt: `{{veo_prompt}}`
     - video_url: `{{veo_response.video_url}}`
     - duration: `{{duration}}`
     - style: `{{style}}`
     - status: `'ready'`
     - created_at: `{{current_timestamp}}`
   - Save as: `video_record`

   **Node 6: Return Output**
   - Return:
   ```json
   {
     "video_id": "{{video_record.id}}",
     "video_url": "{{veo_response.video_url}}",
     "title": "{{topic_data.title}}",
     "status": "ready"
   }
   ```

5. **Test it**:
   - Provide a topic_id from your trending_topics table
   - Click "Run" and wait for completion
   - Check if video appears in `generated_videos` table

---

**Workflow 3: TikTok Posting**

1. **Create new workflow**: `tiktok-posting`
2. **Set inputs**:
   - `video_id` (text)
   - `caption_override` (text, optional)
   - `schedule_time` (timestamp, optional)

3. **Add nodes**:

   **Node 1: Database Query - Get Video**
   - Query: `SELECT * FROM generated_videos WHERE id = {{video_id}}`
   - Save as: `video_data`

   **Node 2: LLM (Claude) - Generate Caption**
   - Prompt:
   ```
   Create an engaging TikTok caption for this video.

   Video Title: {{video_data.title}}
   Video Prompt: {{video_data.prompt}}
   Hashtags: {{topic_data.hashtags}}

   Requirements:
   - Max 150 characters
   - Include 3-5 relevant hashtags
   - Be engaging and trendy
   - Match the video style

   Return ONLY the caption text, nothing else.
   ```
   - Save as: `generated_caption`
   - Note: Use caption_override if provided: `{{caption_override || generated_caption}}`

   **Node 3: HTTP Request - TikTok API**
   - Method: POST
   - URL: `https://open-api.tiktok.com/v1/post/publish/action/publish/`
   - Headers:
     - Authorization: `Bearer {{TIKTOK_USER_TOKEN}}`
   - Body:
   ```json
   {
     "video_url": "{{video_data.video_url}}",
     "caption": "{{caption_override || generated_caption}}",
     "scheduled_time": "{{schedule_time}}"
   }
   ```
   - Save as: `tiktok_response`

   **Node 4: Database Insert - Save Post**
   - Table: `tiktok_posts`
   - Mapping:
     - video_id: `{{video_id}}`
     - caption: `{{caption_override || generated_caption}}`
     - tiktok_post_id: `{{tiktok_response.post_id}}`
     - scheduled_time: `{{schedule_time}}`
     - status: `'posted'`
     - posted_time: `{{current_timestamp}}`

   **Node 5: Return Output**
   - Return post details

---

**Workflow 4: Performance Tracking**

1. **Create new workflow**: `performance-tracking`
2. **Set as Scheduled**: Run every 1 hour
3. **Add nodes**:

   **Node 1: Database Query - Get Active Posts**
   - Query: `SELECT * FROM tiktok_posts WHERE status = 'posted' AND posted_time > NOW() - INTERVAL '30 days' ORDER BY posted_time DESC`
   - Save as: `active_posts`

   **Node 2: Loop Through Posts**
   - For each post in `{{active_posts}}`

   **Node 3 (inside loop): HTTP Request - TikTok Metrics API**
   - Get views, likes, comments for each post
   - Save metrics

   **Node 4 (inside loop): Database Update - Save Metrics**
   - Update `analytics_data` table with new metrics
   - Calculate engagement_rate: `(likes + comments) / views * 100`

   **Node 5: Return**
   - Return summary of updated metrics

---

### Step 3: Test Each Workflow

**Test Trend Discovery**:
1. Click "Run" on trending-discovery workflow
2. Check Dify execution logs for success
3. Verify data in trending_topics table

**Test Video Generation**:
1. Get a topic_id from trending_topics
2. Run video-generation with that topic_id
3. Wait 5 minutes for video to generate
4. Check generated_videos table

**Test TikTok Posting**:
1. Get a video_id from generated_videos
2. Run tiktok-posting with that video_id
3. Check tiktok_posts table

**Test Performance Tracking**:
1. Set it to run manually first (not scheduled)
2. Click "Run" and wait
3. Check analytics_data table for new entries

---

### Step 4: Connect Workflows to Environment Variables

1. In each workflow, replace hardcoded API keys with environment variables:
   - `{{TINYFISH_API_KEY}}`
   - `{{GOOGLE_API_KEY}}`
   - `{{OPENAI_API_KEY}}`
   - `{{TIKTOK_USER_TOKEN}}`
   - `{{DATABASE_URL}}`

2. In Dify, add these in Settings → Environment Variables

---

### Step 5: Deploy Workflows

1. In Dify Studio, click "Publish" on each workflow
2. This makes them accessible via Dify API
3. Get the Workflow IDs (you'll need these for React)

---

## Part 3: Connect Everything (React + Dify + Database)

### Update Vercel Environment Variables

1. Go to Vercel project settings
2. Add these environment variables:
   - `VITE_DATABASE_URL`: Your PostgreSQL connection string
   - `VITE_DIFY_API_KEY`: Your Dify API key (create in Dify account settings)
   - `VITE_DIFY_API_URL`: `https://api.dify.ai/v1`
   - `VITE_TINYFISH_API_KEY`: Your TinyFish key
   - `VITE_GOOGLE_API_KEY`: Your Google Veo key
   - `VITE_TIKTOK_API_TOKEN`: Your TikTok token

3. Save and redeploy to Vercel

### Test End-to-End Flow

1. Open your Vercel deployment (trendtok-dashboard.vercel.app)
2. Click "Discover Trends" button
3. Watch React call Dify → Dify scrapes TinyFish → Database updates
4. New trends appear in dashboard within 30 seconds

---

## Troubleshooting

**Database connection fails**:
- Check CONNECTION_STRING is correct (copy from Vercel or psql)
- Verify IP whitelist (Vercel Postgres auto-allows Vercel IPs)
- Test connection: `psql CONNECTION_STRING`

**Dify workflow fails**:
- Check execution logs in Dify Studio
- Verify API keys are correct
- Test each HTTP node individually
- Check database mapping matches table schema

**React doesn't see data**:
- Open browser DevTools (F12)
- Check Console for fetch errors
- Verify VITE_DIFY_API_URL is correct
- Check Dify API key in environment variables

**Videos not generating**:
- Veo API takes 5+ minutes
- Check Dify workflow hasn't timed out
- Test Google Veo API directly from Dify UI
- Increase timeout in workflow if needed

---

## Success Checklist

- [ ] PostgreSQL database created and accessible
- [ ] setup-database.sql schema loaded successfully
- [ ] All 4 workflows created in Dify Studio
- [ ] Each workflow tested independently and works
- [ ] Workflows connected to PostgreSQL database
- [ ] React dashboard can call Dify workflows
- [ ] Trending topics appear in dashboard
- [ ] Video generation produces videos
- [ ] TikTok posting creates posts
- [ ] Performance tracking updates metrics
- [ ] End-to-end flow works (Discover → Generate → Post → Track)

---

## Next Steps

Once all of the above is complete:

1. Create Google Sites landing page (follow GOOGLE_SITES_LANDING_PAGE.md)
2. Set up analytics tracking
3. Configure error tracking (Sentry)
4. Run final QA and testing
5. Launch! 🚀

