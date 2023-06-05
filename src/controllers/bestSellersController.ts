import express, { NextFunction, Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import products from "../services/products";

const knexInstance = knex(config);

const bestSeller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topRated = await products.findTopRatedProducts();
    res.status(200).json(topRated);
  } catch (error: any) {
    next(error);
  }
};

export default { bestSeller };
