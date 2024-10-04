-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubCategory" (
    "subcategory_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subcategory_name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    CONSTRAINT "SubCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SubCategory_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "SubCategory" ("subcategory_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SubCategory" ("category_id", "subcategory_id", "subcategory_name") SELECT "category_id", "subcategory_id", "subcategory_name" FROM "SubCategory";
DROP TABLE "SubCategory";
ALTER TABLE "new_SubCategory" RENAME TO "SubCategory";
CREATE UNIQUE INDEX "SubCategory_subcategory_name_key" ON "SubCategory"("subcategory_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
