"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { motion } from "framer-motion";

const data = [
    { name: "MON", steps: 4000, color: "#7B5CFF" },
    { name: "TUE", steps: 3000, color: "#00E5FF" },
    { name: "WED", steps: 2000, color: "#A3FF12" },
    { name: "THU", steps: 2780, color: "#F59E0B" },
    { name: "FRI", steps: 6890, color: "#EF4444" },
    { name: "SAT", steps: 2390, color: "#7B5CFF" },
    { name: "SUN", steps: 3490, color: "#00E5FF" },
];

export function ActivityChart() {
    return (
        <div className="p-8 rounded-[2.5rem] glass-4k border-white/5 shadow-premium col-span-1 lg:col-span-2 relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-1">Activity Analytics</h4>
                        <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase">Weekly Momentum</h3>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Live Feed</span>
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                {data.map((entry, index) => (
                                    <linearGradient key={`grad-${index}`} id={`barGrad-${index}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                                        <stop offset="100%" stopColor={entry.color} stopOpacity={0.1} />
                                    </linearGradient>
                                ))}
                            </defs>
                            <XAxis
                                dataKey="name"
                                stroke="rgba(255,255,255,0.1)"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: 'rgba(255,255,255,0.3)', fontWeight: 900 }}
                                dy={10}
                            />
                            <YAxis
                                hide
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="glass-4k border-white/10 p-3 rounded-xl shadow-2xl">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{payload[0].payload.name}</p>
                                                <p className="text-lg font-black italic text-white">{payload[0].value?.toLocaleString()} <span className="text-[10px] not-italic text-muted-foreground">STEPS</span></p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar
                                dataKey="steps"
                                radius={[6, 6, 2, 2]}
                                barSize={32}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`url(#barGrad-${index})`} className="transition-all duration-500 hover:opacity-100 opacity-80" />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Peak Intensity</p>
                        <p className="text-sm font-black italic text-red-500">6,890 <span className="text-[8px] not-italic">Steps</span></p>
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Avg Velocity</p>
                        <p className="text-sm font-black italic text-cyan-400">3,420 <span className="text-[8px] not-italic">Steps</span></p>
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Total Output</p>
                        <p className="text-sm font-black italic text-lime-400">24.5k <span className="text-[8px] not-italic">Steps</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
