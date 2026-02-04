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
    images: ["/images/zapas1.jpg", "/images/zapas2.jpg"]
  },
  {
    id: 2,
    title: "Black Jacket",
    description: "Waterproof jacket.\nUsed but in good condition.",
    state: "sold",
    condition: "Good",
    measurements: "Size M",
    price: 60000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 3,
    title: "Outdoor Backpack",
    description: "30L backpack.\nIdeal for hiking.",
    state: "available",
    condition: "Very good",
    measurements: "30 liters",
    price: 38000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 4,
    title: "Vintage Camera",
    description: "Classic film camera from the 1980s.\nFully functional.",
    state: "reserved",
    condition: "Good",
    measurements: "20cm x 15cm",
    price: 75000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 5,
    title: "Leather Wallet",
    description: "Genuine leather wallet.\nMinimalist design.",
    state: "available",
    condition: "Excellent",
    measurements: "10cm x 9cm",
    price: 25000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 6,
    title: "Running Shoes",
    description: "Professional running shoes.\nBarely used.",
    state: "paid",
    condition: "Like new",
    measurements: "Size 41",
    price: 55000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 7,
    title: "Sunglasses",
    description: "Designer sunglasses.\nUV protection.",
    state: "available",
    condition: "Excellent",
    measurements: "One size",
    price: 35000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 8,
    title: "Winter Coat",
    description: "Warm wool coat.\nPerfect for cold weather.",
    state: "delivered",
    condition: "Very good",
    measurements: "Size L",
    price: 85000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 9,
    title: "Sports Watch",
    description: "Waterproof sports watch.\nWith fitness tracker.",
    state: "sold",
    condition: "Good",
    measurements: "One size",
    price: 120000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 10,
    title: "Cotton T-shirt",
    description: "100% organic cotton.\nComfortable fit.",
    state: "available",
    condition: "Excellent",
    measurements: "Size M",
    price: 18000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 11,
    title: "Denim Jeans",
    description: "Classic blue denim.\nStretch fabric.",
    state: "reserved",
    condition: "Excellent",
    measurements: "Size 32",
    price: 42000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 12,
    title: "Casual Shoes",
    description: "Comfortable slip-on shoes.\nPerfect for everyday.",
    state: "available",
    condition: "Very good",
    measurements: "Size 43",
    price: 38000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 13,
    title: "Wool Scarf",
    description: "Soft merino wool scarf.\nWarm and cozy.",
    state: "paid",
    condition: "Excellent",
    measurements: "150cm x 40cm",
    price: 28000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 14,
    title: "Leather Belt",
    description: "Premium leather belt.\nAdjustable size.",
    state: "available",
    condition: "Excellent",
    measurements: "One size",
    price: 32000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 15,
    title: "Baseball Cap",
    description: "Vintage style cap.\nAdjustable strap.",
    state: "delivered",
    condition: "Good",
    measurements: "One size",
    price: 22000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 16,
    title: "Hiking Boots",
    description: "Waterproof hiking boots.\nLightweight design.",
    state: "available",
    condition: "Very good",
    measurements: "Size 44",
    price: 95000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 17,
    title: "Gym Bag",
    description: "Durable gym bag.\nWaterproof interior.",
    state: "reserved",
    condition: "Excellent",
    measurements: "45cm x 30cm",
    price: 48000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 18,
    title: "Silk Tie",
    description: "Elegant silk tie.\nClassic pattern.",
    state: "available",
    condition: "Excellent",
    measurements: "One size",
    price: 20000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 19,
    title: "Cardigan",
    description: "Comfortable cardigan.\nPerfect for layering.",
    state: "sold",
    condition: "Good",
    measurements: "Size M",
    price: 35000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 20,
    title: "Wool Socks",
    description: "Thermal wool socks.\nPack of 3.",
    state: "available",
    condition: "Excellent",
    measurements: "One size",
    price: 15000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 21,
    title: "Hoodie",
    description: "Cozy hoodie.\nPerfect for cold days.",
    state: "paid",
    condition: "Excellent",
    measurements: "Size L",
    price: 52000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 22,
    title: "Shorts",
    description: "Comfortable shorts.\nGreat for summer.",
    state: "available",
    condition: "Very good",
    measurements: "Size M",
    price: 28000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 23,
    title: "Formal Shirt",
    description: "Business formal shirt.\nEasy care fabric.",
    state: "delivered",
    condition: "Excellent",
    measurements: "Size M",
    price: 45000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 24,
    title: "Swimsuit",
    description: "UV protection swimsuit.\nChlorine resistant.",
    state: "available",
    condition: "Excellent",
    measurements: "Size S",
    price: 32000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 25,
    title: "Rain Jacket",
    description: "Lightweight rain jacket.\nWindproof.",
    state: "reserved",
    condition: "Like new",
    measurements: "Size M",
    price: 58000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 26,
    title: "Dress Pants",
    description: "Professional dress pants.\nWrinkle resistant.",
    state: "available",
    condition: "Excellent",
    measurements: "Size 32",
    price: 48000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 27,
    title: "Polo Shirt",
    description: "Classic polo shirt.\nBreathable fabric.",
    state: "sold",
    condition: "Good",
    measurements: "Size L",
    price: 22000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 28,
    title: "Blazer",
    description: "Navy blazer.\nPerfect for meetings.",
    state: "available",
    condition: "Very good",
    measurements: "Size M",
    price: 65000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 29,
    title: "Skirt",
    description: "Pleated skirt.\nTimeless design.",
    state: "paid",
    condition: "Excellent",
    measurements: "Size S",
    price: 38000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 30,
    title: "Vest",
    description: "Versatile vest.\nGreat for layering.",
    state: "available",
    condition: "Excellent",
    measurements: "Size M",
    price: 42000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 31,
    title: "Leggings",
    description: "Yoga leggings.\nHigh waist design.",
    state: "delivered",
    condition: "Excellent",
    measurements: "Size M",
    price: 35000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 32,
    title: "Sweatpants",
    description: "Comfortable sweatpants.\nRelaxed fit.",
    state: "available",
    condition: "Very good",
    measurements: "Size L",
    price: 32000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 33,
    title: "Beanie",
    description: "Warm beanie.\nWool blend.",
    state: "reserved",
    condition: "Excellent",
    measurements: "One size",
    price: 18000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 34,
    title: "Gloves",
    description: "Thermal gloves.\nWaterproof.",
    state: "available",
    condition: "Excellent",
    measurements: "One size",
    price: 20000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 35,
    title: "Handkerchief",
    description: "Cotton handkerchief.\nClassic pattern.",
    state: "sold",
    condition: "Good",
    measurements: "One size",
    price: 8000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 36,
    title: "Suspenders",
    description: "Vintage suspenders.\nAdjustable.",
    state: "available",
    condition: "Excellent",
    measurements: "One size",
    price: 15000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 37,
    title: "Bow Tie",
    description: "Silk bow tie.\nElegant design.",
    state: "paid",
    condition: "Excellent",
    measurements: "One size",
    price: 18000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 38,
    title: "Hair Clip",
    description: "Decorative hair clip.\nVintage style.",
    state: "available",
    condition: "Excellent",
    measurements: "One size",
    price: 12000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 39,
    title: "Bag",
    description: "Shoulder bag.\nSpacious design.",
    state: "delivered",
    condition: "Very good",
    measurements: "35cm x 28cm",
    price: 62000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 40,
    title: "Crossbody Bag",
    description: "Small crossbody bag.\nPerfect for travel.",
    state: "available",
    condition: "Excellent",
    measurements: "20cm x 18cm",
    price: 45000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 41,
    title: "Tote Bag",
    description: "Large tote bag.\nGreat for shopping.",
    state: "reserved",
    condition: "Excellent",
    measurements: "40cm x 35cm",
    price: 38000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 42,
    title: "Backpack",
    description: "Everyday backpack.\nMultiple compartments.",
    state: "available",
    condition: "Very good",
    measurements: "35cm x 25cm",
    price: 52000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 43,
    title: "Clutch",
    description: "Evening clutch.\nElegant design.",
    state: "sold",
    condition: "Good",
    measurements: "25cm x 15cm",
    price: 42000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 44,
    title: "Briefcase",
    description: "Professional briefcase.\nLeather construction.",
    state: "available",
    condition: "Very good",
    measurements: "45cm x 35cm",
    price: 78000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 45,
    title: "Duffle Bag",
    description: "Travel duffle bag.\nWaterproof material.",
    state: "paid",
    condition: "Excellent",
    measurements: "50cm x 30cm",
    price: 65000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 46,
    title: "Suitcase",
    description: "Carry-on suitcase.\nDurable wheels.",
    state: "available",
    condition: "Excellent",
    measurements: "55cm x 40cm",
    price: 95000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 47,
    title: "Messenger Bag",
    description: "Shoulder messenger bag.\nCanvas material.",
    state: "delivered",
    condition: "Very good",
    measurements: "38cm x 28cm",
    price: 52000,
    images: ["/images/chaqueta.jpg"]
  },
  {
    id: 48,
    title: "Evening Bag",
    description: "Elegant evening bag.\nBeaded design.",
    state: "available",
    condition: "Excellent",
    measurements: "22cm x 12cm",
    price: 48000,
    images: ["/images/mochila.jpg"]
  },
  {
    id: 49,
    title: "School Bag",
    description: "Spacious school bag.\nErgonomic straps.",
    state: "reserved",
    condition: "Good",
    measurements: "40cm x 30cm",
    price: 35000,
    images: ["/images/zapas1.jpg"]
  },
  {
    id: 50,
    title: "Vintage Leather Satchel",
    description: "Authentic vintage satchel.\nFull grain leather.",
    state: "available",
    condition: "Very good",
    measurements: "38cm x 28cm",
    price: 85000,
    images: ["/images/chaqueta.jpg"]
  }
];

export default products;
