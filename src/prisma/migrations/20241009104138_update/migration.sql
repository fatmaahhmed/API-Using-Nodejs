-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cart" (
    "cart_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "cartItem_id" INTEGER NOT NULL DEFAULT 0,
    "total" REAL NOT NULL DEFAULT 0,
    "total_with_copon" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cart" ("cart_id", "createdAt", "status", "total", "total_with_copon", "updatedAt", "user_id") SELECT "cart_id", "createdAt", "status", "total", "total_with_copon", "updatedAt", "user_id" FROM "cart";
DROP TABLE "cart";
ALTER TABLE "new_cart" RENAME TO "cart";
CREATE UNIQUE INDEX "cart_user_id_key" ON "cart"("user_id");
CREATE INDEX "cart_user_id_idx" ON "cart"("user_id");
CREATE TABLE "new_copon" (
    "copon_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "copon_code" TEXT NOT NULL,
    "discount" REAL NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "number_of_available_copons" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "copon_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_copon" ("copon_code", "copon_id", "discount", "end_date", "is_active", "start_date", "user_id") SELECT "copon_code", "copon_id", "discount", "end_date", "is_active", "start_date", "user_id" FROM "copon";
DROP TABLE "copon";
ALTER TABLE "new_copon" RENAME TO "copon";
CREATE UNIQUE INDEX "copon_copon_code_key" ON "copon"("copon_code");
CREATE INDEX "copon_user_id_idx" ON "copon"("user_id");
CREATE INDEX "copon_copon_code_idx" ON "copon"("copon_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
