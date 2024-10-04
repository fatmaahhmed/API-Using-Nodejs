/*
  Warnings:

  - You are about to drop the `brand` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "brand_brand_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "brand";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "reviews_count" INTEGER NOT NULL,
    "is_best_seller" BOOLEAN NOT NULL,
    "is_on_sale" BOOLEAN NOT NULL,
    "sale_start_date" DATETIME NOT NULL,
    "sale_end_date" DATETIME NOT NULL,
    "discount_price" REAL NOT NULL,
    "category_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_product" ("brand_id", "category_id", "description", "discount_price", "is_best_seller", "is_on_sale", "price", "product_id", "product_name", "quantity", "rating", "reviews_count", "sale_end_date", "sale_start_date", "user_id") SELECT "brand_id", "category_id", "description", "discount_price", "is_best_seller", "is_on_sale", "price", "product_id", "product_name", "quantity", "rating", "reviews_count", "sale_end_date", "sale_start_date", "user_id" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE UNIQUE INDEX "product_product_name_key" ON "product"("product_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
