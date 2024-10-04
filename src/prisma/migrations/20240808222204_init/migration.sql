/*
  Warnings:

  - You are about to drop the column `product_name` on the `WishList` table. All the data in the column will be lost.
  - Added the required column `category_name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `category_id` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_id` on table `WishList` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "parent_id" INTEGER
);
INSERT INTO "new_Category" ("category_id", "category_name", "parent_id") SELECT "category_id", "category_name", "parent_id" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_category_name_key" ON "Category"("category_name");
CREATE INDEX "Category_parent_id_idx" ON "Category"("parent_id");
CREATE TABLE "new_Product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category_name" TEXT NOT NULL,
    CONSTRAINT "Product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("category_id", "description", "name", "price", "product_id", "user_id") SELECT "category_id", "description", "name", "price", "product_id", "user_id" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
CREATE TABLE "new_User" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "token" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_User" ("email", "name", "password", "role", "token", "user_id", "username") SELECT "email", "name", "password", "role", coalesce("token", '') AS "token", "user_id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_WishList" (
    "wishlist_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "WishList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WishList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("product_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WishList" ("product_id", "user_id", "wishlist_id") SELECT "product_id", "user_id", "wishlist_id" FROM "WishList";
DROP TABLE "WishList";
ALTER TABLE "new_WishList" RENAME TO "WishList";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
