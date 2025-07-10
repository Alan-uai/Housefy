"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";

import type { InventoryItem } from "@/lib/types";
import { initialInventory } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { AddItemDialog } from "@/components/dashboard/add-item-dialog";
import { InventorySection } from "@/components/dashboard/inventory-section";
import { ShoppingList } from "@/components/dashboard/shopping-list";
import { RecipeSuggester } from "@/components/dashboard/recipe-suggester";
import { Integrations } from "@/components/dashboard/integrations";

export default function Home() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [shoppingList, setShoppingList] = useState<InventoryItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const lowStockItems = inventory.filter(
      (item) => item.quantity <= item.minStock
    );
    setShoppingList(lowStockItems);
  }, [inventory]);

  const expiringSoonItems = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    return inventory.filter((item) => {
      if (!item.expiryDate) return false;
      const expiry = new Date(item.expiryDate);
      expiry.setHours(0, 0, 0, 0);
      return expiry >= today && expiry <= sevenDaysFromNow;
    });
  }, [inventory]);

  const handleAddItem = (item: Omit<InventoryItem, "id">) => {
    const newItem: InventoryItem = { ...item, id: crypto.randomUUID() };
    setInventory((prev) => [...prev, newItem]);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const handleDeleteItem = (itemId: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== itemId));
  };
  
  const handleRestockItem = (itemId: string) => {
    setInventory((prev) => prev.map((item) => {
      if (item.id === itemId) {
        // A simple restock logic, could be more complex (e.g. restock to a user-defined level)
        return { ...item, quantity: item.minStock * 2 + 5 };
      }
      return item;
    }));
  };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <PageHeader onVoiceCommand={() => setIsDialogOpen(true)} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>

          <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <InventorySection
                inventory={inventory}
                onUpdateQuantity={handleUpdateQuantity}
                onDeleteItem={handleDeleteItem}
              />
            </div>
            <div className="flex flex-col gap-4 md:gap-8">
              <ShoppingList items={shoppingList} onRestockItem={handleRestockItem} />
              <RecipeSuggester expiringItems={expiringSoonItems} />
              <Integrations />
            </div>
          </div>
        </main>
      </div>
      <AddItemDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddItem={handleAddItem}
      />
    </>
  );
}
