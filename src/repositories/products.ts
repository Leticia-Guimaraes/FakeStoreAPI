import knex from "knex";
import config from "../../knexfile";

export type apiProduct = {
  id?: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type Product = {
  id?: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rate: number;
  count: number;
  category: string;
  category_id: number;
};

export type ProductWithId = {
  id?: number;
  title: string;
  price: number;
  description: string;
  category_id: number;
  image: string;
  rate: number;
  count: number;
};

const knexInstance = knex(config);

const indexWithJoin = async () => {
  const product: Product[] = await knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "products.title",
      "categories.name as category",
      "products.image",
      "products.rate",
      "products.count"
    )
    .leftJoin("categories", "categories.id", "products.category_id");

  return product;
};

const selectByIdWithJoin = async (productId: number) => {
  try {
    const id = productId;
    const product: Product[] = await knexInstance("products")
      .select(
        "products.id",
        "products.title",
        "products.price",
        "products.description",
        "products.title",
        "categories.name as category",
        "products.image",
        "products.rate",
        "products.count"
      )
      .join("categories", "categories.id", "=", "products.category_id")
      .where({ "products.id": id });

    return product;
  } catch (error) {
    throw error;
  }
};

const selectByCategoryIdWithJoin = async (catId: number) => {
  const products: Product[] = await knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "products.title",
      "categories.name as category",
      "products.image",
      "products.rate",
      "products.count"
    )
    .join("categories", "categories.id", "=", "products.category_id")
    .where({ category_id: catId });

  return products;
};

const insert = async (product: ProductWithId) => {
  try {
    const newProduct = product;
    const newProductId: any = await knexInstance("products").insert(newProduct);
    return newProductId[0];
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, product: ProductWithId) => {
  try {
    const newData = await knexInstance("products")
      .update(product)
      .where({ id });
    return product;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const removed = await knexInstance("products").delete().where({ id });
    return removed;
  } catch (error) {
    throw error;
  }
};

export default {
  update,
  indexWithJoin,
  selectByCategoryIdWithJoin,
  selectByIdWithJoin,
  insert,
  remove,
};
