# Logging Reference Guide

## Log Format

All logs follow this standardized format:

```
[TIMESTAMP] [LEVEL] [CONTEXT] MESSAGE | METADATA
```

## Log Levels

- **INFO**: Normal operations and successful completions
- **WARN**: Non-critical issues or fallback scenarios
- **ERROR**: Failures and exceptions
- **DEBUG**: Detailed debugging information

## Request Flow Logging

### 1. Request Received

```
[INFO] [ChatAPI] Received chat request | {"requestId":"..."}
```

### 2. Body Parsed

```
[INFO] [ChatAPI] Parsed request body | {"requestId":"...","messageCount":N}
```

### 3. Query Processing

```
[INFO] [ChatAPI] Processing user query | {"requestId":"...","queryLength":N}
```

### 4. KB Search Phase

```
[INFO] [ChatAPI] Starting knowledge base search phase | {"requestId":"...","model":"gemini-2.5-flash-lite","toolsEnabled":["searchKnowledgeBase"]}
```

### 5. Tool Execution

```
[INFO] [ChatAPI] Executing knowledge base search | {"query":"..."}
[INFO] [ChatAPI] Knowledge base search completed | {"query":"...","resultCount":N,"durationMs":N}
```

### 6. Step Completion

```
[INFO] [ChatAPI] KB search step completed | {"requestId":"...","toolCalls":N,"hasText":true}
```

### 7. Request Completion (Success)

```
[INFO] [ChatAPI] Request completed with knowledge base search | {"requestId":"...","model":"gemini-2.5-flash-lite","durationMs":N}
```

### 8. Fallback Scenario

```
[WARN] [ChatAPI] Knowledge base search failed, falling back to web search | {"requestId":"...","error":"..."}
[INFO] [ChatAPI] Starting web search phase | {"requestId":"...","model":"gemini-2.5-flash","toolsEnabled":["google_search"]}
```

### 9. Error Handling

```
[ERROR] [ChatAPI] Request processing failed | {"requestId":"...","durationMs":N,"error":"...","stack":"..."}
```

## Monitoring Tips

### Track Request Performance

Filter logs by requestId to see the full lifecycle of a request:

```bash
grep "requestId\":\"550e8400" logs.txt
```

### Monitor KB Search Success Rate

```bash
grep "Knowledge base search completed" logs.txt | wc -l
grep "No results found in knowledge base" logs.txt | wc -l
```

### Identify Slow Requests

```bash
grep "durationMs" logs.txt | sort -t: -k6 -n
```

### Monitor Fallback Frequency

```bash
grep "falling back to web search" logs.txt | wc -l
```

## Key Metrics to Track

1. **Request Duration**: Time from request to response
2. **Tool Call Count**: Number of tool invocations per request
3. **KB Success Rate**: Percentage of requests handled by KB only
4. **Fallback Rate**: Percentage of requests requiring web search
5. **Error Rate**: Failed requests per time period
6. **Query Length Distribution**: Understanding user query patterns

## Alert Thresholds (Recommended)

- **Error Rate**: > 5% errors per hour
- **Average Duration**: > 10 seconds per request
- **KB Miss Rate**: > 70% requiring fallback
- **Fallback Failures**: Any fallback failures indicate system issues
