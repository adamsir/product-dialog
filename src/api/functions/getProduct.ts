import { mockProducts } from "../mockData";
import type { Product } from "../types";
import { randomDelayRequest } from "../utils";

export const getProduct = async (id: string) => {
  await randomDelayRequest();
  const product = mockProducts.find((product) => product.id === id);
  return product;
};

export const getProducts = async (ids: string[]) => {
  await randomDelayRequest();

  let products: Product[] = [];
  
  for (const id of ids) {
    const product = mockProducts.find((product) => product.id === id);
    if (product) {
      products.push(product);
    }
  }

  return products;
};
