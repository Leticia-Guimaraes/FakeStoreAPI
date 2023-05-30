import { NextFunction, Request, Response } from "express";
import categories from "../services/categories";
import { Category } from "../repositories/categories";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allCategories = await categories.getAllCategories();

    res.status(200).send(allCategories);
  } catch (error: any) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryName = req.params.name;

    const products: any = await categories.getProducts(categoryName);

    res.status(200).json(products);
  } catch (error: any) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newData: Category = req.body;

    const newCategory = await categories.insertCategory(newData);

    res.status(200).send(newCategory);
  } catch (error: any) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categories.updateCategory(req.params.name, req.body);

    res.status(200).send(category);
  } catch (error: any) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.name;

    const deleted = await categories.deleteCategory(name);

    res.status(200).send(deleted);
  } catch (error: any) {
    next(error);
  }
};

export default { insert, index, show, update, remove };
