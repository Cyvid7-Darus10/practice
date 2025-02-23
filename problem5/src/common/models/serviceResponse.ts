import { StatusCodes } from "http-status-codes";
import { z } from "zod";

/**
 * A standardized wrapper for API responses.
 *
 * @template T - Type of the data returned in the response.
 */
export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly responseObject: T;
  readonly statusCode: number;

  /**
   * Private constructor to enforce the use of static helper methods.
   *
   * @param success - Indicates whether the response is a success.
   * @param message - A descriptive message.
   * @param responseObject - The payload data.
   * @param statusCode - HTTP status code for the response.
   */
  private constructor(
    success: boolean,
    message: string,
    responseObject: T,
    statusCode: number
  ) {
    this.success = success;
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;
  }

  /**
   * Creates a successful response.
   *
   * @param message - Success message.
   * @param responseObject - Data payload.
   * @param statusCode - HTTP status code (default: 200 OK).
   * @returns A ServiceResponse instance representing success.
   */
  static success<T>(
    message: string,
    responseObject: T,
    statusCode: number = StatusCodes.OK
  ): ServiceResponse<T> {
    return new ServiceResponse<T>(true, message, responseObject, statusCode);
  }

  /**
   * Creates a failure response.
   *
   * @param message - Error message.
   * @param responseObject - Data payload (if any).
   * @param statusCode - HTTP status code (default: 400 Bad Request).
   * @returns A ServiceResponse instance representing failure.
   */
  static failure<T>(
    message: string,
    responseObject: T,
    statusCode: number = StatusCodes.BAD_REQUEST
  ): ServiceResponse<T> {
    return new ServiceResponse<T>(false, message, responseObject, statusCode);
  }
}

/**
 * Generates a Zod schema for validating ServiceResponse objects.
 *
 * @template T - The Zod schema for the responseObject.
 * @param dataSchema - A Zod schema describing the responseObject.
 * @returns A Zod object schema for ServiceResponse.
 */
export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataSchema.optional(),
    statusCode: z.number(),
  });
