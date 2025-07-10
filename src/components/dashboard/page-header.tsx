"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/icons/logo";
import { Coins, Mic, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PageHeaderProps = {
  onVoiceCommand: () => void;
};

export function PageHeader({ onVoiceCommand }: PageHeaderProps) {
  const { toast } = useToast();

  const handleVoiceClick = () => {
    toast({
      title: "Voice Command",
      description: "Voice commands are coming soon! For now, you can add items manually.",
    });
    onVoiceCommand();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <a href="#" className="flex items-center gap-2 text-lg font-semibold text-primary md:text-base">
        <Logo className="h-8 w-8" />
        <span className="sr-only">DyxHomeShop</span>
      </a>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Coins className="h-5 w-5" />
            <span>1,250 Dyx</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleVoiceClick}>
            <Mic className="h-5 w-5" />
            <span className="sr-only">Use Voice Command</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png" alt="@user" data-ai-hint="user avatar" />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Marketplace</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
