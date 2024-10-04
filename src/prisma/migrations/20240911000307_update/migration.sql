/*
  Warnings:

  - You are about to drop the column `category_id` on the `WishList` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `WishList` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "WishlistProduct" (
    "wishlistId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    PRIMARY KEY ("wishlistId", "productId"),
    CONSTRAINT "WishlistProduct_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "WishList" ("wishlist_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WishlistProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductToWishList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductToWishList_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToWishList_B_fkey" FOREIGN KEY ("B") REFERENCES "WishList" ("wishlist_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WishList" (
    "wishlist_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL
);
INSERT INTO "new_WishList" ("product_id", "wishlist_id") SELECT "product_id", "wishlist_id" FROM "WishList";
DROP TABLE "WishList";
ALTER TABLE "new_WishList" RENAME TO "WishList";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToWishList_AB_unique" ON "_ProductToWishList"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToWishList_B_index" ON "_ProductToWishList"("B");
