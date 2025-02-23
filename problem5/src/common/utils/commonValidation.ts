import { z } from "zod";

/**
 * Common validations for request data.
 */
export const commonValidations = {
  /**
   * Validates that an ID is a positive integer.
   * Accepts either a number or a numeric string.
   */
  id: z.preprocess(
    (value) => (typeof value === "string" ? Number(value) : value),
    z.number({
      required_error: "ID is required",
      invalid_type_error: "ID must be a numeric value",
    })
      .int("ID must be an integer")
      .positive("ID must be a positive number")
  ),

  /**
   * Validates that a string field is not empty.
   */
  nonEmptyString: z.string().min(1, "Field cannot be empty"),

  /**
   * Validates an email address.
   */
  email: z.string().email("Invalid email address"),

  /**
   * Validates that a URL is correctly formatted.
   */
  url: z.string().url("Invalid URL format"),

  /**
   * Validates a password ensuring a minimum length.
   */
  password: z.string().min(8, "Password must be at least 8 characters long"),

  /**
   * Validates a date string.
   * The input must be a valid date format.
   */
  date: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    "Invalid date format"
  ),
};