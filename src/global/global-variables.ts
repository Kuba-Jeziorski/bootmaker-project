import type { DefaultBootsObject, DefaultBootsVariant } from "./global-types";

export const localServerBootsUrl = "http://localhost:8000/boots";
export const localServerRecommendedUrl = "http://localhost:9000/recommended";

export const staleTime = 5;

const defaultBootsVariant: DefaultBootsVariant = {
  id: "",
  productName: "",
  colorName: "",
  referenceNumber: "",
  price: "",
  size: [],
  width: "",
  calfWidth: [],
  images: [],
  material: {
    name: "",
    description: "",
  },
  care: "",
};

export const defaultBootsObject: DefaultBootsObject = {
  id: "",
  variant: [],
};
