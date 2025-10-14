"use client";

import { useState, Fragment } from "react";
import { useChat } from "@ai-sdk/react";
import { Navigation } from "@/components/navigation";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { RefreshCcwIcon, CopyIcon, GlobeIcon } from "lucide-react";
import { nanoid } from "nanoid";

const suggestions: { key: string; value: string }[] = [
  {
    key: nanoid(),
    value: "Give me details about courses offered at Lords Institute",
  },
  { key: nanoid(), value: "What are the college timings?" },
  {
    key: nanoid(),
    value: "Who is the admission incharge and how to contact them?",
  },
  { key: nanoid(), value: "Tell me about upcoming campus events" },
];

export default function RAGChatBot() {
  const [input, setInput] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const { messages, sendMessage, status, regenerate } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text) return;

    sendMessage({
      text: message.text,
    });
    setInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedText("Copied!");
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* Keep Navigation, but remove the decorative gradient overlay */}
      <div className="relative z-10">
        <Navigation />
      </div>

      <header className="relative z-10 max-w-4xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-balance text-2xl md:text-3xl font-semibold tracking-tight">
          Chat
        </h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          Ask questions and get answers in real time. Your latest messages
          appear below.
        </p>
      </header>

      <main
        role="main"
        className="relative z-10 max-w-4xl mx-auto px-4 h-[calc(100vh-10rem)] flex flex-col"
      >
        <div className="flex flex-col h-full py-4 md:py-6">
          <Conversation className="flex-1 mb-4 overflow-hidden rounded-lg border border-border bg-card">
            <ConversationContent className="h-full overflow-y-auto p-3 md:p-6 space-y-4 scrollbar-clean">
              {messages.map((message, messageIndex) => (
                <Fragment key={message.id}>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        const isLastMessage =
                          messageIndex === messages.length - 1;
                        return (
                          <Fragment key={`${message.id}-${i}`}>
                            {message.role === "user" ? (
                              <div className="flex w-full justify-end">
                                <div className="px-4 py-2 rounded-xl bg-secondary text-foreground/90 border border-border max-w-[68%] md:max-w-[60%] text-sm leading-relaxed">
                                  {part.text}
                                </div>
                              </div>
                            ) : (
                              <div className="flex w-full justify-start">
                                <div className="max-w-[85%] md:max-w-[70%]">
                                  <div className="rounded-xl bg-card text-foreground border border-border">
                                    <Response>{part.text}</Response>
                                  </div>
                                  {isLastMessage && (
                                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                      <button
                                        onClick={() => regenerate()}
                                        aria-label="Regenerate response"
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary hover:text-foreground transition-colors"
                                      >
                                        <RefreshCcwIcon className="size-3" />
                                        <span>Regenerate</span>
                                      </button>
                                      <button
                                        onClick={() => handleCopy(part.text)}
                                        aria-label="Copy response"
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary hover:text-foreground transition-colors"
                                      >
                                        {copiedText ? (
                                          <span>{copiedText}</span>
                                        ) : (
                                          <>
                                            <CopyIcon className="size-3" />
                                            <span>Copy</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Fragment>
                        );
                      default:
                        return null;
                    }
                  })}
                </Fragment>
              ))}

              {(status === "submitted" || status === "streaming") && (
                <div className="flex w-full justify-start">
                  <div className="max-w-[85%] md:max-w-[70%] px-3 py-2 rounded-xl bg-muted text-foreground/80 border border-border">
                    <Loader />
                  </div>
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="relative">
            {messages.length === 0 && (
              <div className="mb-4">
                <Suggestions className="[&>*]:bg-secondary [&>*]:text-muted-foreground [&>*]:border-border [&>*]:hover:bg-muted/70 [&>*]:hover:text-foreground">
                  {suggestions.map((suggestion) => (
                    <Suggestion
                      key={suggestion.key}
                      onClick={handleSuggestionClick}
                      suggestion={suggestion.value}
                    />
                  ))}
                </Suggestions>
              </div>
            )}

            <PromptInput
              onSubmit={handleSubmit}
              className="bg-card border border-border focus-within:ring-2 focus-within:ring-ring rounded-xl transition-colors"
            >
              <PromptInputBody>
                <PromptInputTextarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  aria-label="Message"
                  className="bg-transparent text-foreground placeholder:text-muted-foreground resize-none min-h-[48px] max-h-40 outline-none text-sm md:text-base leading-relaxed"
                />
              </PromptInputBody>

              <PromptInputToolbar className="border-t border-border bg-muted/50">
                <PromptInputTools>
                  <div className="flex items-center gap-2">
                    <div
                      className="opacity-60 relative cursor-not-allowed"
                      title="Coming soon"
                    >
                      <PromptInputSpeechButton
                        onTranscriptionChange={setInput}
                        className="pointer-events-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="opacity-60 flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground cursor-not-allowed relative"
                      title="Coming soon"
                    >
                      <GlobeIcon size={16} />
                      <span>Search</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Coming soon
                    </span>
                  </div>
                </PromptInputTools>

                <PromptInputSubmit
                  disabled={
                    !input.trim() ||
                    status === "submitted" ||
                    status === "streaming"
                  }
                  status={status}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                />
              </PromptInputToolbar>
            </PromptInput>

            <p className="text-xs text-muted-foreground text-center mt-3">
              By messaging bash-A, you agree to our{" "}
              <a href="/terms" className="underline hover:text-foreground">
                Terms
              </a>{" "}
              and have read our{" "}
              <a
                href="/privacy-policy"
                className="underline hover:text-foreground"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
