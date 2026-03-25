-- TrendTok AI Database Schema
-- PostgreSQL setup script for Dify workflow integration

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trending Topics Table
CREATE TABLE IF NOT EXISTS trending_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  source VARCHAR(50) NOT NULL,
  engagement_score FLOAT DEFAULT 0,
  hashtags TEXT[] DEFAULT ARRAY[]::TEXT[],
  keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
  raw_data JSONB,
  status VARCHAR(50) DEFAULT 'discovered',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT source_check CHECK (source IN ('reddit', 'twitter', 'tiktok'))
);

CREATE INDEX idx_trending_created ON trending_topics(created_at DESC);
CREATE INDEX idx_trending_source ON trending_topics(source);
CREATE INDEX idx_trending_engagement ON trending_topics(engagement_score DESC);

-- Generated Videos Table
CREATE TABLE IF NOT EXISTS generated_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES trending_topics(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  prompt TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INT DEFAULT 30,
  style VARCHAR(50) DEFAULT 'viral',
  file_size INT,
  status VARCHAR(50) DEFAULT 'generating',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  CONSTRAINT style_check CHECK (style IN ('viral', 'news', 'educational'))
);

CREATE INDEX idx_videos_topic ON generated_videos(topic_id);
CREATE INDEX idx_videos_status ON generated_videos(status);
CREATE INDEX idx_videos_created ON generated_videos(created_at DESC);

-- TikTok Posts Table
CREATE TABLE IF NOT EXISTS tiktok_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_id UUID REFERENCES generated_videos(id) ON DELETE CASCADE,
  caption TEXT NOT NULL,
  hashtags TEXT[] DEFAULT ARRAY[]::TEXT[],
  tiktok_post_id VARCHAR(255) UNIQUE,
  platform VARCHAR(50) DEFAULT 'tiktok',
  scheduled_time TIMESTAMP,
  posted_time TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending_approval',
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  shares INT DEFAULT 0,
  saves INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT status_check CHECK (status IN ('pending_approval', 'approved', 'scheduled', 'posted', 'failed')),
  CONSTRAINT platform_check CHECK (platform IN ('tiktok', 'instagram', 'youtube'))
);

CREATE INDEX idx_posts_video ON tiktok_posts(video_id);
CREATE INDEX idx_posts_status ON tiktok_posts(status);
CREATE INDEX idx_posts_posted_time ON tiktok_posts(posted_time DESC);
CREATE INDEX idx_posts_platform ON tiktok_posts(platform);

-- Analytics Data Table
CREATE TABLE IF NOT EXISTS analytics_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES tiktok_posts(id) ON DELETE CASCADE,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  shares INT DEFAULT 0,
  saves INT DEFAULT 0,
  engagement_rate FLOAT GENERATED ALWAYS AS (
    CASE
      WHEN views > 0 THEN ((likes + comments + shares + saves)::FLOAT / views * 100)
      ELSE 0
    END
  ) STORED,
  recorded_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_post ON analytics_data(post_id);
CREATE INDEX idx_analytics_recorded ON analytics_data(recorded_at DESC);
CREATE INDEX idx_analytics_engagement ON analytics_data(engagement_rate DESC);

-- Automation Runs Table
CREATE TABLE IF NOT EXISTS automation_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  automation_name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'running',
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  error_message TEXT,
  metrics JSONB,
  CONSTRAINT status_check CHECK (status IN ('running', 'completed', 'failed'))
);

CREATE INDEX idx_runs_automation ON automation_runs(automation_name);
CREATE INDEX idx_runs_started ON automation_runs(started_at DESC);

-- Workflow Logs Table
CREATE TABLE IF NOT EXISTS workflow_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_name VARCHAR(255) NOT NULL,
  workflow_run_id VARCHAR(255),
  status VARCHAR(50),
  input_data JSONB,
  output_data JSONB,
  error_message TEXT,
  duration_ms INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_logs_workflow ON workflow_logs(workflow_name);
CREATE INDEX idx_logs_created ON workflow_logs(created_at DESC);
CREATE INDEX idx_logs_status ON workflow_logs(status);

-- User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255) UNIQUE,
  theme VARCHAR(50) DEFAULT 'light',
  auto_post BOOLEAN DEFAULT FALSE,
  posting_times TEXT[] DEFAULT ARRAY['09:00', '14:00', '19:00']::TEXT[],
  preferred_style VARCHAR(50) DEFAULT 'viral',
  notification_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create views for common queries

-- Top Performing Videos View
CREATE OR REPLACE VIEW top_performing_videos AS
SELECT
  v.id,
  v.title,
  t.title as topic,
  p.views,
  p.likes,
  p.comments,
  p.shares,
  a.engagement_rate,
  p.posted_time,
  ROW_NUMBER() OVER (ORDER BY a.engagement_rate DESC) as rank
FROM generated_videos v
LEFT JOIN tiktok_posts p ON v.id = p.video_id
LEFT JOIN trending_topics t ON v.topic_id = t.id
LEFT JOIN LATERAL (
  SELECT engagement_rate
  FROM analytics_data
  WHERE post_id = p.id
  ORDER BY recorded_at DESC
  LIMIT 1
) a ON TRUE
WHERE p.status = 'posted'
ORDER BY a.engagement_rate DESC NULLS LAST;

-- Recent Activity View
CREATE OR REPLACE VIEW recent_activity AS
SELECT
  'trend' as type,
  id,
  title,
  created_at,
  source,
  NULL::VARCHAR as status
FROM trending_topics
UNION ALL
SELECT
  'video' as type,
  id,
  title,
  created_at,
  NULL::VARCHAR,
  status
FROM generated_videos
UNION ALL
SELECT
  'post' as type,
  id,
  caption,
  created_at,
  NULL::VARCHAR,
  status
FROM tiktok_posts
ORDER BY created_at DESC
LIMIT 50;

-- Daily Metrics View
CREATE OR REPLACE VIEW daily_metrics AS
SELECT
  DATE(p.posted_time) as date,
  COUNT(DISTINCT p.id) as posts_published,
  SUM(a.views) as total_views,
  SUM(a.likes) as total_likes,
  AVG(a.engagement_rate) as avg_engagement,
  MAX(a.engagement_rate) as best_engagement
FROM tiktok_posts p
LEFT JOIN analytics_data a ON p.id = a.post_id
WHERE p.status = 'posted'
GROUP BY DATE(p.posted_time)
ORDER BY date DESC;

-- Grant permissions (if using separate user)
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO trendtok_user;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO trendtok_user;
