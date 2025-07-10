import type { InventoryItem } from './types';

const today = new Date();
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const initialInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Organic Milk',
    quantity: 1,
    minStock: 1,
    expiryDate: addDays(today, 5).toISOString(),
    category: 'Dairy',
    location: 'Fridge',
  },
  {
    id: '2',
    name: 'Granny Smith Apples',
    quantity: 6,
    minStock: 4,
    expiryDate: addDays(today, 10).toISOString(),
    category: 'Fruit',
    location: 'Fridge',
  },
  {
    id: '3',
    name: 'Chicken Breast',
    quantity: 2,
    minStock: 2,
    expiryDate: addDays(today, 2).toISOString(),
    category: 'Meat',
    location: 'Fridge',
  },
  {
    id: '4',
    name: 'Whole Wheat Bread',
    quantity: 8,
    minStock: 4,
    expiryDate: addDays(today, 6).toISOString(),
    category: 'Pantry',
    location: 'Pantry',
  },
  {
    id: '5',
    name: 'Cheddar Cheese',
    quantity: 1,
    minStock: 1,
    expiryDate: addDays(today, 20).toISOString(),
    category: 'Dairy',
    location: 'Fridge',
  },
  {
    id: '6',
    name: 'Baby Carrots',
    quantity: 5,
    minStock: 10,
    expiryDate: addDays(today, 8).toISOString(),
    category: 'Vegetable',
    location: 'Fridge',
  },
  {
    id: '7',
    name: 'Pasta',
    quantity: 3,
    minStock: 2,
    category: 'Pantry',
    location: 'Pantry',
  },
  {
    id: '8',
    name: 'Frozen Peas',
    quantity: 1,
    minStock: 1,
    category: 'Frozen',
    location: 'Freezer',
  },
  {
    id: '9',
    name: 'Lettuce',
    quantity: 1,
    minStock: 1,
    expiryDate: addDays(today, 3).toISOString(),
    category: 'Vegetable',
    location: 'Fridge',
  },
];
