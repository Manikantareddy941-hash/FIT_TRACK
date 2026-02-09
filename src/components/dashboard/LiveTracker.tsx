"use client";

import { useEffect, useRef, useState } from "react";
import { useFitnessStore } from "@/store/fitness-store";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Zap, Activity, StopCircle, Play, ChevronUp, ChevronDown } from "lucide-react";
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
                width: isExpanded ? "400px" : "280px"
            }}
            className="fixed bottom-10 right-10 glass-4k rounded-[2.5rem] border-white/5 shadow-premium overflow-hidden z-50 group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 pointer-events-none" />

            <div className="p-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${activeSession.isActive ? "bg-lime-500 shadow-[0_0_20px_rgba(163,255,18,0.4)]" : "bg-white/5"
                        }`}>
                        {activeSession.isActive ? (
                            <Navigation className="h-5 w-5 text-black animate-pulse" />
                        ) : (
                            <MapPin className="h-5 w-5 text-white/40" />
                        )}
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Real-Time Core</h4>
                        <p className={`text-xs font-black italic uppercase transition-colors ${gpsError ? 'text-red-500' : 'text-white'}`}>
                            {gpsError || (activeSession.isActive ? "Active Protocol" : "Tracking Standby")}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="h-8 w-8 rounded-full hover:bg-white/5 flex items-center justify-center text-white/40 transition-colors"
                    >
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                    </button>
                    <button
                        onClick={handleToggle}
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${activeSession.isActive
                            ? "bg-red-500/20 text-red-500 border border-red-500/20 hover:bg-red-500/30"
                            : "bg-purple-500 text-black hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
                            }`}
                    >
                        {activeSession.isActive ? <StopCircle className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="p-8 pt-2 space-y-8 relative z-10"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <LiveMetric label="Distance" value={dist} icon={<Navigation className="h-3 w-3" />} color="text-cyan-400" />
                            <LiveMetric label="Velocity" value={`${(activeSession.currentVelocity * 3.6).toFixed(1)} km/h`} icon={<Activity className="h-3 w-3" />} color="text-purple-400" />
                            <LiveMetric label="Calories" value={activeSession.burnedCalories} icon={<Zap className="h-3 w-3" />} color="text-yellow-400" />
                            <LiveMetric label="Est. Steps" value={activeSession.estimatedSteps} icon={<Activity className="h-3 w-3" />} color="text-lime-400" />
                        </div>

                        {activeSession.isActive && (
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 leading-none">
                                    GPS Locked • High Accuracy Mode Enabled
                                </span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function LiveMetric({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) {
    return (
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="flex items-center gap-2">
                <div className={`${color} opacity-60`}>{icon}</div>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/30">{label}</span>
            </div>
            <p className="text-xl font-black italic tracking-tighter text-white uppercase">{value}</p>
        </div>
    );
}
