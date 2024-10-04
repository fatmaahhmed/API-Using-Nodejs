/*
  Warnings:

  - You are about to drop the column `SubCategory_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `WishList` table. All the data in the column will be lost.
  - Added the required column `subcategory_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "SubCategory_category_id_key";

-- CreateTable
CREATE TABLE "_ProductToSubCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductToSubCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToSubCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategory" ("subcategory_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "subcategory_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
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
    "token" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'User',
    "wishListId" INTEGER,
    CONSTRAINT "User_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "WishList" ("wishlist_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "name", "password", "role", "token", "user_id", "username") SELECT "email", "name", "password", "role", "token", "user_id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_WishList" (
    "wishlist_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "category_id" INTEGER,
    "product_name" TEXT NOT NULL,
    CONSTRAINT "WishList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WishList_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WishList" ("category_id", "product_id", "product_name", "wishlist_id") SELECT "category_id", "product_id", "product_name", "wishlist_id" FROM "WishList";
DROP TABLE "WishList";
ALTER TABLE "new_WishList" RENAME TO "WishList";
CREATE UNIQUE INDEX "WishList_product_id_key" ON "WishList"("product_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSubCategory_AB_unique" ON "_ProductToSubCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSubCategory_B_index" ON "_ProductToSubCategory"("B");
