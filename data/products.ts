export type Product = {
  id: number;
  title: string;
  description: string;
  state: string;
  condition: string;
  measurements: string;
  price: number;
  images: string[];
};

const products: Product[] = [
  {
    id: 1,
    title: "Urban Sneakers",
    description: "Urban sneakers with very little use.\nComfortable and clean.",
    state: "available",
    condition: "Excellent",
    measurements: "Size 42",
    price: 45000,
    images: [
      "/images/zapas1.jpg",
      "/images/zapas2.jpg"
    ]
  },
  {
    id: 2,
    title: "Black Jacket",
    description: "Waterproof jacket.\nUsed but in good condition.",
    state: "sold",
    condition: "Good",
    measurements: "Size M",
    price: 60000,
    images: [
      "/images/chaqueta.jpg"
    ]
  },
  {
    id: 3,
    title: "Outdoor Backpack",
    description: "30L backpack.\nIdeal for hiking.",
    state: "available",
    condition: "Very good",
    measurements: "30 liters",
    price: 38000,
    images: [
      "/images/mochila.jpg"
    ]
  }
];

export default products;
