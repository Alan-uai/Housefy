"use client";

import { ShoppingCart, Check, Circle } from "lucide-react";

import type { InventoryItem } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

type ShoppingListProps = {
  items: InventoryItem[];
  onRestockItem: (itemId: string) => void;
};

export function ShoppingList({ items, onRestockItem }: ShoppingListProps) {
  const { toast } = useToast();

  const handleRestock = (item: InventoryItem) => {
    onRestockItem(item.id);
    toast({
      title: "Item Restocked!",
      description: `${item.name} has been updated in your inventory.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6" />
          Shopping List
        </CardTitle>
        <CardDescription>
          Items that are running low and need to be restocked.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          {items.length > 0 ? (
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50"
                >
                  <span className="font-medium">{item.name}</span>
                  <Button size="sm" variant="outline" onClick={() => handleRestock(item)}>
                    <Check className="mr-2 h-4 w-4" />
                    Restock
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <Circle className="mb-2 h-10 w-10" />
              <p className="font-medium">Your shopping list is empty.</p>
              <p className="text-sm">All your items are well-stocked!</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
