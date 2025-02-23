import type { Database } from "sqlite";
import type { Food, Ingredient } from "@/api/food/foodModel";
import { connectDB } from "@/db";

export class FoodRepository {
  constructor(private db: Database) {}

  /**
   * Creates an instance of FoodRepository with an active database connection.
   * @returns A promise that resolves to a FoodRepository instance.
   */
  static async createInstance(): Promise<FoodRepository> {
    const db = await connectDB();
    return new FoodRepository(db);
  }

  /**
   * Retrieves all food items from the database.
   * For each food item, its associated ingredients are also fetched.
   * @returns A promise that resolves to an array of Food objects.
   */
  async findAllAsync(): Promise<Food[]> {
    const foods = await this.db.all<Food[]>(`
      SELECT DISTINCT
        f.id,
        f.name,
        f.description,
        f.created_at as createdAt,
        f.updated_at as updatedAt
      FROM foods f
    `);

    // For each food, fetch associated ingredients.
    for (const food of foods) {
      const ingredients = await this.db.all<Ingredient[]>(
        `
        SELECT i.id, i.name
        FROM ingredients i
        JOIN food_ingredients fi ON fi.ingredient_id = i.id
        WHERE fi.food_id = ?
      `,
        food.id
      );
      food.ingredients = ingredients;
      food.createdAt = new Date(food.createdAt);
      food.updatedAt = new Date(food.updatedAt);
    }

    return foods;
  }

  /**
   * Retrieves a single food item by its ID.
   * @param id - The ID of the food item to retrieve.
   * @returns A promise that resolves to a Food object or null if not found.
   */
  async findByIdAsync(id: number): Promise<Food | null> {
    const food = await this.db.get<Food>(
      `
      SELECT 
        id,
        name,
        description,
        created_at as createdAt,
        updated_at as updatedAt
      FROM foods
      WHERE id = ?
    `,
      id
    );

    if (!food) return null;

    const ingredients = await this.db.all<Ingredient[]>(
      `
      SELECT i.id, i.name
      FROM ingredients i
      JOIN food_ingredients fi ON fi.ingredient_id = i.id
      WHERE fi.food_id = ?
    `,
      id
    );

    food.ingredients = ingredients;
    food.createdAt = new Date(food.createdAt);
    food.updatedAt = new Date(food.updatedAt);

    return food;
  }

  /**
   * Creates a new food entry in the database.
   * Inserts the food data and manages the insertion of its ingredients.
   * If an ingredient already exists, it is attached automatically.
   * @param foodData - The food data excluding auto-generated fields.
   * @returns A promise that resolves to the created Food object.
   * @throws If the food creation fails.
   */
  async createAsync(
    foodData: Omit<Food, "id" | "createdAt" | "updatedAt">
  ): Promise<Food> {
    await this.db.run("BEGIN TRANSACTION");

    try {
      // Insert the food item.
      const result = await this.db.run(
        `
        INSERT INTO foods (name, description)
        VALUES (?, ?)
      `,
        foodData.name,
        foodData.description
      );
      const foodId = result.lastID!;

      // If ingredients are provided, attach them.
      if (foodData.ingredients && foodData.ingredients.length > 0) {
        for (const ingredient of foodData.ingredients) {
          // Check if the ingredient already exists.
          let ingredientRecord = await this.db.get<{ id: number }>(
            "SELECT id FROM ingredients WHERE name = ?",
            ingredient.name
          );
          // If it doesn't exist, insert it.
          if (!ingredientRecord) {
            const insertResult = await this.db.run(
              "INSERT INTO ingredients (name) VALUES (?)",
              ingredient.name
            );
            ingredientRecord = { id: insertResult.lastID! };
          }
          // Create the relationship in the junction table.
          await this.db.run(
            `
            INSERT INTO food_ingredients (food_id, ingredient_id)
            VALUES (?, ?)
          `,
            foodId,
            ingredientRecord.id
          );
        }
      }

      await this.db.run("COMMIT");

      const newFood = await this.findByIdAsync(foodId);
      if (!newFood) throw new Error("Failed to create food");
      return newFood;
    } catch (error) {
      await this.db.run("ROLLBACK");
      throw error;
    }
  }

  /**
   * Updates an existing food entry in the database.
   * Updates basic food details and its associated ingredients.
   * @param id - The ID of the food item to update.
   * @param updateData - Partial food data for the update.
   * @returns A promise that resolves to the updated Food object or null if not found.
   * @throws If the update fails.
   */
  async updateAsync(
    id: number,
    updateData: Partial<Omit<Food, "id" | "createdAt" | "updatedAt">>
  ): Promise<Food | null> {
    await this.db.run("BEGIN TRANSACTION");

    try {
      // Update basic fields if provided.
      if (updateData.name || updateData.description) {
        const updates = [];
        const values: (string | number)[] = [];

        if (updateData.name) {
          updates.push("name = ?");
          values.push(updateData.name);
        }
        if (updateData.description) {
          updates.push("description = ?");
          values.push(updateData.description);
        }

        await this.db.run(
          `
          UPDATE foods 
          SET ${updates.join(", ")}
          WHERE id = ?
        `,
          ...values,
          id
        );
      }

      // If ingredients are provided, update them.
      if (updateData.ingredients) {
        // Remove existing relationships.
        await this.db.run(
          `
          DELETE FROM food_ingredients
          WHERE food_id = ?
        `,
          id
        );

        // Add new ingredients.
        for (const ingredient of updateData.ingredients) {
          let ingredientRecord = await this.db.get<{ id: number }>(
            "SELECT id FROM ingredients WHERE name = ?",
            ingredient.name
          );
          if (!ingredientRecord) {
            const insertResult = await this.db.run(
              "INSERT INTO ingredients (name) VALUES (?)",
              ingredient.name
            );
            ingredientRecord = { id: insertResult.lastID! };
          }
          await this.db.run(
            `
            INSERT INTO food_ingredients (food_id, ingredient_id)
            VALUES (?, ?)
          `,
            id,
            ingredientRecord.id
          );
        }
      }

      await this.db.run("COMMIT");

      return await this.findByIdAsync(id);
    } catch (error) {
      await this.db.run("ROLLBACK");
      throw error;
    }
  }

  /**
   * Deletes a food item from the database.
   * @param id - The ID of the food item to delete.
   * @returns A promise that resolves to a boolean indicating if a record was deleted.
   */
  async deleteAsync(id: number): Promise<boolean> {
    const result = await this.db.run(
      `
      DELETE FROM foods
      WHERE id = ?
    `,
      id
    );
    return result.changes !== 0;
  }
}
