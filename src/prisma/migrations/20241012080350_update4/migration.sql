-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "in_stock" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "color" TEXT NOT NULL DEFAULT '',
    "brand_name" TEXT NOT NULL DEFAULT '',
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
    CONSTRAINT "product_brand_name_fkey" FOREIGN KEY ("brand_name") REFERENCES "brand" ("brand_name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("category_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_product" ("brand_name", "category_id", "color", "createdAt", "description", "discount_price", "is_best_seller", "is_on_sale", "price", "product_id", "product_name", "quantity", "rating", "reviews_count", "sale_end_date", "sale_start_date", "slug", "updatedAt", "user_id") SELECT "brand_name", "category_id", "color", "createdAt", "description", "discount_price", "is_best_seller", "is_on_sale", "price", "product_id", "product_name", "quantity", "rating", "reviews_count", "sale_end_date", "sale_start_date", "slug", "updatedAt", "user_id" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE UNIQUE INDEX "product_product_name_key" ON "product"("product_name");
CREATE INDEX "product_slug_idx" ON "product"("slug");
CREATE INDEX "product_category_id_idx" ON "product"("category_id");
CREATE INDEX "product_user_id_idx" ON "product"("user_id");
CREATE INDEX "product_is_best_seller_idx" ON "product"("is_best_seller");
CREATE INDEX "product_is_on_sale_idx" ON "product"("is_on_sale");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
