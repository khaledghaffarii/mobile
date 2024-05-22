// services/productService.ts

import { Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products: Product[] = await response.json();
    // const multipliedProducts: Product[] = [];
    // for (let i = 0; i < 10; i++) {
    //   products.forEach((product) => {
    //     multipliedProducts.push({
    //       ...product,
    //       id: product.id * 1000 + i,
    //     });
    //   });
    // }

    // return multipliedProducts;
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
