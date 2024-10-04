/*
  Warnings:

  - You are about to drop the column `user_id` on the `Category` table. All the data in the column will be lost.
  - Added the required column `user` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "parent_id" INTEGER,
    "user" INTEGER NOT NULL,
    CONSTRAINT "Category_user_fkey" FOREIGN KEY ("user") REFERENCES "Admin" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("category_id", "category_name", "parent_id") SELECT "category_id", "category_name", "parent_id" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_category_id_key" ON "Category"("category_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
