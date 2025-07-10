"use client";

import {
  Apple,
  Carrot,
  Milk,
  Beef,
  Warehouse,
  Snowflake,
  CupSoda,
  Cookie,
  HelpCircle,
  Plus,
  Minus,
  Trash2,
  AlertTriangle,
  Flame,
} from "lucide-react";
import type { HTMLAttributes } from "react";
import { differenceInDays } from "date-fns";
import type { InventoryItem, ItemCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type ItemCardProps = HTMLAttributes<HTMLDivElement> & {
  item: InventoryItem;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onDeleteItem: (itemId: string) => void;
};

const categoryIcons: Record<ItemCategory, React.ReactNode> = {
  Fruit: <Apple className="h-4 w-4" />,
  Vegetable: <Carrot className="h-4 w-4" />,
  Dairy: <Milk className="h-4 w-4" />,
  Meat: <Beef className="h-4 w-4" />,
  Pantry: <Warehouse className="h-4 w-4" />,
  Frozen: <Snowflake className="h-4 w-4" />,
  Beverage: <CupSoda className="h-4 w-4" />,
  Snack: <Cookie className="h-4 w-4" />,
  Other: <HelpCircle className="h-4 w-4" />,
};

function ExpiryBadge({ expiryDate }: { expiryDate?: string }) {
  if (!expiryDate) return null;

  const daysUntilExpiry = differenceInDays(new Date(expiryDate), new Date());
  
  if (daysUntilExpiry < 0) {
    return (
      <Badge variant="destructive" className="gap-1">
        <Flame className="h-3 w-3" /> Expired
      </Badge>
    );
  }
  if (daysUntilExpiry <= 3) {
    return (
      <Badge variant="destructive" className="gap-1 bg-orange-500 hover:bg-orange-600">
        <AlertTriangle className="h-3 w-3" /> Expires in {daysUntilExpiry + 1}d
      </Badge>
    );
  }
  if (daysUntilExpiry <= 7) {
    return (
      <Badge variant="secondary" className="gap-1 text-orange-600 dark:text-orange-400">
        Expires in {daysUntilExpiry + 1}d
      </Badge>
    );
  }

  return <Badge variant="outline">Expires {new Date(expiryDate).toLocaleDateString()}</Badge>;
}

export function ItemCard({
  item,
  onUpdateQuantity,
  onDeleteItem,
  className,
  ...props
}: ItemCardProps) {
  const stockProgress = (item.quantity / (item.minStock * 2)) * 100;
  const isLowStock = item.quantity <= item.minStock;

  return (
    <Card
      className={cn("flex flex-col animate-in fade-in-0 zoom-in-95", className)}
      {...props}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1.5 whitespace-nowrap">
            {categoryIcons[item.category]}
            {item.category}
          </Badge>
        </div>
        <CardDescription>
          Quantity: {item.quantity}
          {isLowStock && <span className="text-destructive font-medium ml-2">(Low Stock)</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <Progress value={stockProgress} aria-label={`${stockProgress}% stock level`} />
          <div className="text-xs text-muted-foreground mt-1">
            Min stock: {item.minStock}
          </div>
        </div>
        <div>
          <ExpiryBadge expiryDate={item.expiryDate} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={() => onDeleteItem(item.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
