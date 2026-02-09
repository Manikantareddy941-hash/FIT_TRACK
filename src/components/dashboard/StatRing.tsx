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
    const radius = 70;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (Math.min(value / max, 1)) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-8 glass-4k rounded-[2.5rem] border-white/5 shadow-premium relative group overflow-hidden">
            {/* Ambient Background Glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                style={{ backgroundColor: color }}
            />

            <div className="relative flex items-center justify-center mb-6">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="rotate-[-90deg] transition-all duration-500"
                >
                    <defs>
                        <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={color} stopOpacity="1" />
                            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
                        </linearGradient>
                    </defs>
                    <circle
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + " " + circumference}
                        style={{ strokeDashoffset: 0 }}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className="text-white/5"
                    />
                    <motion.circle
                        stroke={`url(#gradient-${label})`}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + " " + circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        style={{ filter: `drop-shadow(0 0 8px ${color}44)` }}
                    />
                </svg>
                <div className="absolute flex flex-col items-center text-center">
                    <div className="mb-2 transition-transform group-hover:scale-110 duration-300">
                        {icon}
                    </div>
                    <span className="text-3xl font-black italic tracking-tighter text-white">{value.toLocaleString()}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{unit}</span>
                </div>
            </div>

            <div className="text-center space-y-1 relative z-10">
                <span className="block font-black italic uppercase tracking-widest text-xs text-white/80">{label}</span>
                <div className="flex items-center justify-center gap-1.5">
                    <div className="h-1 w-1 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                        {Math.round((value / max) * 100)}% Protocol
                    </span>
                </div>
            </div>
        </div>
    );
}
