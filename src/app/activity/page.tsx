"use client";

import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AddActivityDialog } from "@/components/forms/AddActivityDialog";

export default function ActivityPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Activity Log</h2>
                <AddActivityDialog />
            </div>
            <div className="grid gap-4">
                <RecentActivity />
            </div>
        </div>
    );
}
