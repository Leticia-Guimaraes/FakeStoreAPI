import { Router, Request, Response } from "express";
import { router as productsRouter } from "./products";
import { router as categoriesRouter } from "./categories";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Inside API V1 ");
});

router.use("/products/categories", categoriesRouter);
router.use("/products", productsRouter);

export { router };
