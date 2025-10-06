import { mockProducts } from "../mockData";
import { randomDelayRequest } from "../utils";

const getProduct = async (id: string) => {
  await randomDelayRequest();
  const product = mockProducts.find((product) => product.id === id);
  return product;
};

export default getProduct;