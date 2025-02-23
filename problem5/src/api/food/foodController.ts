import type { Request, RequestHandler, Response } from "express";

import { foodService } from "@/api/food/foodService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class FoodController {
  public getFoods: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await foodService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getFood: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await foodService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  public createFood: RequestHandler = async (req: Request, res: Response) => {
    const foodData = req.body;
    const serviceResponse = await foodService.create(foodData);
    return handleServiceResponse(serviceResponse, res);
  };

  public updateFood: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const updateData = req.body;
    const serviceResponse = await foodService.update(id, updateData);
    return handleServiceResponse(serviceResponse, res);
  };

  public deleteFood: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await foodService.delete(id);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const foodController = new FoodController();
