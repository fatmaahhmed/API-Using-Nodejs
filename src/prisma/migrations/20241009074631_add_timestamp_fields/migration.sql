/*
  Warnings:

  - You are about to drop the column `product_id` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `cart_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `subtotal` to the `cartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `cartItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_brand" (
    "brand_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand_name" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "brand_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_brand" ("brand_id", "brand_name", "slug", "user_id") SELECT "brand_id", "brand_name", "slug", "user_id" FROM "brand";
DROP TABLE "brand";
ALTER TABLE "new_brand" RENAME TO "brand";
CREATE UNIQUE INDEX "brand_slug_key" ON "brand"("slug");
CREATE INDEX "brand_slug_idx" ON "brand"("slug");
CREATE INDEX "brand_user_id_idx" ON "brand"("user_id");
CREATE TABLE "new_cart" (
    "cart_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "total" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cart" ("cart_id", "user_id") SELECT "cart_id", "user_id" FROM "cart";
DROP TABLE "cart";
ALTER TABLE "new_cart" RENAME TO "cart";
CREATE UNIQUE INDEX "cart_user_id_key" ON "cart"("user_id");
CREATE INDEX "cart_user_id_idx" ON "cart"("user_id");
CREATE TABLE "new_cartItem" (
    "cartItem_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unit_price" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "copon_id" INTEGER,
    CONSTRAINT "cartItem_copon_id_fkey" FOREIGN KEY ("copon_id") REFERENCES "copon" ("copon_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "cartItem_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart" ("cart_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cartItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cartItem" ("cartItem_id", "cart_id", "product_id", "quantity") SELECT "cartItem_id", "cart_id", "product_id", "quantity" FROM "cartItem";
DROP TABLE "cartItem";
ALTER TABLE "new_cartItem" RENAME TO "cartItem";
CREATE INDEX "cartItem_cart_id_idx" ON "cartItem"("cart_id");
CREATE INDEX "cartItem_product_id_idx" ON "cartItem"("product_id");
CREATE INDEX "cartItem_copon_id_idx" ON "cartItem"("copon_id");
CREATE UNIQUE INDEX "cartItem_cart_id_product_id_key" ON "cartItem"("cart_id", "product_id");
CREATE TABLE "new_category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "user_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "category" ("category_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_category" ("category_id", "category_name", "parent_id", "slug", "user_id") SELECT "category_id", "category_name", "parent_id", "slug", "user_id" FROM "category";
DROP TABLE "category";
ALTER TABLE "new_category" RENAME TO "category";
CREATE UNIQUE INDEX "category_category_id_key" ON "category"("category_id");
CREATE UNIQUE INDEX "category_category_name_key" ON "category"("category_name");
CREATE INDEX "category_slug_idx" ON "category"("slug");
CREATE INDEX "category_parent_id_idx" ON "category"("parent_id");
CREATE INDEX "category_user_id_idx" ON "category"("user_id");
CREATE TABLE "new_copon" (
    "copon_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "copon_code" TEXT NOT NULL,
    "discount" REAL NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "copon_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_copon" ("copon_code", "copon_id", "discount", "end_date", "start_date", "user_id") SELECT "copon_code", "copon_id", "discount", "end_date", "start_date", "user_id" FROM "copon";
DROP TABLE "copon";
ALTER TABLE "new_copon" RENAME TO "copon";
CREATE UNIQUE INDEX "copon_copon_code_key" ON "copon"("copon_code");
CREATE INDEX "copon_user_id_idx" ON "copon"("user_id");
CREATE INDEX "copon_copon_code_idx" ON "copon"("copon_code");
CREATE TABLE "new_order" (
    "order_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "time_to_deliver" DATETIME NOT NULL,
    "total_price" REAL NOT NULL,
    "order_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_order" ("order_date", "order_id", "product_id", "quantity", "time_to_deliver", "total_price", "user_id") SELECT "order_date", "order_id", "product_id", "quantity", "time_to_deliver", "total_price", "user_id" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
CREATE INDEX "order_user_id_idx" ON "order"("user_id");
CREATE INDEX "order_product_id_idx" ON "order"("product_id");
CREATE INDEX "order_order_date_idx" ON "order"("order_date");
CREATE TABLE "new_product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "reviews_count" INTEGER NOT NULL DEFAULT 0,
    "is_best_seller" BOOLEAN NOT NULL DEFAULT false,
    "is_on_sale" BOOLEAN NOT NULL DEFAULT false,
    "sale_start_date" DATETIME,
    "sale_end_date" DATETIME,
    "discount_price" REAL,
    "category_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand" ("brand_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("category_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_product" ("brand_id", "category_id", "description", "discount_price", "is_best_seller", "is_on_sale", "price", "product_id", "product_name", "quantity", "rating", "reviews_count", "sale_end_date", "sale_start_date", "slug", "user_id") SELECT "brand_id", "category_id", "description", "discount_price", "is_best_seller", "is_on_sale", "price", "product_id", "product_name", "quantity", "rating", "reviews_count", "sale_end_date", "sale_start_date", "slug", "user_id" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE UNIQUE INDEX "product_product_name_key" ON "product"("product_name");
CREATE INDEX "product_slug_idx" ON "product"("slug");
CREATE INDEX "product_brand_id_idx" ON "product"("brand_id");
CREATE INDEX "product_category_id_idx" ON "product"("category_id");
CREATE INDEX "product_user_id_idx" ON "product"("user_id");
CREATE INDEX "product_is_best_seller_idx" ON "product"("is_best_seller");
CREATE INDEX "product_is_on_sale_idx" ON "product"("is_on_sale");
CREATE TABLE "new_review" (
    "review_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "content" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_review" ("created_at", "product_id", "rating", "review_id", "updated_at", "user_id") SELECT "created_at", "product_id", "rating", "review_id", "updated_at", "user_id" FROM "review";
DROP TABLE "review";
ALTER TABLE "new_review" RENAME TO "review";
CREATE INDEX "review_product_id_idx" ON "review"("product_id");
CREATE INDEX "review_user_id_idx" ON "review"("user_id");
CREATE TABLE "new_user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'User',
    "verificationCode" TEXT NOT NULL DEFAULT '',
    "verification_code_expires" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("email", "name", "password", "role", "token", "user_id", "username", "verificationCode", "verification_code_expires", "verified") SELECT "email", "name", "password", "role", "token", "user_id", "username", "verificationCode", "verification_code_expires", "verified" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE INDEX "user_email_idx" ON "user"("email");
CREATE INDEX "user_username_idx" ON "user"("username");
CREATE TABLE "new_wishList" (
    "wishlist_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "wishList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "wishList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_wishList" ("product_id", "user_id", "wishlist_id") SELECT "product_id", "user_id", "wishlist_id" FROM "wishList";
DROP TABLE "wishList";
ALTER TABLE "new_wishList" RENAME TO "wishList";
CREATE INDEX "wishList_product_id_idx" ON "wishList"("product_id");
CREATE INDEX "wishList_user_id_idx" ON "wishList"("user_id");
CREATE UNIQUE INDEX "wishList_wishlist_id_product_id_user_id_key" ON "wishList"("wishlist_id", "product_id", "user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
