/*
  Warnings:

  - You are about to drop the column `copon_id` on the `cartItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cart" (
    "cart_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "copon_id" INTEGER,
    "cartItem_id" INTEGER NOT NULL DEFAULT 0,
    "total_price" REAL NOT NULL DEFAULT 0,
    "total_with_copon" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cart_copon_id_fkey" FOREIGN KEY ("copon_id") REFERENCES "copon" ("copon_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cart" ("cartItem_id", "cart_id", "createdAt", "status", "total_price", "total_with_copon", "updatedAt", "user_id") SELECT "cartItem_id", "cart_id", "createdAt", "status", "total_price", "total_with_copon", "updatedAt", "user_id" FROM "cart";
DROP TABLE "cart";
ALTER TABLE "new_cart" RENAME TO "cart";
CREATE UNIQUE INDEX "cart_user_id_key" ON "cart"("user_id");
CREATE INDEX "cart_user_id_idx" ON "cart"("user_id");
CREATE TABLE "new_cartItem" (
    "cartItem_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unit_price" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cartItem_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart" ("cart_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cartItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cartItem" ("cartItem_id", "cart_id", "createdAt", "product_id", "quantity", "subtotal", "unit_price", "updatedAt") SELECT "cartItem_id", "cart_id", "createdAt", "product_id", "quantity", "subtotal", "unit_price", "updatedAt" FROM "cartItem";
DROP TABLE "cartItem";
ALTER TABLE "new_cartItem" RENAME TO "cartItem";
CREATE INDEX "cartItem_cart_id_idx" ON "cartItem"("cart_id");
CREATE INDEX "cartItem_product_id_idx" ON "cartItem"("product_id");
CREATE UNIQUE INDEX "cartItem_cart_id_product_id_key" ON "cartItem"("cart_id", "product_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
