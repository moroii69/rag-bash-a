# Changelog

## 2025-10-20 - Chat API Improvements

### Changes Made

#### 1. Professional Logging System
- **Added Logger Class**: Implemented a structured logging system with the following features:
  - Timestamp-based logs in ISO 8601 format
  - Context-aware logging (ChatAPI context)
  - Log levels: INFO, WARN, ERROR, DEBUG
  - Structured metadata in JSON format
  - No emojis - professional format only

#### 2. Two-Model Architecture
- **Fixed AI SDK Warning**: Resolved the "Cannot mix function tools with provider-defined tools" error
- **Primary Model (KB Search)**: `gemini-2.5-flash-lite`
  - Used for initial knowledge base searches
  - Limited to 5 steps for efficiency
  - Only has access to `searchKnowledgeBase` tool
- **Secondary Model (Web Search)**: `gemini-2.5-flash`
  - Used as fallback when KB search fails
  - Has access to `google_search` tool only
  - Maximum 10 steps for comprehensive web searches

#### 3. Intelligent Model Switching
- System now tries KB search first with flash-lite model
- If KB search fails (error or no results), automatically switches to flash model for web search
- Each model only has access to its specific tools, preventing tool conflicts

#### 4. Enhanced Monitoring
- Request-level tracking with unique request IDs
- Duration tracking for all operations
- Step-by-step logging with tool call counts
- Detailed error logging with stack traces
- Query length tracking

### Log Format Examples

```
[2025-10-20T10:15:30.123Z] [INFO] [ChatAPI] Received chat request | {"requestId":"550e8400-e29b-41d4-a716-446655440000"}
[2025-10-20T10:15:30.125Z] [INFO] [ChatAPI] Parsed request body | {"requestId":"550e8400-e29b-41d4-a716-446655440000","messageCount":3}
[2025-10-20T10:15:30.126Z] [INFO] [ChatAPI] Starting knowledge base search phase | {"requestId":"550e8400-e29b-41d4-a716-446655440000","model":"gemini-2.5-flash-lite","toolsEnabled":["searchKnowledgeBase"]}
[2025-10-20T10:15:30.500Z] [INFO] [ChatAPI] Executing knowledge base search | {"query":"What are the fees for B.Tech?"}
[2025-10-20T10:15:31.200Z] [INFO] [ChatAPI] Knowledge base search completed | {"query":"What are the fees for B.Tech?","resultCount":3,"durationMs":700}
[2025-10-20T10:15:32.456Z] [INFO] [ChatAPI] Request completed with knowledge base search | {"requestId":"550e8400-e29b-41d4-a716-446655440000","model":"gemini-2.5-flash-lite","durationMs":2333}
```

### Technical Details

- **Separation of Concerns**: KB tools and web search tools are now completely separate
- **Error Handling**: Graceful fallback from KB to web search on failures
- **Performance Tracking**: All operations are timed and logged
- **Type Safety**: All TypeScript errors resolved

### Benefits

1. **No More Warnings**: Resolved AI SDK tool mixing warning
2. **Cost Optimization**: Uses cheaper flash-lite model for KB searches
3. **Better Performance**: Flash-lite is faster for simple KB lookups
4. **Enhanced Debugging**: Professional logs make troubleshooting easier
5. **Scalability**: Clear separation makes it easy to add more models/tools in future
