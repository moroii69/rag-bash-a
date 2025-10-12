"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navigation } from "@/components/navigation";
import { usePathname } from "next/navigation";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					{pathname !== "/" && <Navigation />}
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
