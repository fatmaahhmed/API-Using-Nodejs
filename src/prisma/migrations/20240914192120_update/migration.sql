/*
  Warnings:

  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_best_seller` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_on_sale` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturer` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews_count` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_end_date` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_start_date` to the `Product` table without a default value. This is not possible if the table is not empty.

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
    "manufacturer" TEXT NOT NULL,
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
INSERT INTO "new_Product" ("category_id", "description", "name", "price", "product_id", "subcategory_id", "user_id") SELECT "category_id", "description", "name", "price", "product_id", "subcategory_id", "user_id" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
