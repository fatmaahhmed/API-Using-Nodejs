/*
  Warnings:

  - Added the required column `subtotal_with_copon` to the `cartItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cartItem" (
    "cartItem_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unit_price" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    "subtotal_with_copon" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "copon_id" INTEGER,
    CONSTRAINT "cartItem_copon_id_fkey" FOREIGN KEY ("copon_id") REFERENCES "copon" ("copon_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "cartItem_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart" ("cart_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cartItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cartItem" ("cartItem_id", "cart_id", "copon_id", "createdAt", "product_id", "quantity", "subtotal", "unit_price", "updatedAt") SELECT "cartItem_id", "cart_id", "copon_id", "createdAt", "product_id", "quantity", "subtotal", "unit_price", "updatedAt" FROM "cartItem";
DROP TABLE "cartItem";
ALTER TABLE "new_cartItem" RENAME TO "cartItem";
CREATE INDEX "cartItem_cart_id_idx" ON "cartItem"("cart_id");
CREATE INDEX "cartItem_product_id_idx" ON "cartItem"("product_id");
CREATE INDEX "cartItem_copon_id_idx" ON "cartItem"("copon_id");
CREATE UNIQUE INDEX "cartItem_cart_id_product_id_key" ON "cartItem"("cart_id", "product_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
