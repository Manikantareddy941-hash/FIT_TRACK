"use client";

import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <ActivityChart />
                <Card>
                    <CardHeader>
                        <CardTitle>Total Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-8 text-muted-foreground">
                            More detailed analytics coming soon...
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
