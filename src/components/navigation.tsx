"use client";

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/nextjs";

export const Navigation = () => {
  const { isLoaded } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-foreground hover:text-foreground/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            <span className="text-lg font-semibold tracking-tight">bash-A</span>
          </a>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a
                href="/chat"
                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              >
                Chat
              </a>
              <a
                href="/how-it-works"
                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              >
                How It Works
              </a>
              <a
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              >
                Terms
              </a>
              <a
                href="/privacy-policy"
                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              >
                Privacy
              </a>
            </div>

            <div className="flex items-center gap-4 md:border-l md:border-border md:pl-6">
              {!isLoaded ? (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-8 bg-muted rounded-md animate-pulse"></div>
                  <div className="w-20 h-8 bg-muted rounded-md animate-pulse"></div>
                </div>
              ) : (
                <>
                  <SignedOut>
                    <SignInButton>
                      <button className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer px-3 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <SignOutButton>
                      <button className="text-sm text-foreground hover:text-foreground/80 transition-colors cursor-pointer bg-secondary px-3 py-1.5 rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                        Sign Out
                      </button>
                    </SignOutButton>
                  </SignedIn>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
