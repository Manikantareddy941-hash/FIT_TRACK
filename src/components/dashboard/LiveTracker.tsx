"use client";

import { useEffect, useRef, useState } from "react";
import { useFitnessStore } from "@/store/fitness-store";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Zap, Activity, StopCircle, Play, ChevronUp, ChevronDown, Flame, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LiveTracker() {
    const activeSession = useFitnessStore((state) => state.activeSession);
    const startActiveSession = useFitnessStore((state) => state.startActiveSession);
    const updateActiveLocation = useFitnessStore((state) => state.updateActiveLocation);
    const finishActiveSession = useFitnessStore((state) => state.finishActiveSession);
    const userProfile = useFitnessStore((state) => state.userProfile);

    const [isExpanded, setIsExpanded] = useState(false);
    const [gpsError, setGpsError] = useState<string | null>(null);
    const watchId = useRef<number | null>(null);

    const handleToggle = () => {
        setGpsError(null);
        if (!activeSession.isActive) {
            if ("geolocation" in navigator) {
                startActiveSession();
                const id = navigator.geolocation.watchPosition(
                    (pos) => {
                        updateActiveLocation(
                            pos.coords.latitude,
                            pos.coords.longitude,
                            pos.coords.accuracy
                        );
                    },
                    (err) => {
                        console.error("GPS Error:", err);
                        let msg = "GPS Signal Lost";
                        if (err.code === 1) msg = "Location Access Denied";
                        if (err.code === 3) msg = "GPS Timeout";
                        setGpsError(msg);

                        // Stop tracking on fatal errors
                        if (err.code === 1) {
                            if (watchId.current !== null) {
                                navigator.geolocation.clearWatch(watchId.current);
                                watchId.current = null;
                            }
                            finishActiveSession();
                        }
                    },
                    { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
                );
                watchId.current = id;
            } else {
                setGpsError("Not Supported");
            }
        } else {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current);
                watchId.current = null;
            }
            finishActiveSession();
        }
    };

    useEffect(() => {
        return () => {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current);
            }
        };
    }, []);

    // Format distance
    const dist = activeSession.distance < 1000
        ? `${Math.round(activeSession.distance)}m`
        : `${(activeSession.distance / 1000).toFixed(2)}km`;

    return (
        <motion.div
            initial={false}
            animate={{
                height: isExpanded ? "auto" : "80px",
                width: isExpanded ? "400px" : "280px",
                scale: activeSession.isActive ? 1.02 : 1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-10 right-10 glass-4k rounded-[2.5rem] border-none shadow-premium overflow-hidden z-50 group transition-all duration-500 ${activeSession.isActive ? "ring-2 ring-primary/20 shadow-2xl" : ""
                }`}
        >
            <div className="p-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-500 ${activeSession.isActive
                        ? "bg-gradient-to-tr from-primary to-accent shadow-lg shadow-primary/20 rotate-[360deg]"
                        : "bg-black/5"
                        }`}>
                        {activeSession.isActive ? (
                            <Activity className="h-5 w-5 text-white animate-pulse" />
                        ) : (
                            <MapPin className="h-5 w-5 text-foreground/40" />
                        )}
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Real-Time Core</h4>
                        <p className={`text-xs font-black italic uppercase transition-colors ${gpsError ? 'text-red-500' : 'text-foreground'}`}>
                            {gpsError || (activeSession.isActive ? "Active Protocol" : "Standby Mode")}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`h-8 w-8 rounded-full hover:bg-black/5 flex items-center justify-center transition-all ${isExpanded ? "text-foreground" : "text-foreground/40"
                            }`}
                    >
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                    </button>
                    <button
                        onClick={handleToggle}
                        className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${activeSession.isActive
                            ? "bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30"
                            : "bg-primary text-white hover:scale-105 shadow-xl shadow-primary/20"
                            }`}
                    >
                        {activeSession.isActive ? <StopCircle className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5 fill-current" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="p-8 pt-2 space-y-8 relative z-10"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <LiveMetric
                                label="Distance"
                                value={dist}
                                icon={<Navigation className="h-3 w-3" />}
                                color="text-accent"
                                isActive={activeSession.isActive}
                            />
                            <LiveMetric
                                label="Pace"
                                value={`${(activeSession.currentVelocity * 3.6).toFixed(1)} km/h`}
                                icon={<Zap className="h-3 w-3" />}
                                color="text-primary"
                                isActive={activeSession.isActive}
                            />
                            <LiveMetric
                                label="Energy"
                                value={`${activeSession.burnedCalories} kcal`}
                                icon={<Flame className="h-3 w-3" />}
                                color="text-destructive"
                                isActive={activeSession.isActive}
                            />
                            <LiveMetric
                                label="Steps"
                                value={activeSession.estimatedSteps}
                                icon={<Footprints className="h-3 w-3" />}
                                color="text-accent"
                                isActive={activeSession.isActive}
                            />
                        </div>

                        {activeSession.isActive && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-3"
                            >
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary leading-none">
                                    Protocol Active • Biological Data Streaming
                                </span>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div >
    );
}

function LiveMetric({ label, value, icon, color, isActive }: { label: string; value: string | number; icon: React.ReactNode; color: string; isActive: boolean }) {
    return (
        <div className="p-4 rounded-3xl glass-4k space-y-2 group/metric transition-all">
            <div className="flex items-center gap-2">
                <div className={`${color} opacity-60 group-hover/metric:opacity-100 transition-opacity`}>{icon}</div>
                <span className="text-[8px] font-black uppercase tracking-widest text-foreground/30">{label}</span>
            </div>
            <motion.p
                key={String(value)}
                initial={isActive ? { scale: 1.1, opacity: 0.8 } : {}}
                animate={{ scale: 1, opacity: 1 }}
                className="text-xl font-black italic tracking-tighter text-foreground uppercase"
            >
                {value}
            </motion.p>
        </div>
    );
}
