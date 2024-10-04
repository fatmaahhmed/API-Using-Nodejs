/*
  Warnings:

  - You are about to drop the `subcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "subcategory_subcategory_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "subcategory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "review" (
    "review_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "category" ("category_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_category" ("category_id", "category_name", "user_id") SELECT "category_id", "category_name", "user_id" FROM "category";
DROP TABLE "category";
ALTER TABLE "new_category" RENAME TO "category";
CREATE UNIQUE INDEX "category_category_id_key" ON "category"("category_id");
CREATE UNIQUE INDEX "category_category_name_key" ON "category"("category_name");
CREATE TABLE "new_product" (
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
    CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_product" ("brand", "category_id", "description", "discount_price", "is_best_seller", "is_on_sale", "name", "price", "product_id", "quantity", "rating", "reviews_count", "sale_end_date", "sale_start_date", "subcategory_id", "user_id") SELECT "brand", "category_id", "description", "discount_price", "is_best_seller", "is_on_sale", "name", "price", "product_id", "quantity", "rating", "reviews_count", "sale_end_date", "sale_start_date", "subcategory_id", "user_id" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
