"use client";

import { useState, Fragment } from "react";
import { useChat } from "@ai-sdk/react";
import { Navigation } from "@/components/navigation";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className="w-full min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/3 pointer-events-none" />
      <div className="relative z-10">
        <Navigation />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex flex-col h-full py-6">
          <Conversation className="flex-1 mb-4 overflow-hidden">
            <ConversationContent className="h-full overflow-y-auto scrollbar-clean">
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
                              <div className="flex w-full py-4 justify-end">
                                <div className="px-3 py-2 rounded-lg bg-zinc-800/30 text-zinc-300 max-w-[60%]">
                                  {part.text}
                                </div>
                              </div>
                            ) : (
                              <div className="flex w-full py-2 justify-start">
                                <div className="max-w-[80%]">
                                  <Response>{part.text}</Response>
                                  {isLastMessage && (
                                    <div className="flex justify-start gap-4 mt-1">
                                      <button
                                        onClick={() => regenerate()}
                                        className="text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/20 px-2 py-1 rounded transition-colors cursor-pointer"
                                      >
                                        <RefreshCcwIcon className="size-3 inline mr-1" />
                                        Regenerate
                                      </button>
                                      <button
                                        onClick={() => handleCopy(part.text)}
                                        className="text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/20 px-2 py-1 rounded transition-colors cursor-pointer"
                                      >
                                        {copiedText ? (
                                          <span>{copiedText}</span>
                                        ) : (
                                          <>
                                            <CopyIcon className="size-3 inline mr-1" />
                                            Copy
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
                <div className="flex w-full justify-start py-4">
                  <div className="max-w-[80%] px-3 py-2 rounded-lg bg-transparent text-zinc-300">
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
                <Suggestions className="[&>*]:bg-zinc-800/30 [&>*]:text-zinc-500 [&>*]:border-zinc-700/50 [&>*]:hover:bg-zinc-700/40 [&>*]:hover:text-zinc-300">
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
              className="bg-zinc-900/50 border border-red-500 hover:border-zinc-500 focus-within:border-zinc-500 focus-visible:ring-0 ring-0 rounded-lg transition-none"
            >
              <PromptInputBody>
                <PromptInputTextarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-transparent text-white placeholder:text-zinc-500 resize-none min-h-[48px] max-h-32 outline-none"
                />
              </PromptInputBody>

              <PromptInputToolbar className="border-t border-zinc-800/50 bg-zinc-900/30">
                <PromptInputTools>
                  <div className="flex items-center gap-2">
                    <div
                      className="opacity-50 relative cursor-not-allowed"
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
                      className="opacity-50 flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 cursor-not-allowed relative"
                      title="Coming soon"
                    >
                      <GlobeIcon size={16} />
                      <span>Search</span>
                    </div>
                    <span className="text-xs text-orange-500/30">
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
                  className="text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                />
              </PromptInputToolbar>
            </PromptInput>

            <p className="text-xs text-zinc-600 text-center mt-3">
              By messaging bash-A, you agree to our{" "}
              <a
                href="/terms"
                className="text-zinc-400 hover:text-[#F48120]/60 underline"
              >
                Terms
              </a>{" "}
              and have read our{" "}
              <a
                href="/privacy-policy"
                className="text-zinc-400 hover:text-[#F48120]/60 underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
