#!/usr/bin/env bash
# Prepares public/demo.mp4 for the web:
#  - if it is over 15 MB, re-encodes it (H.264, max 1080p, CRF 26, faststart, audio kept)
#  - creates public/demo.webm (VP9 + Opus)
#  - creates public/demo-poster.jpg from a frame 3 seconds in (override: POSTER_AT=7 ./scripts/prepare-video.sh)
set -euo pipefail
cd "$(dirname "$0")/../public"

[ -f demo.mp4 ] || { echo "public/demo.mp4 not found"; exit 1; }
SCALE="scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2"

size=$(wc -c < demo.mp4 | tr -d " ")
if [ "$size" -gt $((${LIMIT_MB:-15} * 1024 * 1024)) ]; then
  echo "demo.mp4 is $((size / 1024 / 1024)) MB, compressing..."
  ORIG=../scripts/.demo-original.mp4
  [ -f "$ORIG" ] || cp demo.mp4 "$ORIG"
  ffmpeg -y -loglevel error -i "$ORIG" -vf "$SCALE" \
    -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
    -c:a aac -b:a 128k demo.mp4
fi

echo "Creating demo.webm..."
ffmpeg -y -loglevel error -i demo.mp4 -vf "$SCALE" \
  -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -deadline good -cpu-used 4 \
  -c:a libopus -b:a 96k demo.webm

echo "Creating demo-poster.jpg..."
ffmpeg -y -loglevel error -ss "${POSTER_AT:-3}" -i demo.mp4 -frames:v 1 -vf "$SCALE" -q:v 3 demo-poster.jpg

ls -lh demo.mp4 demo.webm demo-poster.jpg
