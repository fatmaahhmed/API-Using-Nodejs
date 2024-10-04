/*
  Warnings:

  - A unique constraint covering the columns `[wishlist_id,product_id,user_id]` on the table `WishList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WishList_wishlist_id_product_id_user_id_key" ON "WishList"("wishlist_id", "product_id", "user_id");
