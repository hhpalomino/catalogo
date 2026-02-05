/*
  Warnings:

  - You are about to drop the column `estado` on the `Product` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/

-- Step 1: Create ProductStatus table
CREATE TABLE "ProductStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductStatus_pkey" PRIMARY KEY ("id")
);

-- Step 2: Create unique index
CREATE UNIQUE INDEX "ProductStatus_name_key" ON "ProductStatus"("name");

-- Step 3: Insert initial statuses
INSERT INTO "ProductStatus" ("id", "name", "displayName", "color", "displayOrder", "isActive", "isDefault", "createdAt", "updatedAt")
VALUES 
  ('status_pendiente_001', 'pendiente', 'Pendiente', '#FFA500', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('status_disponible_002', 'disponible', 'Disponible', '#10B981', 2, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('status_vendido_003', 'vendido', 'Vendido', '#EF4444', 3, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Step 4: Add statusId column as nullable first
ALTER TABLE "Product" ADD COLUMN "statusId" TEXT;

-- Step 5: Populate statusId based on existing estado values
UPDATE "Product" 
SET "statusId" = (
  SELECT "id" FROM "ProductStatus" 
  WHERE "ProductStatus"."name" = "Product"."estado"
);

-- Step 6: Handle any products with "agotado" estado (map to "vendido")
UPDATE "Product" 
SET "statusId" = 'status_vendido_003'
WHERE "estado" = 'agotado' AND "statusId" IS NULL;

-- Step 7: Make statusId required (NOT NULL)
ALTER TABLE "Product" ALTER COLUMN "statusId" SET NOT NULL;

-- Step 8: Drop old estado column
ALTER TABLE "Product" DROP COLUMN "estado";

-- Step 9: Add foreign key constraint
ALTER TABLE "Product" ADD CONSTRAINT "Product_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ProductStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
