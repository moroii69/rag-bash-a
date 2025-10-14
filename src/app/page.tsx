"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dithering as DitheringEffect } from "@paper-design/shaders-react";
import { SignUpButton, SignedOut, SignedIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    interface MousePosition {
      x: number;
      y: number;
    }

    interface MouseEventWithClient extends MouseEvent {
      clientX: number;
      clientY: number;
    }

    const handleMouseMove = (e: MouseEventWithClient) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-black overflow-hidden font-mono">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-8 h-8 border-2 border-zinc-800 border-t-[#F48120] rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="absolute inset-0 opacity-30 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`,
        }}
      >
        <DitheringEffect
          colorBack="#00000000"
          colorFront="#F48120"
          speed={1}
          shape="sphere"
          type="4x4"
          size={0.8}
          scale={0.55}
          style={{ height: "100vh", width: "100vw" }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute top-6 left-6 z-10 flex items-center gap-4 text-xs text-zinc-600"
      >
        <span>v1.0.2</span>
        <span className="text-zinc-800">|</span>
        <span>no data stored</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute top-6 right-6 z-10"
      >
        <a
          href="https://github.com/moroii69"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
        >
          github
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: isLoading ? 0 : 1,
            scale: isLoading ? 0.9 : 1,
          }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-flex items-center gap-2 mb-12 px-3 py-1 border border-zinc-800 rounded bg-zinc-950/50 backdrop-blur-sm"
        >
          <div className="w-1.5 h-1.5 bg-[#F48120] rounded-full animate-pulse" />
          <span className="text-zinc-500 text-xs tracking-wider uppercase">
            Available Now
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isLoading ? 0 : 1,
            y: isLoading ? 30 : 0,
          }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-7xl md:text-8xl font-light mb-8 tracking-tight leading-none"
        >
          <span className="bg-gradient-to-r from-white/80 via-white/60 to-white/40 bg-clip-text text-transparent">
            bash
          </span>
          <span className="bg-gradient-to-r from-[#F48120]/60 to-[#F48120]/20 bg-clip-text text-transparent">
            -A
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg text-zinc-400 mb-16 font-light max-w-xl mx-auto leading-relaxed tracking-wide"
        >
          Intelligence that responds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isLoading ? 0 : 1,
            y: isLoading ? 20 : 0,
          }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          {!isSignedIn ? (
            <SignUpButton mode="modal">
              <button className="px-8 py-3 bg-zinc-900/60 text-white rounded border border-zinc-800 hover:border-[#F48120]/40 transition-colors cursor-pointer">
                <span className="flex items-center gap-2 text-sm tracking-wide group-hover:text-[#F48120]/90">
                  Get Started
                </span>
              </button>
            </SignUpButton>
          ) : (
            <button
              onClick={() => router.push("/chat")}
              className="px-8 py-3 bg-zinc-900/60 text-white rounded border border-zinc-800 hover:border-[#F48120]/40 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2 text-sm tracking-wide group-hover:text-[#F48120]/90">
                Start Chatting
              </span>
            </button>
          )}

          <a
            href="https://github.com/moroii69/rag-bash-a"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="group px-8 py-3 text-zinc-400 rounded border border-zinc-900 hover:text-zinc-300 hover:border-zinc-800 transition-all cursor-pointer">
              <span className="text-sm tracking-wide flex items-center gap-2">
                Learn More
                <span className="text-zinc-600 group-hover:text-zinc-500 transition-colors">
                  →
                </span>
              </span>
            </button>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
