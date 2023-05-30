import { makeError } from "../middlewares/errorHandler";
import { Category } from "../repositories/categories";
import categories from "../repositories/categories";
import products from "./products";

const getAllCategories = async () => {
  const result = await categories.index();

  return result.map((item: Category) => item.name);
};

const getProducts = async (name: string) => {
  const category: any = await categories.selectByName(name);
  if (!category[0]) {
    throw makeError({ message: "Non-existent", status: 400 });
  }
  const allProducts: any = await products.findByCategoryID(category[0].id);
  if (!allProducts[0]) {
    throw makeError({ message: "Non-existent product", status: 400 });
  }
  return allProducts;
};

const findCategoryByName = async (name: string) => {
  const result = await categories.selectByName(name);
  if (!result.length) throw makeError({ message: "Non-existent", status: 400 });
  return result;
};

const findCategoryById = async (id: number) => {
  const result = await categories.selectById(id);
  if (!result.length) throw makeError({ message: "Non-existent", status: 400 });
  return result;
};

const insertCategory = async (category: Category) => {
  const result = await categories.selectByName(category.name);
  if (result.length) {
    throw makeError({ message: "Category already registered", status: 422 });
  }
  const id: any = await categories.insert(category);
  const newCategory = await findCategoryById(id[0]);
  return newCategory;
};

const updateCategory = async (oldName: string, newData: Category) => {
  const findACategory: any = await findCategoryByName(oldName);
  if (!findACategory[0]) {
    throw makeError({ message: "Non-existent", status: 400 });
  }
  const id = parseInt(findACategory[0].id);
  await categories.update(id, newData);
  const result = await findCategoryById(id);
  return result;
};

const deleteCategory = async (name: string) => {
  const findACategory: any = await findCategoryByName(name);
  if (!findACategory[0]) {
    throw makeError({ message: "Non-existent", status: 400 });
  }

  const findProduct: any = await products.hasProductOfThisCartegory(
    findACategory[0].id
  );
  if (findProduct)
    throw makeError({ message: "Could not delete category", status: 400 });

  await categories.remove(findACategory[0].id);
  const result = {
    message: "Category deleted",
    category: findACategory[0],
  };
  return result;
};

export default {
  getAllCategories,
  getProducts,
  findCategoryByName,
  findCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory,
};
