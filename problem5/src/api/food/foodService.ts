import { StatusCodes } from "http-status-codes";
import type { Food } from "@/api/food/foodModel";
import { FoodRepository } from "@/api/food/foodRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { CreateFoodSchema, UpdateFoodSchema } from "@/api/food/foodModel";
import { z } from "zod";

/**
 * Service class for managing Food operations.
 */
export class FoodService {
  private foodRepository?: FoodRepository;

  /**
   * Constructs a new FoodService instance.
   * If a repository is provided, it is used; otherwise, the repository is lazily initialized.
   * @param repository - (Optional) An instance of FoodRepository.
   */
  constructor(repository?: FoodRepository) {
    if (repository) {
      this.foodRepository = repository;
    } else {
      // Start asynchronous initialization; subsequent calls will wait for it.
      void this.initializeRepository();
    }
  }

  /**
   * Asynchronously initializes the repository using the database connection.
   * @throws If the database connection or repository initialization fails.
   */
  private async initializeRepository(): Promise<void> {
    try {
      // Use the static factory method from FoodRepository to connect to the DB.
      this.foodRepository = await FoodRepository.createInstance();
    } catch (error) {
      logger.error(`Failed to initialize food repository: ${error}`);
      throw error;
    }
  }

  /**
   * Ensures the repository is initialized before performing operations.
   */
  private async ensureRepository(): Promise<void> {
    if (!this.foodRepository) {
      await this.initializeRepository();
    }
  }

  /**
   * Retrieves all food items from the database.
   * @returns A promise that resolves to a ServiceResponse containing an array of Food objects or null.
   */
  async findAll(): Promise<ServiceResponse<Food[] | null>> {
    try {
      await this.ensureRepository();
      const foods = await this.foodRepository!.findAllAsync();
      if (!foods || foods.length === 0) {
        return ServiceResponse.failure(
          "No Foods found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<Food[]>("Foods found", foods);
    } catch (ex) {
      const errorMessage = `Error finding all foods: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving foods.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Retrieves a single food item by its ID.
   * @param id - The ID of the food item to retrieve.
   * @returns A promise that resolves to a ServiceResponse containing the Food object or null.
   */
  async findById(id: number): Promise<ServiceResponse<Food | null>> {
    try {
      await this.ensureRepository();
      const food = await this.foodRepository!.findByIdAsync(id);
      if (!food) {
        return ServiceResponse.failure(
          "Food not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<Food>("Food found", food);
    } catch (ex) {
      const errorMessage = `Error finding food with id ${id}: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding food.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Creates a new food item in the database.
   * @param foodData - The data for the new food item, validated against the CreateFoodSchema.
   * @returns A promise that resolves to a ServiceResponse containing the newly created Food object or null.
   */
  async create(
    foodData: z.infer<typeof CreateFoodSchema>["body"]
  ): Promise<ServiceResponse<Food | null>> {
    try {
      await this.ensureRepository();
      // The presence of foodData.name is guaranteed by CreateFoodSchema validation.
      const newFood = await this.foodRepository!.createAsync(
        foodData as Omit<Food, "id" | "createdAt" | "updatedAt">
      );
      return ServiceResponse.success<Food>(
        "Food created",
        newFood,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating food: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating food.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Updates an existing food item in the database.
   * @param id - The ID of the food item to update.
   * @param updateData - The update data for the food item, validated against the UpdateFoodSchema body.
   * @returns A promise that resolves to a ServiceResponse containing the updated Food object or null.
   */
  async update(
    id: number,
    updateData: z.infer<typeof UpdateFoodSchema>["body"]
  ): Promise<ServiceResponse<Food | null>> {
    try {
      await this.ensureRepository();
      const updatedFood = await this.foodRepository!.updateAsync(
        id,
        updateData
      );
      if (!updatedFood) {
        return ServiceResponse.failure(
          "Food not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<Food>("Food updated", updatedFood);
    } catch (ex) {
      const errorMessage = `Error updating food with id ${id}: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating food.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Deletes a food item from the database.
   * @param id - The ID of the food item to delete.
   * @returns A promise that resolves to a ServiceResponse indicating the result of the deletion.
   */
  async delete(id: number): Promise<ServiceResponse<null>> {
    try {
      await this.ensureRepository();
      const deleted = await this.foodRepository!.deleteAsync(id);
      if (!deleted) {
        return ServiceResponse.failure(
          "Food not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<null>("Food deleted", null);
    } catch (ex) {
      const errorMessage = `Error deleting food with id ${id}: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while deleting food.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

// Export a singleton instance of FoodService.
export const foodService = new FoodService();
