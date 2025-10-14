import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

export const Navigation = () => {
  return (
    <nav className="border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-white hover:text-zinc-400 transition-colors"
          >
            <span className="text-lg font-light">bash-A</span>
          </a>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6 text-sm">
              <a
                href="/chat"
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Chat
              </a>
              <a
                href="/how-it-works"
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                How It Works
              </a>
              <a
                href="/terms"
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Terms
              </a>
              <a
                href="/privacy-policy"
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Privacy
              </a>
            </div>
            <div className="flex items-center gap-4 border-l border-zinc-800 pl-6">
              <SignedOut>
                <SignInButton>
                  <button className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="text-sm text-white hover:text-zinc-300 transition-colors cursor-pointer ml-4">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <SignOutButton>
                  <button className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">
                    Sign Out
                  </button>
                </SignOutButton>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
