import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Create admin user if it doesn't exist
async function seedAdmin() {
  const adminExists = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("admin", 10);
    await prisma.user.create({
      data: {
        username: "admin",
        email: "admin@example.com",
        passwordHash: hashedPassword,
        role: "admin",
      },
    });
    console.log("✓ Admin user created (username: admin, password: admin)");
  } else {
    console.log("✓ Admin user already exists");
  }
}

// Datos de productos - ahora se crean desde la interfaz de admin
// const productsData = [
/*
  {...}];
  {
    title: "Urban Sneakers",
    description: "Urban sneakers with very little use.\nComfortable and clean.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "Size 42",
    price: 45000,
    images: "/images/zapas1.jpg,/images/zapas2.jpg"
  },
  {
    title: "Black Jacket",
    description: "Waterproof jacket.\nUsed but in good condition.",
    estado: "agotado",
    entregado: true,
    pagado: true,
    condition: "Good",
    measurements: "Size M",
    price: 60000,
    images: "/images/chaqueta.jpg"
  },
  {
    title: "Outdoor Backpack",
    description: "30L backpack.\nIdeal for hiking.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Very good",
    measurements: "30 liters",
    price: 38000,
    images: "/images/mochila.jpg"
  },
  {
    title: "Vintage Camera",
    description: "Classic film camera from the 1980s.\nFully functional.",
    estado: "pendiente",
    entregado: false,
    pagado: false,
    condition: "Good",
    measurements: "20cm x 15cm",
    price: 75000,
    images: "/images/camara.jpg"
  },
  {
    title: "Leather Wallet",
    description: "Genuine leather wallet.\nMultiple compartments.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Very good",
    measurements: "12cm x 10cm",
    price: 25000,
    images: "/images/wallet.jpg"
  },
  {
    title: "Running Shoes",
    description: "Professional running shoes.\nBarely worn.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "Size 41",
    price: 55000,
    images: "/images/running.jpg"
  },
  {
    title: "Desk Lamp",
    description: "LED desk lamp.\nAdjustable brightness.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "45cm height",
    price: 28000,
    images: "/images/lamp.jpg"
  },
  {
    title: "Wireless Headphones",
    description: "Bluetooth headphones with noise cancellation.\nLike new.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "Standard",
    price: 120000,
    images: "/images/headphones.jpg"
  },
  {
    title: "Coffee Table",
    description: "Modern coffee table.\nWood and metal design.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "100cm x 60cm x 45cm",
    price: 150000,
    images: "/images/table.jpg"
  },
  {
    title: "Bicycle Helmet",
    description: "Safety bike helmet.\nVery good condition.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Very good",
    measurements: "Standard size",
    price: 35000,
    images: "/images/helmet.jpg"
  },
  {
    title: "Skateboard",
    description: "Professional skateboard.\nGood condition.",
    estado: "agotado",
    entregado: true,
    pagado: true,
    condition: "Good",
    measurements: "Standard",
    price: 65000,
    images: "/images/skateboard.jpg"
  },
  {
    title: "Wall Clock",
    description: "Minimalist wall clock.\nQuartz mechanism.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "30cm diameter",
    price: 18000,
    images: "/images/clock.jpg"
  },
  {
    title: "Portable Speaker",
    description: "Waterproof portable speaker.\nGreat sound.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "15cm x 10cm",
    price: 48000,
    images: "/images/speaker.jpg"
  },
  {
    title: "Yoga Mat",
    description: "Non-slip yoga mat.\nGood condition.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Very good",
    measurements: "180cm x 60cm",
    price: 22000,
    images: "/images/yogamat.jpg"
  },
  {
    title: "Smart Watch",
    description: "Fitness tracker smartwatch.\nBarely used.",
    estado: "pendiente",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "Standard",
    price: 89000,
    images: "/images/smartwatch.jpg"
  },
  {
    title: "Vintage Vinyl Record",
    description: "Classic rock vinyl record.\nGreat condition.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "Standard LP",
    price: 32000,
    images: "/images/vinyl.jpg"
  },
  {
    title: "Board Game",
    description: "Modern strategy board game.\nComplete set.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "30cm x 20cm x 8cm",
    price: 42000,
    images: "/images/boardgame.jpg"
  },
  {
    title: "Phone Stand",
    description: "Adjustable phone stand.\nStainless steel.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "15cm height",
    price: 12000,
    images: "/images/phonestand.jpg"
  },
  {
    title: "Portable Hard Drive",
    description: "1TB external hard drive.\nFully functional.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Very good",
    measurements: "12cm x 8cm x 2cm",
    price: 52000,
    images: "/images/harddrive.jpg"
  },
  {
    title: "Winter Scarf",
    description: "Wool winter scarf.\nWarm and cozy.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "200cm length",
    price: 19000,
    images: "/images/scarf.jpg"
  },
  {
    title: "Desk Organizer",
    description: "Bamboo desk organizer.\nMultiple compartments.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "30cm x 20cm",
    price: 24000,
    images: "/images/organizer.jpg"
  },
  {
    title: "USB-C Cable",
    description: "High quality USB-C cable.\nDurable and fast.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "2 meters",
    price: 8000,
    images: "/images/cable.jpg"
  },
  {
    title: "Sunglasses",
    description: "UV protection sunglasses.\nStyleish frame.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "Standard",
    price: 45000,
    images: "/images/sunglasses.jpg"
  },
  {
    title: "Decorative Plant Pot",
    description: "Ceramic plant pot.\nPerfect for decoration.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "20cm diameter",
    price: 15000,
    images: "/images/pot.jpg"
  },
  {
    title: "Water Bottle",
    description: "Insulated water bottle.\nKeeps drinks cold.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Very good",
    measurements: "750ml",
    price: 28000,
    images: "/images/bottle.jpg"
  },
  {
    title: "Notebook Set",
    description: "Set of quality notebooks.\nBlank pages.",
    estado: "agotado",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "A5 size",
    price: 18000,
    images: "/images/notebook.jpg"
  },
  {
    title: "Desk Fan",
    description: "Quiet desk fan.\nAdjustable speed.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "20cm",
    price: 32000,
    images: "/images/fan.jpg"
  },
  {
    title: "Bluetooth Speaker",
    description: "Compact bluetooth speaker.\nGreat bass.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Very good",
    measurements: "10cm x 10cm",
    price: 35000,
    images: "/images/btspeaker.jpg"
  },
  {
    title: "Phone Case",
    description: "Protective phone case.\nReinforced corners.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "15cm x 8cm",
    price: 12000,
    images: "/images/case.jpg"
  },
  {
    title: "Key Organizer",
    description: "Smart key organizer.\nTrackable.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "5cm x 3cm",
    price: 22000,
    images: "/images/keyorg.jpg"
  },
  {
    title: "Desk Chair Cushion",
    description: "Ergonomic chair cushion.\nMemory foam.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "40cm x 40cm",
    price: 38000,
    images: "/images/cushion.jpg"
  },
  {
    title: "Workout Gloves",
    description: "Padded workout gloves.\nComfortable fit.",
    estado: "pendiente",
    entregado: false,
    pagado: false,
    condition: "Very good",
    measurements: "Size M",
    price: 19000,
    images: "/images/gloves.jpg"
  },
  {
    title: "Screen Protector",
    description: "Tempered glass screen protector.\nEasy install.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "6.5 inch",
    price: 10000,
    images: "/images/protector.jpg"
  },
  {
    title: "Desk Lamp Bulb",
    description: "LED bulb replacement.\nEnergy efficient.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "E27",
    price: 6000,
    images: "/images/bulb.jpg"
  },
  {
    title: "Cable Organizer",
    description: "Silicone cable organizer clips.\nPack of 5.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "5cm diameter",
    price: 7000,
    images: "/images/cableorg.jpg"
  },
  {
    title: "Phone Charger",
    description: "Fast charging phone charger.\nQC 3.0.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "Standard",
    price: 22000,
    images: "/images/charger.jpg"
  },
  {
    title: "Laptop Stand",
    description: "Adjustable laptop stand.\nAluminum.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Very good",
    measurements: "30cm width",
    price: 45000,
    images: "/images/lapstand.jpg"
  },
  {
    title: "Mouse Pad",
    description: "Extended mouse pad.\nSmooth surface.",
    estado: "agotado",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "80cm x 30cm",
    price: 16000,
    images: "/images/mousepad.jpg"
  },
  {
    title: "USB Hub",
    description: "4-port USB hub.\nCompact design.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "10cm width",
    price: 18000,
    images: "/images/hub.jpg"
  },
  {
    title: "Wireless Mouse",
    description: "Ergonomic wireless mouse.\nQuiet clicks.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Very good",
    measurements: "6cm x 7cm",
    price: 25000,
    images: "/images/mouse.jpg"
  },
  {
    title: "Desk Tidy",
    description: "Wooden desk tidy organizer.\nMultiple slots.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "25cm x 12cm",
    price: 21000,
    images: "/images/tidy.jpg"
  },
  {
    title: "Reading Light",
    description: "Clip-on reading light.\nAdjustable angle.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "20cm",
    price: 26000,
    images: "/images/readlight.jpg"
  },
  {
    title: "Document Holder",
    description: "Acrylic document holder.\nStandard size.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "25cm x 15cm",
    price: 14000,
    images: "/images/dochold.jpg"
  },
  {
    title: "Power Bank",
    description: "20000mAh power bank.\nFast charging.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Very good",
    measurements: "12cm x 7cm",
    price: 42000,
    images: "/images/powerbank.jpg"
  },
  {
    title: "HDMI Cable",
    description: "High speed HDMI cable.\n4K compatible.",
    estado: "disponible",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "2 meters",
    price: 11000,
    images: "/images/hdmi.jpg"
  },
  {
    title: "Monitor Stand",
    description: "Adjustable monitor stand.\nRiser.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "40cm width",
    price: 35000,
    images: "/images/monstand.jpg"
  },
  {
    title: "Keyboard Wrist Rest",
    description: "Gel keyboard wrist rest.\nComfortable.",
    estado: "pendiente",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "50cm x 8cm",
    price: 18000,
    images: "/images/wristrest.jpg"
  },
  {
    title: "Desk Pad",
    description: "Large desk pad.\nLeather surface.",
    estado: "disponible",
    entregado: true,
    pagado: true,
    condition: "Excellent",
    measurements: "100cm x 50cm",
    price: 48000,
    images: "/images/deskpad.jpg"
  }
];*/

// Removed products data - they are created from admin interface

async function main() {
  console.log("🌱 Comenzando a sembrear la base de datos...");
  
  // Seed admin user
  await seedAdmin();

  // Seed product statuses
  const statuses = [
    { name: "pendiente", displayName: "Pendiente", color: "#FFA500", displayOrder: 1, isDefault: true },
    { name: "disponible", displayName: "Disponible", color: "#10B981", displayOrder: 2 },
    { name: "vendido", displayName: "Vendido", color: "#EF4444", displayOrder: 3 },
  ];

  for (const status of statuses) {
    await prisma.productStatus.upsert({
      where: { name: status.name },
      update: {},
      create: status,
    });
  }
  console.log("✓ Product statuses created/verified");
  
  // Get default status for products
  const defaultStatus = await prisma.productStatus.findUnique({
    where: { name: "disponible" },
  });

  if (!defaultStatus) {
    console.error("❌ Default status not found");
    process.exit(1);
  }
  
  // Limpiar productos existentes (esto también eliminará las imágenes por cascada)
  await prisma.product.deleteMany();
  console.log("🗑️ Productos anteriores eliminados");
  
  // Insertar nuevos productos - simplificado sin imágenes en seed
  console.log("✅ Base de datos lista para usar");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
