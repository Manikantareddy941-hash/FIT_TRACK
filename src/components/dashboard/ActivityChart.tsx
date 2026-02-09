"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { name: "Mon", steps: 4000, calories: 240 },
    { name: "Tue", steps: 3000, calories: 139 },
    { name: "Wed", steps: 2000, calories: 980 },
    { name: "Thu", steps: 2780, calories: 390 },
    { name: "Fri", steps: 1890, calories: 480 },
    { name: "Sat", steps: 2390, calories: 380 },
    { name: "Sun", steps: 3490, calories: 430 },
];

export function ActivityChart() {
    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Steps taken over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#1f2937", borderRadius: "10px", border: "none" }}
                            itemStyle={{ color: "#fff" }}
                            cursor={{ fill: "transparent" }}
                        />
                        <Bar
                            dataKey="steps"
                            fill="currentColor"
                            radius={[4, 4, 0, 0]}
                            className="fill-primary"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
