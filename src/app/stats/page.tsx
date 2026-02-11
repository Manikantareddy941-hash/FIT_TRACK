"use client";

import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, Zap, Activity } from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function StatsPage() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[1400px] mx-auto space-y-12 pb-24"
        >
            <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Bio-Metric Engine</h4>
                    </div>
                    <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-white">
                        Performance <span className="text-primary">Analytics</span>
                    </h2>
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em]">Deep-dive performance tracking & predictive patterns</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center gap-3">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">+12% Velocity This Week</span>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <motion.div variants={item} className="lg:col-span-8">
                    <ActivityChart />
                </motion.div>

                <motion.div variants={item} className="lg:col-span-4 space-y-8">
                    <div className="glass-4k rounded-[2.5rem] p-8 border-white/5 shadow-premium space-y-6">
                        <div className="flex items-center gap-3">
                            <Target className="h-5 w-5 text-accent" />
                            <h3 className="font-black italic uppercase text-lg text-white">Phase Progress</h3>
                        </div>
                        <div className="space-y-4">
                            <AnalyticsBar label="Strength Index" value={78} color="bg-primary" />
                            <AnalyticsBar label="Cardio Capacity" value={62} color="bg-accent" />
                            <AnalyticsBar label="Metabolic Rate" value={45} color="bg-accent/60" />
                        </div>
                    </div>

                    <div className="glass-4k rounded-[2.5rem] p-8 border-white/5 shadow-premium bg-gradient-to-br from-primary/10 to-transparent">
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="h-5 w-5 text-yellow-500" />
                            <h3 className="font-black italic uppercase text-lg text-white">Insights</h3>
                        </div>
                        <p className="text-sm font-bold text-muted-foreground italic leading-relaxed uppercase tracking-tighter">
                            "Your high-intensity threshold is peaking on Wednesday sessions. Protocol suggests increasing resistance by 5% in next cycle."
                        </p>
                    </div>
                </motion.div>
            </div>

            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <MetricCard label="Total Energy Expended" value="24,520" unit="KCAL" icon={<Activity className="h-5 w-5 text-destructive" />} />
                <MetricCard label="Average Heart Rate" value="142" unit="BPM" icon={<TrendingUp className="h-5 w-5 text-accent" />} />
                <MetricCard label="Peak Session Time" value="72" unit="MIN" icon={<Zap className="h-5 w-5 text-primary" />} />
            </motion.div>
        </motion.div>
    );
}

function AnalyticsBar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-white/40">{label}</span>
                <span className="text-white">{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    );
}

function MetricCard({ label, value, unit, icon }: { label: string; value: string; unit: string; icon: React.ReactNode }) {
    return (
        <div className="glass-4k rounded-[2.5rem] p-8 border-white/5 shadow-premium flex flex-col items-center text-center group hover:bg-white/5 transition-all">
            <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">{label}</p>
            <h3 className="text-4xl font-black italic tracking-tighter text-white uppercase">
                {value}<span className="text-sm not-italic ml-1 opacity-20">{unit}</span>
            </h3>
        </div>
    );
}
