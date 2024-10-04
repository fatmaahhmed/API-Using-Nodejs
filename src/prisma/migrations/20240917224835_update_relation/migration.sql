/*
  Warnings:

  - You are about to drop the column `manufacturer` on the `Product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "reviews_count" INTEGER NOT NULL,
    "is_best_seller" BOOLEAN NOT NULL,
    "is_on_sale" BOOLEAN NOT NULL,
    "sale_start_date" DATETIME NOT NULL,
    "sale_end_date" DATETIME NOT NULL,
    "discount_price" REAL NOT NULL,
    "category_id" INTEGER,
    "subcategory_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "SubCategory" ("subcategory_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("brand", "category_id", "description", "discount_price", "is_best_seller", "is_on_sale", "name", "price", "product_id", "quantity", "rating", "reviews_count", "sale_end_date", "sale_start_date", "subcategory_id", "user_id") SELECT "brand", "category_id", "description", "discount_price", "is_best_seller", "is_on_sale", "name", "price", "product_id", "quantity", "rating", "reviews_count", "sale_end_date", "sale_start_date", "subcategory_id", "user_id" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
