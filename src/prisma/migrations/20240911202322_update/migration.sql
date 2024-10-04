/*
  Warnings:

  - You are about to drop the `_ProductToWishList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `wishListId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_ProductToWishList_B_index";

-- DropIndex
DROP INDEX "_ProductToWishList_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProductToWishList";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'User',
    "productId" INTEGER
);
INSERT INTO "new_User" ("email", "name", "password", "productId", "role", "token", "user_id", "username") SELECT "email", "name", "password", "productId", "role", "token", "user_id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_WishList" (
    "wishlist_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "WishList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WishList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WishList" ("product_id", "user_id", "wishlist_id") SELECT "product_id", "user_id", "wishlist_id" FROM "WishList";
DROP TABLE "WishList";
ALTER TABLE "new_WishList" RENAME TO "WishList";
CREATE INDEX "WishList_product_id_idx" ON "WishList"("product_id");
CREATE INDEX "WishList_user_id_idx" ON "WishList"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
