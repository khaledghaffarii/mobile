import { Product } from "./Product";

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { product: Product };
  Cart: undefined;
  Order: undefined;
};
