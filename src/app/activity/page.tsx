"use client";

import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AddActivityDialog } from "@/components/forms/AddActivityDialog";
import { motion } from "framer-motion";
import { History, Sparkles } from "lucide-react";

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

export default function ActivityPage() {
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
                        <History className="h-5 w-5 text-cyan-400" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/60">Biological Archives</h4>
                    </div>
                    <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-white">
                        Activity <span className="text-cyan-500">Registry</span>
                    </h2>
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em]">Historical session data & achievement logs</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">32 Total Sessions</span>
                    </div>
                    <AddActivityDialog />
                </div>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-1 gap-10">
                <div className="glass-4k rounded-[3rem] border-white/5 shadow-premium overflow-hidden">
                    <RecentActivity />
                </div>
            </motion.div>
        </motion.div>
    );
}
