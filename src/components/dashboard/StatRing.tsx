"use client";

import { motion } from "framer-motion";

interface StatRingProps {
    label: string;
    value: number;
    max: number;
    color: string;
    unit: string;
    icon?: React.ReactNode;
}

export function StatRing({ label, value, max, color, unit, icon }: StatRingProps) {
    const radius = 60;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / max) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-card rounded-xl border border-border shadow-sm">
            <div className="relative flex items-center justify-center">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="rotate-[-90deg] transition-all duration-500"
                >
                    <circle
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + " " + circumference}
                        style={{ strokeDashoffset: 0 }}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className="text-muted/20"
                    />
                    <motion.circle
                        stroke={color}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + " " + circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="absolute flex flex-col items-center text-center">
                    {icon && <span className="mb-1 text-muted-foreground">{icon}</span>}
                    <span className="text-2xl font-bold">{value}</span>
                    <span className="text-xs text-muted-foreground">{unit}</span>
                </div>
            </div>
            <span className="mt-2 font-medium text-sm text-foreground">{label}</span>
            <span className="text-xs text-muted-foreground">{Math.round((value / max) * 100)}% Goal</span>
        </div>
    );
}
