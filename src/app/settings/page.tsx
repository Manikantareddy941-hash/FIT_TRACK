"use client";

import { useFitnessStore } from "@/store/fitness-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    User,
    Settings as SettingsIcon,
    Shield,
    Bell,
    Smartphone,
    Trash2,
    Download,
    Globe,
    Scale
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
    const { userProfile, setUserProfile, toggleUnits, resetData } = useFitnessStore();

    if (!userProfile) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <header className="space-y-2">
                <h1 className="text-5xl font-black italic uppercase tracking-tighter bg-gradient-to-r from-purple-500 via-cyan-400 to-lime-400 bg-clip-text text-transparent">
                    Parameters
                </h1>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">System configuration & Bio-data</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation Sidebar (Mock) */}
                <div className="space-y-1">
                    {['Account', 'Security', 'Notifications', 'Devices', 'Data'].map((item, i) => (
                        <Button
                            key={item}
                            variant="ghost"
                            className={`w-full justify-start rounded-xl font-bold uppercase tracking-widest text-[10px] h-12 ${i === 0 ? 'bg-white/5 text-purple-400 border border-white/5' : 'text-muted-foreground'
                                }`}
                        >
                            {item}
                        </Button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    {/* Bio-Data Section */}
                    <Card className="glass-4k shadow-premium rounded-[2rem] border-white/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl font-black italic uppercase">
                                <User className="h-5 w-5 text-purple-500" />
                                Bio-Data
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Current Weight ({userProfile.units === 'metric' ? 'kg' : 'lbs'})</Label>
                                    <Input
                                        type="number"
                                        value={userProfile.weight}
                                        onChange={(e) => setUserProfile({ ...userProfile, weight: Number(e.target.value) })}
                                        className="h-14 rounded-2xl bg-white/5 border-white/10 font-bold focus:ring-purple-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Current Stature ({userProfile.units === 'metric' ? 'cm' : 'in'})</Label>
                                    <Input
                                        type="number"
                                        value={userProfile.height}
                                        onChange={(e) => setUserProfile({ ...userProfile, height: Number(e.target.value) })}
                                        className="h-14 rounded-2xl bg-white/5 border-white/10 font-bold focus:ring-purple-500/20"
                                    />
                                </div>
                            </div>
                            <Button className="w-full h-14 rounded-2xl gradient-purple-cyan font-black italic uppercase tracking-wider">Sync Changes</Button>
                        </CardContent>
                    </Card>

                    {/* Preferences Section */}
                    <Card className="glass-4k shadow-premium rounded-[2rem] border-white/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl font-black italic uppercase">
                                <Globe className="h-5 w-5 text-cyan-400" />
                                Localization
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Scale className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-tight">Measurement System</p>
                                        <p className="text-[10px] text-muted-foreground font-medium uppercase">{userProfile.units === 'metric' ? 'Metric (kg, cm)' : 'Imperial (lbs, in)'}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={toggleUnits} className="rounded-xl border-white/10 font-bold h-10 px-4 text-[10px] uppercase">
                                    Switch to {userProfile.units === 'metric' ? 'Imperial' : 'Metric'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Control Section */}
                    <Card className="glass-4k shadow-premium rounded-[2rem] border-white/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl font-black italic uppercase text-red-500">
                                <Trash2 className="h-5 w-5" />
                                Critical Zone
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="h-14 rounded-2xl border-white/10 font-bold uppercase tracking-widest text-[10px] justify-between group">
                                    <span>Export All Personal Data</span>
                                    <Download className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        if (confirm("This will permanently clear all your progress. Proceed?")) resetData();
                                    }}
                                    className="h-14 rounded-2xl font-black italic uppercase tracking-wider"
                                >
                                    Purge Data Core
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
