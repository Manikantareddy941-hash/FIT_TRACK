"use client";

import { useFitnessStore } from "@/store/fitness-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { Palette, Sparkles } from "lucide-react";

const accentColors = [
    { name: 'Cobalt', value: 'var(--primary)' },
    { name: 'Azure', value: 'var(--accent)' },
    { name: 'Sapphire', value: 'oklch(0.65 0.12 300)' },
    { name: 'Amber', value: 'oklch(0.75 0.15 40)' },
    { name: 'Crimson', value: 'var(--destructive)' }
];

export function ThemeCustomizer() {
    const userProfile = useFitnessStore((state) => state.userProfile);
    const setThemeSettings = useFitnessStore((state) => state.setThemeSettings);

    const [accent, setAccent] = useState(userProfile?.themeSettings?.accentColor || 'var(--primary)');
    const [intensity, setIntensity] = useState(userProfile?.themeSettings?.glowIntensity || 0.5);

    useEffect(() => {
        document.documentElement.style.setProperty('--primary-glow', accent);
        document.documentElement.style.setProperty('--glow-opacity', intensity.toString());
    }, [accent, intensity]);

    const handleSave = () => {
        setThemeSettings({ accentColor: accent, glowIntensity: intensity });
    };

    return (
        <div className="p-8 rounded-[2.5rem] glass-4k border-none space-y-8 shadow-2xl relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div
                className="absolute inset-0 opacity-5 transition-colors duration-1000"
                style={{ backgroundColor: accent }}
            />

            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center">
                        <Palette className="h-5 w-5" style={{ color: accent }} />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Core Interface</h4>
                        <h3 className="text-lg font-black italic tracking-tighter text-foreground uppercase">Aesthetics</h3>
                    </div>
                </div>
            </div>

            <div className="relative z-10 space-y-8">
                <div>
                    <Label className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/40 mb-4 block">Biological Accent</Label>
                    <div className="flex flex-wrap gap-4">
                        {accentColors.map((c) => (
                            <button
                                key={c.value}
                                onClick={() => setAccent(c.value)}
                                className={`h-10 w-10 rounded-2xl border-2 transition-all duration-300 relative group/btn ${accent === c.value ? 'border-foreground scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'
                                    }`}
                                style={{ backgroundColor: c.value }}
                            >
                                {accent === c.value && (
                                    <Sparkles className="h-3 w-3 absolute -top-1.5 -right-1.5 text-foreground animate-pulse" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <Label className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/40">Glow Saturation</Label>
                        <span className="text-xl font-black italic text-foreground leading-none">
                            {Math.round(intensity * 100)}<span className="text-[10px] not-italic ml-0.5" style={{ color: accent }}>%</span>
                        </span>
                    </div>
                    <Slider
                        value={[intensity * 100]}
                        onValueChange={(v: number[]) => setIntensity(v[0] / 100)}
                        max={100}
                        step={1}
                        className="py-4"
                    />
                </div>
            </div>

            <Button
                onClick={handleSave}
                className="relative z-10 w-full h-14 rounded-2xl font-black italic uppercase tracking-[0.2em] text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                style={{
                    backgroundColor: accent,
                    color: '#000',
                    boxShadow: `0 10px 40px -10px ${accent}66`
                }}
            >
                Commit Changes
            </Button>
        </div>
    );
}
