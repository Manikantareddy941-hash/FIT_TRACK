"use client";

import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Sidebar as SidebarBase } from "@/components/layout/Sidebar";
import { NavDock } from "@/components/layout/NavDock";
import { QuickLogFAB } from "@/components/ui/QuickLogFAB";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { useFitnessStore } from "@/store/fitness-store";
import { useState, useEffect } from "react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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

  // Only hydration guard
  useEffect(() => {
    setMounted(true);

    if (process.env.NODE_ENV === "development") {
      (window as any).resetOnboarding = () => {
        localStorage.clear();
        console.log("Onboarding state cleared");
      };
    }
  }, []);

  const shouldShowOnboarding = mounted && !hasCompletedOnboarding;

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground flex font-sans`}
        suppressHydrationWarning
      >
        {shouldShowOnboarding && (
          <OnboardingWizard />
        )}

        <div className="hidden lg:block">
          <SidebarBase />
        </div>

        <main className="flex-1 lg:ml-64 p-4 md:p-10 pb-32 lg:pb-10 overflow-x-hidden min-h-screen">
          {children}
        </main>

        <NavDock />
        <QuickLogFAB />
      </body>
    </html>
  );
}
