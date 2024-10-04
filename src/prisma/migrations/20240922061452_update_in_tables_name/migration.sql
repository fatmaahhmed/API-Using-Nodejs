/*
  Warnings:

  - You are about to drop the column `user` on the `category` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_category" ("category_id", "category_name") SELECT "category_id", "category_name" FROM "category";
DROP TABLE "category";
ALTER TABLE "new_category" RENAME TO "category";
CREATE UNIQUE INDEX "category_category_id_key" ON "category"("category_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
