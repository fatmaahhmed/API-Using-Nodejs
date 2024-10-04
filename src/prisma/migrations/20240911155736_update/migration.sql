/*
  Warnings:

  - You are about to drop the column `parent_id` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "productId" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "user" INTEGER NOT NULL,
    CONSTRAINT "Category_user_fkey" FOREIGN KEY ("user") REFERENCES "Admin" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("category_id", "category_name", "user") SELECT "category_id", "category_name", "user" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_category_id_key" ON "Category"("category_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
