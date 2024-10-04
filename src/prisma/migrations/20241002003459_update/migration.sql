-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_brand" (
    "brand_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "brand_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_brand" ("brand_id", "brand_name", "user_id") SELECT "brand_id", "brand_name", "user_id" FROM "brand";
DROP TABLE "brand";
ALTER TABLE "new_brand" RENAME TO "brand";
CREATE UNIQUE INDEX "brand_brand_name_key" ON "brand"("brand_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
