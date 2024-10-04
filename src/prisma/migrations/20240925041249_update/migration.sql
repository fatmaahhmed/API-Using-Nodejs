-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subcategory" (
    "subcategory_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subcategory_name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL DEFAULT 1,
    "parent_id" INTEGER,
    CONSTRAINT "subcategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "subcategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "subcategory_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "subcategory" ("subcategory_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_subcategory" ("category_id", "parent_id", "subcategory_id", "subcategory_name") SELECT "category_id", "parent_id", "subcategory_id", "subcategory_name" FROM "subcategory";
DROP TABLE "subcategory";
ALTER TABLE "new_subcategory" RENAME TO "subcategory";
CREATE UNIQUE INDEX "subcategory_subcategory_name_key" ON "subcategory"("subcategory_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
