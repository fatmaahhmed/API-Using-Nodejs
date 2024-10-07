-- CreateTable
CREATE TABLE "user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'User',
    "verificationCode" TEXT NOT NULL DEFAULT '',
    "verification_code_expires" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verified" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "user_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    CONSTRAINT "category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "category" ("category_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "reviews_count" INTEGER NOT NULL,
    "is_best_seller" BOOLEAN NOT NULL,
    "is_on_sale" BOOLEAN NOT NULL,
    "sale_start_date" DATETIME NOT NULL,
    "sale_end_date" DATETIME NOT NULL,
    "discount_price" REAL NOT NULL,
    "category_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand" ("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order" (
    "order_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "time_to_deliver" DATETIME NOT NULL,
    "total_price" REAL NOT NULL,
    "order_date" DATETIME NOT NULL,
    CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "wishList" (
    "wishlist_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "wishList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "wishList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "review" (
    "review_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "brand" (
    "brand_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand_name" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "brand_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "category_category_id_key" ON "category"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_category_name_key" ON "category"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "product_product_name_key" ON "product"("product_name");

-- CreateIndex
CREATE INDEX "wishList_product_id_idx" ON "wishList"("product_id");

-- CreateIndex
CREATE INDEX "wishList_user_id_idx" ON "wishList"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishList_wishlist_id_product_id_user_id_key" ON "wishList"("wishlist_id", "product_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "brand_slug_key" ON "brand"("slug");
