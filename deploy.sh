#!/usr/bin/env bash
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

APP_DIR="/var/www/onward-website"
BRANCH="main"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Deploying Onward Workspaces Website   ${NC}"
echo -e "${BLUE}  Timestamp: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
echo -e "${BLUE}========================================${NC}"

cd "$APP_DIR" || { echo -e "${RED}Error: Cannot cd into $APP_DIR${NC}"; exit 1; }

echo -e "\n${YELLOW}Step 1: Pulling latest changes from git (${BRANCH})...${NC}"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

echo -e "\n${YELLOW}Step 2: Building and restarting Docker containers...${NC}"
docker compose build
docker compose up -d --remove-orphans

echo -e "\n${YELLOW}Step 3: Cleaning up old unused Docker images...${NC}"
docker image prune -f

echo -e "\n${YELLOW}Step 4: Performing health check...${NC}"
MAX_RETRIES=30
COUNT=0
HEALTHY=false

while [ $COUNT -lt $MAX_RETRIES ]; do
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000 || true)
  if [ "$HTTP_STATUS" = "200" ]; then
    HEALTHY=true
    break
  fi
  COUNT=$((COUNT + 1))
  sleep 2
done

if [ "$HEALTHY" = true ]; then
  echo -e "${GREEN}✓ Application is UP and healthy (HTTP 200 on port 3000)!${NC}"
else
  echo -e "${RED}✗ Health check failed! HTTP status: $HTTP_STATUS${NC}"
  docker compose logs --tail=50
  exit 1
fi

echo -e "\n${YELLOW}Step 5: Verifying Nginx reverse proxy...${NC}"
NGINX_STATUS=$(curl -s -k -o /dev/null -w "%{http_code}" -H "Host: onwardworkspaces.com" https://127.0.0.1 || true)
if [ "$NGINX_STATUS" = "200" ]; then
  echo -e "${GREEN}✓ Nginx is proxying traffic properly (HTTP 200)!${NC}"
else
  echo -e "${YELLOW}! Nginx returned HTTP $NGINX_STATUS. Reloading nginx...${NC}"
  nginx -t && systemctl reload nginx
fi

echo -e "\n${YELLOW}Step 6: Pre-warming key pages and images in cache...${NC}"
curl -s -k -o /dev/null -H "Host: onwardworkspaces.com" https://127.0.0.1/ &
curl -s -k -o /dev/null -H "Host: onwardworkspaces.com" https://127.0.0.1/delhi &
curl -s -k -o /dev/null -H "Host: onwardworkspaces.com" https://127.0.0.1/noida &
curl -s -k -o /dev/null -H "Host: onwardworkspaces.com" https://127.0.0.1/gurgaon &
curl -s -k -o /dev/null -H "Host: onwardworkspaces.com" https://127.0.0.1/locations &
nohup node scripts/warmup-images.mjs > /tmp/warmup.log 2>&1 &
echo -e "${GREEN}✓ Image pre-warming launched in background (logging to /tmp/warmup.log)!${NC}"

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  DEPLOYMENT COMPLETED SUCCESSFULLY!    ${NC}"
echo -e "${GREEN}========================================${NC}"
