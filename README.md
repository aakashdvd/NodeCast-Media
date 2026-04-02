# Node-Cast-Media

A live streaming media server I built with Node.js. Supports RTMP, HTTP-FLV, and WebSocket-FLV protocols with low-latency playback.

I started this as a side project to learn about real-time media protocols and ended up building a pretty full-featured streaming server. It handles RTMP ingest from OBS/FFmpeg, serves streams over HTTP-FLV and WebSocket, and has a REST API for managing everything.

## What it does

- **RTMP/RTMPS** ingest — push streams from OBS, FFmpeg, or any RTMP encoder
- **HTTP/HTTP2-FLV** and **WebSocket-FLV** playback — low-latency viewing in browsers
- **GOP caching** — new viewers get instant playback without waiting for a keyframe
- **REST API** with JWT auth — manage streams, sessions, and monitor server health
- **Recording** — save live streams as FLV files for later playback
- **Static file server** — serve a frontend or recorded files
- **H.264, HEVC, VP9, AV1** codec support via enhanced RTMP/FLV

## Getting started

```bash
# clone and install
git clone https://github.com/aakashdvd/Node-Media-Server.git
cd Node-Media-Server
npm install

# run
npm start
```

Default config is in `bin/config.json`. The server starts RTMP on port 1935 and HTTP on port 8000.

### Push a stream

```bash
# using FFmpeg
ffmpeg -re -i input.mp4 -c copy -f flv rtmp://localhost/live/stream1

# or just use OBS with server: rtmp://localhost/live and stream key: stream1
```

### Play a stream

```
HTTP-FLV:    http://localhost:8000/live/stream1.flv
WebSocket:   ws://localhost:8000/live/stream1.flv
```

## REST API

The server has a built-in API for monitoring and management. Authenticate first, then hit the endpoints:

```bash
# login
curl -X POST http://localhost:8001/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# list active streams
curl http://localhost:8001/api/v1/streams \
  -H "Authorization: Bearer <token>"

# server stats (cpu, memory, uptime)
curl http://localhost:8001/api/v1/stats \
  -H "Authorization: Bearer <token>"

# list connected sessions
curl http://localhost:8001/api/v1/sessions \
  -H "Authorization: Bearer <token>"

# kick a session
curl -X DELETE http://localhost:8001/api/v1/sessions/<sessionId> \
  -H "Authorization: Bearer <token>"

# health check
curl http://localhost:8001/api/v1/health
```

## Config

Edit `bin/config.json`:

```json
{
  "rtmp": {
    "port": 1935,
    "chunk_size": 60000,
    "gop_cache": true
  },
  "http": {
    "port": 8000,
    "allow_origin": "*"
  },
  "auth": {
    "play": false,
    "publish": false,
    "secret": "your-secret-key"
  },
  "record": {
    "path": "./html/record"
  }
}
```

## Recording

When recording is enabled, streams are saved as FLV files and can be played back via the static file server:

```
http://localhost:8000/record/live/stream1/1234567890.flv
```

## Tested with

| Client | H.264 | HEVC | VP9 | AV1 |
|--------|-------|------|-----|-----|
| OBS 29.1+ | Yes | Yes | No | Yes |
| FFmpeg 6.1+ | Yes | Yes | Yes | Yes |

## Tech stack

- **Node.js** (>=18) — runtime
- **Express** — HTTP/API server
- **WebSocket (ws)** — WS-FLV transport
- **JWT** — API authentication

## What I learned

Building this taught me a lot about binary protocol parsing (RTMP is wild), media container formats (FLV/fMP4), and real-time data streaming with Node.js. The trickiest part was getting GOP caching right so new viewers don't see artifacts.

## TODO

- [ ] HLS/DASH output support
- [ ] Web-based admin dashboard
- [ ] Docker image
- [ ] Transcoding via FFmpeg
- [ ] Cluster mode for horizontal scaling
