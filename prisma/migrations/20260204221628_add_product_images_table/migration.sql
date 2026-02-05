/*
  Warnings:

  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.

*/

-- Step 1: Create ProductImage table
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- Step 2: Create index on productId for better performance
CREATE INDEX "ProductImage_productId_idx" ON "ProductImage"("productId");

-- Step 3: Migrate images from Product table to ProductImage table
-- Split comma-separated images and create individual ProductImage records
INSERT INTO "ProductImage" ("id", "productId", "imageUrl", "isMain", "displayOrder", "createdAt", "updatedAt")
SELECT 
  gen_random_uuid()::text,
  p."id",
  TRIM(image_url),
  ROW_NUMBER() OVER (PARTITION BY p."id" ORDER BY image_url) = 1,
  ROW_NUMBER() OVER (PARTITION BY p."id" ORDER BY image_url) - 1,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Product" p,
LATERAL UNNEST(STRING_TO_ARRAY(p."images", ',')) AS image_url
WHERE p."images" IS NOT NULL AND p."images" != '';

-- Step 4: Add foreign key constraint
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 5: Drop the images column from Product
ALTER TABLE "Product" DROP COLUMN "images";
