import { StatusCodes } from "http-status-codes";

import type { Food } from "@/api/food/foodModel";
import { FoodRepository } from "@/api/food/foodRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class FoodService {
  private foodRepository: FoodRepository;

  constructor(repository: FoodRepository = new FoodRepository()) {
    this.foodRepository = repository;
  }

  // Retrieves all foods from the database
  async findAll(): Promise<ServiceResponse<Food[] | null>> {
    try {
      const foods = await this.foodRepository.findAllAsync();
      if (!foods || foods.length === 0) {
        return ServiceResponse.failure("No Foods found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Food[]>("Foods found", foods);
    } catch (ex) {
      const errorMessage = `Error finding all foods: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving foods.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a single food by its ID
  async findById(id: number): Promise<ServiceResponse<Food | null>> {
    try {
      const food = await this.foodRepository.findByIdAsync(id);
      if (!food) {
        return ServiceResponse.failure("Food not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Food>("Food found", food);
    } catch (ex) {
      const errorMessage = `Error finding food with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding food.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // Creates a new food entry in the database
  async create(foodData: Partial<Food>): Promise<ServiceResponse<Food | null>> {
    try {
  
      if (!foodData.name) {
        return ServiceResponse.failure("Food name is required", null, StatusCodes.BAD_REQUEST);
      }

      const newFood = await this.foodRepository.createAsync(foodData as Omit<Food, "id" | "createdAt" | "updatedAt">);
      return ServiceResponse.success<Food>("Food created", newFood, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Error creating food: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while creating food.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // Updates an existing food entry
  async update(id: number, updateData: Partial<Food>): Promise<ServiceResponse<Food | null>> {
    try {
      const updatedFood = await this.foodRepository.updateAsync(id, updateData);
      if (!updatedFood) {
        return ServiceResponse.failure("Food not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Food>("Food updated", updatedFood);
    } catch (ex) {
      const errorMessage = `Error updating food with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while updating food.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // Deletes a food entry from the database
  async delete(id: number): Promise<ServiceResponse<null>> {
    try {
      const deleted = await this.foodRepository.deleteAsync(id);
      if (!deleted) {
        return ServiceResponse.failure("Food not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<null>("Food deleted", null);
    } catch (ex) {
      const errorMessage = `Error deleting food with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while deleting food.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const foodService = new FoodService();
