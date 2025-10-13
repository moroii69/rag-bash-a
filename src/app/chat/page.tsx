"use client";

import { Fragment, useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Conversation,
	ConversationContent,
	ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
	PromptInput,
	PromptInputBody,
	type PromptInputMessage,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputToolbar,
	PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";
import { Navigation } from "@/components/navigation";

export default function RAGChatBot() {
	const [input, setInput] = useState("");
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const { messages, sendMessage, status } = useChat();

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth - 0.5) * 15,
				y: (e.clientY / window.innerHeight - 0.5) * 15,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const handleSubmit = (message: PromptInputMessage) => {
		if (!message.text) {
			return;
		}
		sendMessage({
			text: message.text,
		});
		setInput("");
	};

	return (
		<div className="relative w-full min-h-screen bg-black font-mono">
			{/* Animated background gradient */}
			<div
				className="absolute inset-0 opacity-15 transition-transform duration-700 ease-out pointer-events-none"
				style={{
					transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
					background: `radial-gradient(circle at ${
						50 + mousePosition.x / 2
					}% ${
						50 + mousePosition.y / 2
					}%, #F48120 0%, transparent 60%)`,
				}}
			/>

			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50 pointer-events-none" />

			{/* Navigation (render only on this page) */}
			<div className="relative z-10">
				<Navigation />
			</div>

			{/* Main chat area */}
			<div className="relative z-10 max-w-4xl mx-auto px-6 h-[calc(100vh-4rem)] flex flex-col">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="flex flex-col h-full py-6">
					{/* Empty state */}
					{messages.length === 0 && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="flex-1 flex items-center justify-center">
							<div className="text-center max-w-2xl">
								<div className="mb-8">
									<h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
										<span className="bg-gradient-to-r from-white/70 via-white/50 to-white/30 bg-clip-text text-transparent">
											Start a conversation
										</span>
									</h2>
									<p className="text-zinc-500 text-sm tracking-wide">
										Intelligence that responds to your needs
									</p>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
									{[
										"Explain quantum computing",
										"Write a Python function",
										"Analyze this dataset",
										"Help me debug code",
									].map((suggestion, i) => (
										<motion.button
											key={i}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: 0.5,
												delay: 0.6 + i * 0.1,
											}}
											onClick={() => setInput(suggestion)}
											className="px-4 py-3 bg-zinc-900/40 border border-zinc-800/50 rounded text-left text-sm text-zinc-400 hover:text-zinc-300 hover:border-zinc-700/50 hover:bg-zinc-900/60 transition-all cursor-pointer group">
											<span className="flex items-center justify-between">
												{suggestion}
												<span className="text-zinc-700 group-hover:text-zinc-600 transition-colors">
													→
												</span>
											</span>
										</motion.button>
									))}
								</div>
							</div>
						</motion.div>
					)}

					{/* Messages */}
					{messages.length > 0 && (
						<Conversation className="flex-1 mb-4">
							<ConversationContent>
								<AnimatePresence mode="popLayout">
									{messages.map((message, idx) => (
										<motion.div
											key={message.id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.4 }}
											className="mb-6">
											{message.parts.map((part, i) => {
												switch (part.type) {
													case "text":
														return (
															<Fragment
																key={`${message.id}-${i}`}>
																<Message
																	from={
																		message.role
																	}
																	className={
																		message.role ===
																		"user"
																			? "justify-end"
																			: "justify-start"
																	}>
																	<MessageContent>
																		<Response
																			className={
																				message.role ===
																				"user"
																					? "text-zinc-200 text-right"
																					: "text-zinc-100 text-left"
																			}>
																			{
																				part.text
																			}
																		</Response>
																	</MessageContent>
																</Message>
															</Fragment>
														);
													default:
														return null;
												}
											})}
										</motion.div>
									))}
								</AnimatePresence>
								{(status === "submitted" ||
									status === "streaming") && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="mb-6">
										<Loader />
									</motion.div>
								)}
							</ConversationContent>
							<ConversationScrollButton />
						</Conversation>
					)}

					{/* Input area */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="relative">
						<div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 to-transparent rounded-lg blur-xl pointer-events-none" />

						<PromptInput
							onSubmit={handleSubmit}
							className="relative bg-zinc-950/60 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/15 focus-within:border-white/20 transition-colors">
							<PromptInputBody>
								<PromptInputTextarea
									value={input}
									onChange={(e) => setInput(e.target.value)}
									placeholder="Ask anything..."
									className="bg-zinc-900/40 text-zinc-100 placeholder:text-zinc-500 focus:outline-none resize-none transition-colors"
								/>
							</PromptInputBody>
							<PromptInputToolbar className="border-t border-zinc-800/30 bg-zinc-900/20">
								<PromptInputTools>
									{/* model selector, web search, etc. */}
								</PromptInputTools>
								<PromptInputSubmit
									disabled={!input && !status}
									status={status}
									className="disabled:opacity-40 disabled:cursor-not-allowed hover:text-[#F48120] transition-colors"
								/>
							</PromptInputToolbar>
						</PromptInput>

						<p className="text-xs text-zinc-700 text-center mt-3">
							bash-A can make mistakes. Consider verifying
							important information.
						</p>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
