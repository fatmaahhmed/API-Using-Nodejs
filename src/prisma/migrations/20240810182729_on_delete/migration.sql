-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "parent_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("category_id", "category_name", "parent_id", "user_id") SELECT "category_id", "category_name", "parent_id", "user_id" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_category_name_key" ON "Category"("category_name");
CREATE TABLE "new_Product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "category_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("category_id", "description", "name", "price", "product_id", "user_id") SELECT "category_id", "description", "name", "price", "product_id", "user_id" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
CREATE TABLE "new_WishList" (
    "wishlist_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "category_id" INTEGER,
    "product_name" TEXT NOT NULL,
    CONSTRAINT "WishList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WishList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WishList_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WishList" ("category_id", "product_id", "product_name", "user_id", "wishlist_id") SELECT "category_id", "product_id", "product_name", "user_id", "wishlist_id" FROM "WishList";
DROP TABLE "WishList";
ALTER TABLE "new_WishList" RENAME TO "WishList";
CREATE UNIQUE INDEX "WishList_product_id_user_id_key" ON "WishList"("product_id", "user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
