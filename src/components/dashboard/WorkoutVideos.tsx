"use client";

import { Play, Flame, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const workoutVideos = [
    {
        id: "1",
        title: "10 Min Morning Workout",
        channel: "FitnessBlender",
        thumbnail: "https://img.youtube.com/vi/gC_L9qAHVJ8/maxresdefault.jpg",
        url: "https://www.youtube.com/watch?v=gC_L9qAHVJ8",
        level: "Beginner"
    },
    {
        id: "2",
        title: "Full Body HIIT Workout",
        channel: "Chloe Ting",
        thumbnail: "https://img.youtube.com/vi/ml6cT4AZdqI/maxresdefault.jpg",
        url: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
        level: "Elite"
    },
    {
        id: "3",
        title: "Yoga for Beginners",
        channel: "Yoga With Adriene",
        thumbnail: "https://img.youtube.com/vi/v7AYKMP6rOE/maxresdefault.jpg",
        url: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
        level: "Intermediate"
    },
];

export function WorkoutVideos() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/50 mb-1">Visual Training</h4>
                    <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase">Bio-Guidance</h3>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {workoutVideos.map((video) => (
                    <motion.a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -10 }}
                        className="group relative flex flex-col glass-4k rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-2xl border-none"
                    >
                        <div className="relative aspect-video overflow-hidden">
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                            <div className="absolute top-4 left-4 flex gap-2">
                                <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white">{video.level}</span>
                                </div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                                <div className="h-16 w-16 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                                    <Play className="h-8 w-8 fill-current ml-1" />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-3">
                            <div>
                                <h3 className="font-black italic text-lg line-clamp-1 text-white tracking-tight group-hover:text-primary transition-colors uppercase">{video.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">{video.channel}</p>
                                    <div className="h-1 w-1 rounded-full bg-white/10" />
                                    <div className="flex items-center gap-1 text-yellow-500/50">
                                        <Trophy className="h-3 w-3" />
                                        <span className="text-[10px] font-black">4.9k Views</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                <div className="h-1 rounded-full bg-white/10 flex-1 overflow-hidden">
                                    <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-1000" />
                                </div>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );
}
