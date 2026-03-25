#!/bin/bash

PROJECT_ID="trendtok-dashboard"
TEAM_ID="prototypemegas-projects"

# Get the Vercel token from the CLI
VERCEL_TOKEN=$(cat ~/.vercel/auth.json 2>/dev/null | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Add VITE_DIFY_API_KEY
curl -X POST "https://api.vercel.com/v9/projects/$PROJECT_ID/env" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "VITE_DIFY_API_KEY",
    "value": "sk-tinyfish-2hY49-DKorEJV3lutZ6dheSbdxdihNSv",
    "target": ["production", "preview", "development"]
  }'

# Add VITE_TINYFISH_API_KEY
curl -X POST "https://api.vercel.com/v9/projects/$PROJECT_ID/env" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "VITE_TINYFISH_API_KEY",
    "value": "sk-tinyfish-2hY49-DKorEJV3lutZ6dheSbdxdihNSv",
    "target": ["production", "preview", "development"]
  }'

# Add VITE_DIFY_API_URL
curl -X POST "https://api.vercel.com/v9/projects/$PROJECT_ID/env" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "VITE_DIFY_API_URL",
    "value": "https://api.dify.ai/v1",
    "target": ["production", "preview", "development"]
  }'
