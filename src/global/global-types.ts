export type DefaultBootsVariant = {
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

export type DefaultBootsObject = {
  id: string;
  variant: DefaultBootsVariant[];
};
