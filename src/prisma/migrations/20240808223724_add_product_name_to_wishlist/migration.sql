/*
  Warnings:

  - Added the required column `product_name` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WishList" (
    "wishlist_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    CONSTRAINT "WishList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WishList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("product_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WishList" ("product_id", "user_id", "wishlist_id") SELECT "product_id", "user_id", "wishlist_id" FROM "WishList";
DROP TABLE "WishList";
ALTER TABLE "new_WishList" RENAME TO "WishList";
CREATE UNIQUE INDEX "WishList_product_id_user_id_key" ON "WishList"("product_id", "user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
