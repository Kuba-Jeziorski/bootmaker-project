export const localServerUrl = "http://localhost:8000/boots";

type DefaultBootsVariant = {
  id: string;
  productName: string;
  colorName: string;
  referenceNumber: string;
  price: string;
  size: string[];
  width: string;
  calfWidth: string[];
  images: string[];
  material: {
    name: string;
    description: string;
  };
  care: string;
};

type DefaultBootsObject = {
  id: string;
  variant: DefaultBootsVariant[];
};

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
