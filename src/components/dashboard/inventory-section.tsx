"use client";

import { useMemo } from 'react';
import type { InventoryItem, ItemLocation } from "@/lib/types";
import { ItemCard } from "./item-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Refrigerator, Warehouse, Snowflake } from 'lucide-react';

type InventorySectionProps = {
  inventory: InventoryItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onDeleteItem: (itemId: string) => void;
};

const locations: ItemLocation[] = ['Fridge', 'Pantry', 'Freezer'];
const locationIcons = {
  'Fridge': <Refrigerator className="mr-2 h-4 w-4" />,
  'Pantry': <Warehouse className="mr-2 h-4 w-4" />,
  'Freezer': <Snowflake className="mr-2 h-4 w-4" />,
};

export function InventorySection({
  inventory,
  onUpdateQuantity,
  onDeleteItem,
}: InventorySectionProps) {

  const itemsByLocation = useMemo(() => {
    return inventory.reduce((acc, item) => {
      (acc[item.location] = acc[item.location] || []).push(item);
      return acc;
    }, {} as Record<ItemLocation, InventoryItem[]>);
  }, [inventory]);

  return (
    <Tabs defaultValue="Fridge" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {locations.map(loc => (
          <TabsTrigger key={loc} value={loc}>
            {locationIcons[loc]} {loc}
          </TabsTrigger>
        ))}
      </TabsList>
      {locations.map(loc => (
        <TabsContent key={loc} value={loc}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(itemsByLocation[loc] || []).map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onDeleteItem={onDeleteItem}
                style={{ animationDelay: `${index * 50}ms` }}
              />
            ))}
             {(itemsByLocation[loc] || []).length === 0 && (
                <div className="col-span-full mt-8 flex flex-col items-center justify-center text-center text-muted-foreground">
                    <p className="text-lg font-medium">This space is empty.</p>
                    <p>Add an item to get started!</p>
                </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
