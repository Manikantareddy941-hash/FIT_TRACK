"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Play } from "lucide-react";

const workoutVideos = [
    {
        id: "1",
        title: "10 Min Morning Workout",
        channel: "FitnessBlender",
        thumbnail: "https://img.youtube.com/vi/gC_L9qAHVJ8/mqdefault.jpg",
        url: "https://www.youtube.com/watch?v=gC_L9qAHVJ8",
    },
    {
        id: "2",
        title: "Full Body HIIT Workout",
        channel: "Chloe Ting",
        thumbnail: "https://img.youtube.com/vi/ml6cT4AZdqI/mqdefault.jpg",
        url: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    },
    {
        id: "3",
        title: "Yoga for Beginners",
        channel: "Yoga With Adriene",
        thumbnail: "https://img.youtube.com/vi/v7AYKMP6rOE/mqdefault.jpg",
        url: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
    },
];

export function WorkoutVideos() {
    return (
        <Card className="col-span-1 lg:col-span-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-purple-600/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" style={{ color: '#7B5CFF' }} />
                    Workout Videos
                </CardTitle>
                <CardDescription>Get inspired with these exercise routines</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                    {workoutVideos.map((video) => (
                        <a
                            key={video.id}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden rounded-lg border border-border/50 hover:border-purple-500/50 transition-all"
                        >
                            <div className="relative aspect-video overflow-hidden bg-muted">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center">
                                        <Play className="h-6 w-6 text-white fill-white ml-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-card/50 backdrop-blur-sm">
                                <h3 className="font-semibold text-sm line-clamp-1">{video.title}</h3>
                                <p className="text-xs text-muted-foreground">{video.channel}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
