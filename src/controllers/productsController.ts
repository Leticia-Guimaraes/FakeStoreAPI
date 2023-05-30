import express, { NextFunction, Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import products from "../services/products";

const knexInstance = knex(config);

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProducts = await products.getAllProducts();
    res.status(200).json(allProducts);
  } catch (error: any) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const product = await products.findAProductByID(id);
    res.status(200).json(product);
  } catch (error: any) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, price, description, category, image, rating } = req.body;
    const newProduct = {
      title,
      price,
      description,
      image,
      rating,
      category,
    };

    const insertedProduct = await products.createAProduct(newProduct);

    res.status(201).send(insertedProduct);
  } catch (error: any) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const updateProduct = await products.updateAProduct(id, req.body);
    res.status(200).send(updateProduct);
  } catch (error: any) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const deleteProduct: any = await products.deleteAProduct(id);
    if (deleteProduct) res.status(200).send(deleteProduct);
  } catch (error: any) {
    next(error);
  }
};
export default { insert, index, show, update, remove };
