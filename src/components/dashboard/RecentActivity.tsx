"use client";

import { useFitnessStore } from "@/store/fitness-store";
import { motion } from "framer-motion";

export function RecentActivity() {
    const activities = useFitnessStore((state) => state.activities);

    return (
        <div className="p-8 rounded-[2.5rem] glass-4k border-white/5 shadow-premium flex flex-col h-full bg-gradient-to-br from-cyan-500/5 to-transparent relative overflow-hidden group">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-1">Session Logs</h4>
                        <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase">Historical Data</h3>
                    </div>
                </div>

                <div className="space-y-6">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center group/item"
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 ${activity.color} shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-transform group-hover/item:scale-110 duration-300`}>
                                <span className="text-xl">{activity.icon}</span>
                            </div>
                            <div className="ml-5 space-y-0.5 max-w-[150px]">
                                <p className="text-sm font-black italic uppercase tracking-tight text-white group-hover/item:text-cyan-400 transition-colors">{activity.title}</p>
                                <p className="text-[10px] font-bold text-muted-foreground/60 line-clamp-1 uppercase tracking-wider">
                                    {activity.description}
                                </p>
                            </div>
                            <div className="ml-auto text-right">
                                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-500/50">Completed</div>
                                <p className="text-[9px] font-bold text-muted-foreground/30 mt-0.5">
                                    {activity.time}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <button className="w-full mt-10 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:bg-white/10 hover:text-white/80 transition-all">
                    Expand Archive
                </button>
            </div>
        </div>
    );
}
