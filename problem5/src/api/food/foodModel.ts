import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

/**
 * Schema for an ingredient.
 *
 * @example
 * {
 *   id: 1,
 *   name: "Tomato"
 * }
 */
export const IngredientSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: "Tomato" }),
});

export type Ingredient = z.infer<typeof IngredientSchema>;

/**
 * Schema for a food item.
 *
 * @example
 * {
 *   id: 1,
 *   name: "Pizza",
 *   description: "Delicious cheesy pizza",
 *   ingredients: [{ id: 1, name: "Tomato" }],
 *   createdAt: "2023-01-01T00:00:00.000Z",
 *   updatedAt: "2023-01-01T00:00:00.000Z"
 * }
 */
export const FoodSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: "Pizza" }),
  description: z
    .string()
    .optional()
    .openapi({ example: "Delicious cheesy pizza" }),
  ingredients: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().openapi({ example: "Tomato" }),
      })
    )
    .optional(),
  createdAt: z.date().openapi({ example: "2023-01-01T00:00:00.000Z" }),
  updatedAt: z.date().openapi({ example: "2023-01-01T00:00:00.000Z" }),
});

export type Food = z.infer<typeof FoodSchema>;

/**
 * Schema for creating a new food item.
 * Excludes auto-generated fields (id, createdAt, updatedAt).
 *
 * @example
 * {
 *   name: "Pizza",
 *   description: "Delicious cheesy pizza",
 *   ingredients: [{ name: "Tomato" }]
 * }
 */
export const CreateFoodSchema = z.object({
  body: z.object({
    name: z.string().openapi({ example: "Pizza" }),
    description: z
      .string()
      .optional()
      .openapi({ example: "Delicious cheesy pizza" }),
    ingredients: z
      .array(
        z.object({
          id: z.number().optional(),
          name: z.string().openapi({ example: "Orange" }),
        })
      )
      .optional(),
  }),
});

/**
 * Schema for validating the "id" parameter in routes (e.g., GET, PUT, DELETE /foods/:id).
 * It ensures the id is a string representing a number and transforms it into a number.
 *
 * @example
 * {
 *   params: { id: "1" }
 * }
 */
export const GetFoodSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, "ID must be a number")
      .transform((val) => Number(val)),
  }),
});

/**
 * Schema for updating a food item.
 * Combines parameter validation with a partial update for the request body.
 *
 * @example
 * {
 *   params: { id: "1" },
 *   body: { name: "Updated Pizza", description: "New description" }
 * }
 */
export const UpdateFoodSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, "ID must be a number")
      .transform((val) => Number(val)),
  }),
  body: z.object({
    name: z.string().openapi({ example: "Pizza" }),
    description: z
      .string()
      .optional()
      .openapi({ example: "Delicious cheesy pizza" }),
    ingredients: z
      .array(
        z.object({
          id: z.number().optional(),
          name: z.string().openapi({ example: "Orange" }),
        })
      )
      .optional(),
  }),
});
