/*
  Warnings:

  - Added the required column `SubCategory_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `category_id` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "SubCategory" (
    "subcategory_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subcategory_name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    CONSTRAINT "SubCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "parent_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Admin" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("category_id", "category_name", "parent_id", "user_id") SELECT "category_id", "category_name", "parent_id", "user_id" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_category_id_key" ON "Category"("category_id");
CREATE TABLE "new_Product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "SubCategory_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "SubCategory" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("category_id", "description", "name", "price", "product_id", "user_id") SELECT "category_id", "description", "name", "price", "product_id", "user_id" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_subcategory_name_key" ON "SubCategory"("subcategory_name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_category_id_key" ON "SubCategory"("category_id");
