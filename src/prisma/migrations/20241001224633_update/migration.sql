/*
  Warnings:

  - Added the required column `user_id` to the `brand` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_brand" (
    "brand_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL
);
INSERT INTO "new_brand" ("brand_id", "brand_name") SELECT "brand_id", "brand_name" FROM "brand";
DROP TABLE "brand";
ALTER TABLE "new_brand" RENAME TO "brand";
CREATE UNIQUE INDEX "brand_brand_name_key" ON "brand"("brand_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
