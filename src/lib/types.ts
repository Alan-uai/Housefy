export type ItemCategory = 'Fruit' | 'Vegetable' | 'Dairy' | 'Meat' | 'Pantry' | 'Frozen' | 'Beverage' | 'Snack' | 'Other';

export type ItemLocation = 'Fridge' | 'Pantry' | 'Freezer';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  minStock: number;
  expiryDate?: string;
  category: ItemCategory;
  location: ItemLocation;
}
