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

interface Track {
    src: string;
    label: string;
}

const playlists: Record<PlaylistMode, { tracks: Track[]; color: string; icon: any }> = {
    'Hype': {
        tracks: [
            { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', label: 'Adrenaline High' },
            { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', label: 'Overdrive' },
            { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', label: 'Power Surge' }
        ],
        color: 'var(--primary)',
        icon: Zap,
    },
    'Focus': {
        tracks: [
            { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', label: 'Neural Sync' },
            { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', label: 'Deep State' },
            { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', label: 'Alpha Waves' }
        ],
        color: 'var(--accent)',
        icon: FocusIcon,
    },
    'Chill': {
        tracks: [
            { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', label: 'Deep Recovery' },
            { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', label: 'Oceanic Drift' },
            { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', label: 'Lunar Soft' }
        ],
        color: 'oklch(0.65 0.12 300)',
        icon: Moon,
    }
};

export function MusicPlayer({ autoStart = false }: { autoStart?: boolean }) {
    const [mode, setMode] = useState<PlaylistMode>('Hype');
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentTrack = playlists[mode].tracks[trackIndex];

    const handleSkip = () => {
        const nextIndex = (trackIndex + 1) % playlists[mode].tracks.length;
        setTrackIndex(nextIndex);
    };

    useEffect(() => {
        if (autoStart) {
            setIsPlaying(true);
        }
    }, [autoStart]);

    useEffect(() => {
        setTrackIndex(0);
    }, [mode]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = currentTrack.src;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play blocked", e));
            }
        }
    }, [currentTrack, isPlaying]);

    return (
        <div className="p-8 rounded-[2.5rem] glass-4k relative overflow-hidden group shadow-2xl border-none">
            <audio ref={audioRef} loop />

            <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center relative group/icon">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 opacity-0 group-hover/icon:opacity-100 transition-opacity" />
                        <Music2 className="h-6 w-6 text-primary relative animate-pulse" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black italic uppercase tracking-widest text-foreground leading-none mb-1">{currentTrack.label}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">{mode} Interface Online</p>
                    </div>
                </div>
                <div className="flex gap-1 glass-4k p-1 rounded-xl shadow-none border-white/5 scale-90">
                    {(Object.keys(playlists) as PlaylistMode[]).map((p) => {
                        const Icon = playlists[p].icon;
                        const active = mode === p;
                        return (
                            <Button
                                key={p}
                                size="icon"
                                variant="ghost"
                                className={`h-8 w-8 rounded-lg transition-all ${active ? 'bg-black/10' : 'hover:bg-black/5'}`}
                                onClick={() => setMode(p)}
                            >
                                <Icon className="h-4 w-4" style={{ color: active ? playlists[p].color : 'rgba(0,0,0,0.2)' }} />
                            </Button>
                        );
                    })}
                </div>
            </div>

            <div className="relative z-10 flex items-center gap-6">
                <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-16 w-16 rounded-full gradient-primary neon-glow hover:scale-110 transition-transform shadow-2xl shrink-0"
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
                            <span className="text-[10px] font-black italic text-foreground/40 tracking-tighter uppercase">{isPlaying ? 'Transmitting' : 'Idle'}</span>
                        </div>
                    </div>

                    <div className="h-1.5 w-full glass-4k rounded-full overflow-hidden shadow-none">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary via-accent to-primary"
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

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSkip}
                    className="h-12 w-12 rounded-2xl border border-transparent hover:border-black/5 hover:bg-black/5 transition-all group/skip"
                >
                    <SkipForward className="h-6 w-6 text-muted-foreground group-hover/skip:text-foreground transition-colors" />
                </Button>
            </div>
        </div>
    );
}
