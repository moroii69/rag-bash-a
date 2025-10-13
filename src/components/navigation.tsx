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
		<nav className="border-b border-zinc-800/50 bg-black/40 backdrop-blur-sm">
			<div className="flex container h-16 items-center justify-between px-4 mx-auto">
				<a
					href="/"
					className="text-2xl font-light tracking-tight transition-opacity hover:opacity-80">
					<span className="bg-gradient-to-r from-white/80 to-white/60 bg-clip-text text-transparent">
						bash
					</span>
					<span className="bg-gradient-to-r from-[#F48120]/60 to-[#F48120]/30 bg-clip-text text-transparent">
						-A
					</span>
				</a>

				<div className="flex items-center gap-2">
					<SignedOut>
						<SignInButton mode="modal">
							<Button
								variant="ghost"
								className="text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800/50 transition-all text-sm font-light">
								Sign In
							</Button>
						</SignInButton>
						<SignUpButton mode="modal">
							<Button className="bg-zinc-900/60 text-white border border-zinc-800 hover:border-[#F48120]/40 hover:bg-zinc-800/60 transition-all text-sm font-light">
								Sign Up
							</Button>
						</SignUpButton>
					</SignedOut>

					<SignedIn>
						<a
							href="/chat"
							className="px-4 py-2 text-sm font-light text-zinc-400 hover:text-zinc-300 transition-colors">
							Chat
						</a>
						<SignOutButton>
							<Button
								variant="ghost"
								className="text-zinc-400 hover:text-red-400 hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800/50 transition-all text-sm font-light">
								Sign Out
							</Button>
						</SignOutButton>
					</SignedIn>
				</div>
			</div>
		</nav>
	);
};
