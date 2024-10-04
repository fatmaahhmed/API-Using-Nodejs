/*
  Warnings:

  - You are about to drop the `WishList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WishList";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "wishList" (
    "wishlist_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "wishList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "wishList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "wishList_product_id_idx" ON "wishList"("product_id");

-- CreateIndex
CREATE INDEX "wishList_user_id_idx" ON "wishList"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishList_wishlist_id_product_id_user_id_key" ON "wishList"("wishlist_id", "product_id", "user_id");
