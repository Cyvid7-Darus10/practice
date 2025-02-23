import type { Food } from "@/api/food/foodModel";

// Sample in-memory foods data
export let foods: Food[] = [
  {
    id: 1,
    name: "Pizza",
    description: "Delicious cheesy pizza with tomato sauce.",
    ingredients: [
      { id: 1, name: "Tomato" },
      { id: 2, name: "Cheese" },
      { id: 3, name: "Basil" },
    ],
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
  {
    id: 2,
    name: "Burger",
    description: "Juicy burger with lettuce, tomato, and cheese.",
    ingredients: [
      { id: 4, name: "Lettuce" },
      { id: 5, name: "Tomato" },
      { id: 6, name: "Cheese" },
    ],
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
];

export class FoodRepository {
  async findAllAsync(): Promise<Food[]> {
    return foods;
  }

  async findByIdAsync(id: number): Promise<Food | null> {
    return foods.find((food) => food.id === id) || null;
  }

  async createAsync(foodData: Omit<Food, "id" | "createdAt" | "updatedAt">): Promise<Food> {
    const newId = foods.length > 0 ? Math.max(...foods.map((food) => food.id)) + 1 : 1;
    const newFood: Food = {
      ...foodData,
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    foods.push(newFood);
    return newFood;
  }

  async updateAsync(id: number, updateData: Partial<Omit<Food, "id" | "createdAt" | "updatedAt">>): Promise<Food | null> {
    const index = foods.findIndex((food) => food.id === id);
    if (index === -1) {
      return null;
    }
    const updatedFood: Food = {
      ...foods[index],
      ...updateData,
      updatedAt: new Date(),
    };
    foods[index] = updatedFood;
    return updatedFood;
  }

  async deleteAsync(id: number): Promise<boolean> {
    const initialLength = foods.length;
    foods = foods.filter((food) => food.id !== id);
    return foods.length < initialLength;
  }
}
