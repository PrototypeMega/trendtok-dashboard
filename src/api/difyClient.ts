/**
 * Dify Cloud API Client
 * Integrates TrendTok AI React app with Dify workflows
 */

const DIFY_API_BASE = import.meta.env.VITE_DIFY_API_URL || "https://api.dify.ai/v1";
const DIFY_API_KEY = import.meta.env.VITE_DIFY_API_KEY;

// Workflow names
const WORKFLOWS = {
  TREND_DISCOVERY: "trending-discovery",
  VIDEO_GENERATION: "video-generation",
  TIKTOK_POSTING: "tiktok-posting",
  PERFORMANCE_TRACKING: "performance-tracking",
};

interface WorkflowInput {
  [key: string]: any;
}

interface WorkflowResponse {
  id: string;
  status: "running" | "completed" | "failed";
  result?: any;
  error?: string;
}

interface TrendingTopic {
  id: string;
  title: string;
  source: "reddit" | "twitter" | "tiktok";
  engagement_score: number;
  hashtags: string[];
}

interface GeneratedVideo {
  video_id: string;
  video_url: string;
  duration: number;
  title: string;
  status: string;
}

interface TikTokPost {
  post_id: string;
  tiktok_post_id: string;
  caption: string;
  status: string;
  posted_at: string;
}

interface PerformanceMetrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagement_rate: number;
  performance_tier: string;
}

/**
 * Make authenticated request to Dify API
 */
async function makeRequest(
  method: string,
  endpoint: string,
  body?: WorkflowInput
): Promise<WorkflowResponse> {
  const url = `${DIFY_API_BASE}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "Authorization": `Bearer ${DIFY_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `Dify API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Poll workflow execution status
 */
async function pollWorkflowStatus(
  workflowRunId: string,
  maxAttempts: number = 120,
  delayMs: number = 5000
): Promise<WorkflowResponse> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await makeRequest("GET", `/workflows/${workflowRunId}`);

    if (response.status === "completed" || response.status === "failed") {
      return response;
    }

    // Wait before polling again
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  throw new Error("Workflow execution timeout");
}

/**
 * TREND DISCOVERY WORKFLOW
 * Discovers trending topics from Reddit, Twitter, and TikTok
 */
export async function discoverTrends(): Promise<TrendingTopic[]> {
  const response = await makeRequest("POST", "/workflows/trigger", {
    name: WORKFLOWS.TREND_DISCOVERY,
    inputs: {},
  });

  if (response.status === "failed") {
    throw new Error(response.error || "Trend discovery failed");
  }

  // Poll for completion
  const result = await pollWorkflowStatus(response.id);

  return result.result?.trends || [];
}

/**
 * VIDEO GENERATION WORKFLOW
 * Generates AI videos from trending topics
 */
export async function generateVideo(
  topicId: string,
  style: "viral" | "news" | "educational" = "viral",
  duration: number = 30
): Promise<GeneratedVideo> {
  const response = await makeRequest("POST", "/workflows/trigger", {
    name: WORKFLOWS.VIDEO_GENERATION,
    inputs: {
      topic_id: topicId,
      style,
      duration,
    },
  });

  if (response.status === "failed") {
    throw new Error(response.error || "Video generation failed");
  }

  // Poll for completion (videos take longer, so increase timeout)
  const result = await pollWorkflowStatus(response.id, 60, 10000);

  return result.result;
}

/**
 * TIKTOK POSTING WORKFLOW
 * Posts approved videos to TikTok with AI-generated captions
 */
export async function postToTikTok(
  videoId: string,
  captionOverride?: string,
  scheduleTime?: Date
): Promise<TikTokPost> {
  const response = await makeRequest("POST", "/workflows/trigger", {
    name: WORKFLOWS.TIKTOK_POSTING,
    inputs: {
      video_id: videoId,
      caption_override: captionOverride,
      schedule_time: scheduleTime?.toISOString(),
    },
  });

  if (response.status === "failed") {
    throw new Error(response.error || "TikTok posting failed");
  }

  // Poll for completion
  const result = await pollWorkflowStatus(response.id);

  return result.result;
}

/**
 * PERFORMANCE TRACKING WORKFLOW
 * Tracks video performance metrics from TikTok
 */
export async function trackPerformance(
  postId: string
): Promise<PerformanceMetrics> {
  const response = await makeRequest("POST", "/workflows/trigger", {
    name: WORKFLOWS.PERFORMANCE_TRACKING,
    inputs: {
      post_id: postId,
    },
  });

  if (response.status === "failed") {
    throw new Error(response.error || "Performance tracking failed");
  }

  // Poll for completion
  const result = await pollWorkflowStatus(response.id);

  return result.result?.metrics;
}

/**
 * Batch: Discover Trends → Generate Videos
 * Automatically discovers trends and generates videos
 */
export async function discoverAndGenerate(): Promise<{
  trends: TrendingTopic[];
  videos: GeneratedVideo[];
}> {
  try {
    // Step 1: Discover trends
    const trends = await discoverTrends();

    // Step 2: Generate videos for top 3 trends
    const topTrends = trends.slice(0, 3);
    const videos = await Promise.all(
      topTrends.map((trend) => generateVideo(trend.id))
    );

    return { trends, videos };
  } catch (error) {
    console.error("Discover and generate failed:", error);
    throw error;
  }
}

/**
 * Batch: Generate → Post → Track
 * Full automation: generate video, post it, and start tracking
 */
export async function fullAutomationFlow(topicId: string): Promise<{
  video: GeneratedVideo;
  post: TikTokPost;
  metrics: PerformanceMetrics;
}> {
  try {
    // Step 1: Generate video
    const video = await generateVideo(topicId);

    // Step 2: Post to TikTok
    const post = await postToTikTok(video.video_id);

    // Step 3: Start tracking metrics
    const metrics = await trackPerformance(post.post_id);

    return { video, post, metrics };
  } catch (error) {
    console.error("Full automation flow failed:", error);
    throw error;
  }
}

/**
 * Get workflow execution history
 */
export async function getWorkflowHistory(
  workflowName: string,
  limit: number = 10
): Promise<any[]> {
  const response = await makeRequest(
    "GET",
    `/workflows/${workflowName}/runs?limit=${limit}`
  );
  return response.result || [];
}

/**
 * Cancel running workflow
 */
export async function cancelWorkflow(workflowRunId: string): Promise<void> {
  await makeRequest("POST", `/workflows/${workflowRunId}/cancel`);
}

export default {
  discoverTrends,
  generateVideo,
  postToTikTok,
  trackPerformance,
  discoverAndGenerate,
  fullAutomationFlow,
  getWorkflowHistory,
  cancelWorkflow,
};
