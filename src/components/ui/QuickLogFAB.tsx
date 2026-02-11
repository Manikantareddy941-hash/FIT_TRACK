"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Droplets, Scale, Zap, X } from "lucide-react";
import { useState } from "react";
import { useFitnessStore } from "@/store/fitness-store";
import { AddActivityDialog } from "@/components/forms/AddActivityDialog";

export function QuickLogFAB() {
    const [isOpen, setIsOpen] = useState(false);
    const addWater = useFitnessStore((state) => state.addWater);

    const toggle = () => setIsOpen(!isOpen);

    const actions = [
        {
            label: "Log Activity",
            icon: Zap,
            color: "bg-primary shadow-primary/20",
            onClick: () => {
                setIsOpen(false);
            },
            component: <AddActivityDialog trigger={
                <button className="flex items-center gap-3 group">
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground opacity-0 group-hover:opacity-100 transition-opacity">Activity</span>
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                </button>
            } />
        },
        {
            label: "Add Water",
            icon: Droplets,
            color: "bg-accent shadow-accent/20",
            onClick: () => {
                addWater();
                setIsOpen(false);
            }
        },
        {
            label: "Log Weight",
            icon: Scale,
            color: "bg-secondary shadow-secondary/20",
            onClick: () => {
                setIsOpen(false);
            }
        },
    ];

    return (
        <div className="fixed bottom-32 right-8 z-[110] flex flex-col items-end gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="flex flex-col items-end gap-3 mb-2"
                    >
                        {actions.map((action, index) => (
                            <motion.div
                                key={action.label}
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {action.component ? action.component : (
                                    <button
                                        onClick={action.onClick}
                                        className="flex items-center gap-3 group pointer-events-auto"
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                            {action.label}
                                        </span>
                                        <div className={`h-12 w-12 rounded-full ${action.color} flex items-center justify-center shadow-lg active:scale-95 transition-transform`}>
                                            <action.icon className="h-5 w-5 text-white" />
                                        </div>
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={toggle}
                className={`h-16 w-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 active:scale-90 pointer-events-auto ${isOpen ? "bg-black text-white rotate-[135deg]" : "bg-gradient-to-tr from-primary to-accent text-white"
                    }`}
            >
                {isOpen ? <X className="h-8 w-8" /> : <Plus className="h-8 w-8" />}
            </button>
        </div>
    );
}
