-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_copon" (
    "copon_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "copon_code" TEXT NOT NULL,
    "discount" REAL NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "number_of_available_copons" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "type" TEXT NOT NULL DEFAULT 'percentage',
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "copon_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_copon" ("copon_code", "copon_id", "discount", "end_date", "is_active", "number_of_available_copons", "start_date", "user_id") SELECT "copon_code", "copon_id", "discount", "end_date", "is_active", "number_of_available_copons", "start_date", "user_id" FROM "copon";
DROP TABLE "copon";
ALTER TABLE "new_copon" RENAME TO "copon";
CREATE UNIQUE INDEX "copon_copon_code_key" ON "copon"("copon_code");
CREATE INDEX "copon_user_id_idx" ON "copon"("user_id");
CREATE INDEX "copon_copon_code_idx" ON "copon"("copon_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
