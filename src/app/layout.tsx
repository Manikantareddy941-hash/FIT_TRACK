"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar as SidebarBase } from "@/components/layout/Sidebar";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { useFitnessStore } from "@/store/fitness-store";
import { useState, useEffect } from "react";

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
  const hasCompletedOnboarding = useFitnessStore(
    (state) => state.hasCompletedOnboarding
  );

  const [mounted, setMounted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // ✅ Effect 1: handle mounting and hydration
  useEffect(() => {
    setMounted(true);
    setShowOnboarding(!hasCompletedOnboarding);

    // Attach debug helper (dev only)
    if (process.env.NODE_ENV === "development") {
      (window as any).resetOnboarding = () => {
        localStorage.clear();
        console.log("Onboarding state cleared");
      };
    }
  }, [hasCompletedOnboarding]);

  // ✅ Effect 2: sync onboarding UI when state changes
  useEffect(() => {
    if (mounted) {
      setShowOnboarding(!hasCompletedOnboarding);
    }
  }, [hasCompletedOnboarding, mounted]);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex`} suppressHydrationWarning>
        {mounted && showOnboarding && !hasCompletedOnboarding && (
          <OnboardingWizard onComplete={() => setShowOnboarding(false)} />
        )}

        <SidebarBase />

        <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
