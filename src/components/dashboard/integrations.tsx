"use client"

import { Bot, Link } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

export function Integrations() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Link className="h-6 w-6" />
                    Smart Integrations
                </CardTitle>
                <CardDescription>
                    Connect with your favorite services and smart devices.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-2 text-center text-sm p-4 bg-muted/50 rounded-lg">
                    <Bot className="h-8 w-8 text-muted-foreground" />
                    <p className="font-medium">Coming Soon!</p>
                    <p className="text-muted-foreground">
                        Integrate with smart fridges, shopping apps, and more.
                    </p>
                </div>
                 <Button variant="outline" className="w-full" disabled>
                    Manage Integrations
                </Button>
            </CardContent>
        </Card>
    )
}
