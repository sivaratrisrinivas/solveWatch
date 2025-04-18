import type { Metadata } from "next"
import SettingsForm from "@/components/settings-form"

export const metadata: Metadata = {
    title: "Settings - SolveWatch",
    description: "Configure dashboard settings",
}

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <SettingsForm />
        </div>
    )
}
