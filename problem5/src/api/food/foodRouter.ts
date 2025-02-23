import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetFoodSchema, FoodSchema, CreateFoodSchema } from "@/api/food/foodModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { foodController } from "./foodController";

export const foodRegistry = new OpenAPIRegistry();
export const foodRouter: Router = express.Router();

/**
 * Register the Food model with OpenAPI.
 * This allows the Food schema to be referenced in the generated documentation.
 */
foodRegistry.register("Food", FoodSchema);

/**
 * GET /foods - List all foods.
 *
 * This endpoint retrieves an array of all food items.
 * The response is documented as an array of FoodSchema.
 */
foodRegistry.registerPath({
  method: "get",
  path: "/foods",
  tags: ["Food"],
  responses: createApiResponse(z.array(FoodSchema), "Success"),
});
foodRouter.get("/", foodController.getFoods);

/**
 * GET /foods/{id} - Retrieve a single food item.
 *
 * This endpoint retrieves a food item by its ID.
 * The request parameters are validated using GetFoodSchema.
 * The response is documented using FoodSchema.
 */
foodRegistry.registerPath({
  method: "get",
  path: "/foods/{id}",
  tags: ["Food"],
  request: { params: GetFoodSchema.shape.params },
  responses: createApiResponse(FoodSchema, "Success"),
});
foodRouter.get("/:id", validateRequest(GetFoodSchema), foodController.getFood);

/**
 * POST /foods - Create a new food.
 *
 * This endpoint creates a new food item using the provided data.
 * The request body is validated using CreateFoodSchema.
 * The body is wrapped in a content object under "application/json" for proper OpenAPI documentation.
 */
foodRegistry.registerPath({
  method: "post",
  path: "/foods",
  tags: ["Food"],
  request: { body: { content: { "application/json": { schema: CreateFoodSchema } } } },
  responses: createApiResponse(FoodSchema, "Food created"),
});
foodRouter.post("/", validateRequest(CreateFoodSchema), foodController.createFood);

/**
 * PUT /foods/{id} - Update an existing food.
 *
 * This endpoint updates an existing food item identified by its ID.
 * The request parameters are validated using GetFoodSchema and the request body using CreateFoodSchema.
 * The body is wrapped in a content object under "application/json" for proper OpenAPI documentation.
 */
foodRegistry.registerPath({
  method: "put",
  path: "/foods/{id}",
  tags: ["Food"],
  request: {
    params: GetFoodSchema.shape.params,
    body: { content: { "application/json": { schema: CreateFoodSchema } } },
  },
  responses: createApiResponse(FoodSchema, "Food updated"),
});
foodRouter.put(
  "/:id",
  validateRequest(GetFoodSchema),
  validateRequest(CreateFoodSchema),
  foodController.updateFood
);

/**
 * DELETE /foods/{id} - Delete a food item.
 *
 * This endpoint deletes a food item by its ID.
 * The request parameters are validated using GetFoodSchema.
 * The response returns a message indicating the deletion result.
 */
foodRegistry.registerPath({
  method: "delete",
  path: "/foods/{id}",
  tags: ["Food"],
  request: { params: GetFoodSchema.shape.params },
  responses: createApiResponse(z.object({ message: z.string() }), "Food deleted"),
});
foodRouter.delete("/:id", validateRequest(GetFoodSchema), foodController.deleteFood);
