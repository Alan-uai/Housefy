"use client";

import { useState } from "react";
import { ChefHat, Lightbulb, UtensilsCrossed } from "lucide-react";
import { suggestRecipes, type SuggestRecipesOutput } from "@/ai/flows/suggest-recipes";
import type { InventoryItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

type RecipeSuggesterProps = {
  expiringItems: InventoryItem[];
};

export function RecipeSuggester({ expiringItems }: RecipeSuggesterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestRecipesOutput | null>(null);
  const { toast } = useToast();

  const handleSuggestRecipes = async () => {
    setIsLoading(true);
    setSuggestions(null);

    const ingredients = expiringItems.map((item) => item.name);

    if (ingredients.length === 0) {
      toast({
        title: "No expiring items",
        description: "You have no ingredients nearing their expiration date. Great job!",
        variant: "default",
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await suggestRecipes({ ingredients });
      setSuggestions(result);
    } catch (error) {
      console.error("Error suggesting recipes:", error);
      toast({
        title: "Error",
        description: "Could not fetch recipe suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-6 w-6" />
          Recipe Suggestions
        </CardTitle>
        <CardDescription>
          Get recipe ideas for items that are about to expire to reduce food waste.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {expiringItems.length > 0 && (
          <p className="text-sm text-muted-foreground">
            You have {expiringItems.length} item(s) expiring soon:{" "}
            <span className="font-medium text-foreground">
              {expiringItems.map((i) => i.name).join(", ")}
            </span>
          </p>
        )}
        <Button onClick={handleSuggestRecipes} disabled={isLoading} className="w-full">
          {isLoading ? "Thinking..." : "Suggest Recipes"}
        </Button>

        {isLoading && (
          <div className="space-y-2 pt-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-full" />
          </div>
        )}

        {suggestions && suggestions.recipes.length > 0 && (
          <div className="pt-2">
            <h4 className="font-semibold mb-2">Here are some ideas:</h4>
            <ul className="list-disc list-inside space-y-1">
              {suggestions.recipes.map((recipe, index) => (
                <li key={index} className="flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4 text-primary" />
                    {recipe}
                </li>
              ))}
            </ul>
          </div>
        )}

        {suggestions && suggestions.recipes.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground pt-4">
                <Lightbulb className="h-8 w-8 mb-2" />
                <p>No specific recipes found, but you could try a simple stir-fry or salad!</p>
            </div>
        )}

      </CardContent>
    </Card>
  );
}
