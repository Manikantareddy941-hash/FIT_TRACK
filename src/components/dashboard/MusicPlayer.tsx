"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Play,
    Pause,
    SkipForward,
    Music2,
    Volume2,
    Zap,
    Focus as FocusIcon,
    Moon,
    Waves
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PlaylistMode = 'Focus' | 'Hype' | 'Chill';

const playlists: Record<PlaylistMode, { src: string; color: string; icon: any; label: string }> = {
    'Hype': {
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        color: '#A3FF12',
        icon: Zap,
        label: 'Adrenaline High'
    },
    'Focus': {
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        color: '#00E5FF',
        icon: FocusIcon,
        label: 'Neural Sync'
    },
    'Chill': {
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        color: '#7B5CFF',
        icon: Moon,
        label: 'Deep Recovery'
    }
};

export function MusicPlayer({ autoStart = false }: { autoStart?: boolean }) {
    const [mode, setMode] = useState<PlaylistMode>('Hype');
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (autoStart) {
            setIsPlaying(true);
        }
    }, [autoStart]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = playlists[mode].src;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play blocked", e));
            }
        }
    }, [mode]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play blocked", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    return (
        <div className="p-6 rounded-[2.5rem] glass-4k border-white/5 relative overflow-hidden group shadow-premium">
            <audio ref={audioRef} loop />

            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center relative group/icon">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-400/20 opacity-0 group-hover/icon:opacity-100 transition-opacity" />
                        <Music2 className="h-6 w-6 text-purple-400 relative animate-pulse" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black italic uppercase tracking-widest text-white leading-none mb-1">{playlists[mode].label}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">{mode} Interface Online</p>
                    </div>
                </div>
                <div className="flex gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                    {(Object.keys(playlists) as PlaylistMode[]).map((p) => {
                        const Icon = playlists[p].icon;
                        const active = mode === p;
                        return (
                            <Button
                                key={p}
                                size="icon"
                                variant="ghost"
                                className={`h-8 w-8 rounded-lg transition-all ${active ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                onClick={() => setMode(p)}
                            >
                                <Icon className="h-4 w-4" style={{ color: active ? playlists[p].color : 'rgba(255,255,255,0.2)' }} />
                            </Button>
                        );
                    })}
                </div>
            </div>

            <div className="relative z-10 flex items-center gap-6">
                <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-16 w-16 rounded-full gradient-purple-cyan neon-glow hover:scale-110 transition-transform shadow-2xl shrink-0"
                >
                    {isPlaying ? <Pause className="h-7 w-7 fill-current" /> : <Play className="h-7 w-7 fill-current ml-1" />}
                </Button>

                <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-end mb-1">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Bitrate Sync</span>
                            <div className="flex gap-0.5 h-4 items-end">
                                {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((i, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="w-1.5 rounded-full"
                                        animate={{ height: isPlaying ? [10, 24, 14, 20, 8][idx % 5] : 4 }}
                                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: idx * 0.1 }}
                                        style={{ backgroundColor: playlists[mode].color }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black italic text-white/40 tracking-tighter uppercase">{isPlaying ? 'Transmitting' : 'Idle'}</span>
                        </div>
                    </div>

                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-lime-400"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                width: isPlaying ? '100%' : '0%'
                            }}
                            transition={{
                                backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
                                width: { duration: isPlaying ? 180 : 0, ease: "linear" }
                            }}
                            style={{ backgroundSize: '200% auto' }}
                        />
                    </div>
                </div>

                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all group/skip">
                    <SkipForward className="h-6 w-6 text-muted-foreground group-hover/skip:text-white transition-colors" />
                </Button>
            </div>
        </div>
    );
}
