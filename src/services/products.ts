import products, { ProductWithId } from "../repositories/products";
import categories from "./categories";
import { Product, apiProduct } from "../repositories/products";
import { makeError } from "../middlewares/errorHandler";

const getAllProducts = async () => {
  const product = await products.indexWithJoin();
  const apiProduct = product.map((item: Product) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
      rating: {
        rate: item.rate,
        count: item.count,
      },
    };
  });
  return apiProduct;
};

const findAProductByID = async (productId: number) => {
  const id = productId;
  const product: any = await products.selectByIdWithJoin(id);
  if (!product[0])
    throw makeError({ message: "Non-existent product", status: 400 });

  const apiProduct = product.map((item: Product) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
      rating: {
        rate: item.rate,
        count: item.count,
      },
    };
  });
  return apiProduct[0];
};

const findByCategoryID = async (catId: number) => {
  const product: any = await products.selectByCategoryIdWithJoin(catId);

  if (!product[0])
    throw makeError({ message: "Non-existent product", status: 400 });
  const apiProduct = product.map((item: Product) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
      rating: {
        rate: item.rate,
        count: item.count,
      },
    };
  });
  return apiProduct;
};

const hasProductOfThisCartegory = async (cateId: number) => {
  const product: any = products.selectByCategoryIdWithJoin(cateId);
  if (!product[0]) {
    return false;
  }
  return true;
};

const createAProduct = async (product: apiProduct) => {
  const findACategory: any = await categories.findCategoryByName(
    product.category
  );
  const newProduct: Product = {
    title: product.title,
    price: product.price,
    description: product.description,
    category_id: findACategory[0].id,
    category: findACategory[0].name,
    image: product.image,
    rate: product.rating.rate,
    count: product.rating.count,
  };

  const id = await products.insert(newProduct);
  const result: any = await findAProductByID(id);
  return result;
};

const updateAProduct = async (id: number, product: apiProduct) => {
  const findAProduct: any = await products.selectByIdWithJoin(id);
  if (!findAProduct) {
    throw makeError({ message: "Non-existent product", status: 400 });
  }
  const findACategory: any = await categories.findCategoryByName(
    product.category
  );

  const newData: ProductWithId = {
    title: product.title,
    price: product.price,
    description: product.description,
    category_id: findACategory[0].id,
    image: product.image,
    rate: product.rating.rate,
    count: product.rating.count,
  };
  await products.update(id, newData);
  const updated = await products.selectByIdWithJoin(id);
  return updated;
};

const deleteAProduct = async (id: number) => {
  const findAProduct: any = await products.selectByIdWithJoin(id);
  if (!findAProduct[0]) {
    throw makeError({ message: "Non-existent product", status: 400 });
  }
  await products.remove(id);
  return {
    message: "Product deleted",
    product: findAProduct[0],
  };
};

const findTopRatedProducts = async () => {
  const product = await products.getTopRatedProducts();
  const apiProduct = product.map((item: Product) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
      rating: {
        rate: item.rate,
        count: item.count,
      },
    };
  });
  return apiProduct;
};

export default {
  getAllProducts,
  hasProductOfThisCartegory,
  findByCategoryID,
  findAProductByID,
  createAProduct,
  updateAProduct,
  deleteAProduct,
  findTopRatedProducts,
};
