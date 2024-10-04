/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `productId` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "admin_email_key";

-- DropIndex
DROP INDEX "admin_username_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "admin";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_category" ("category_id", "category_name", "user_id") SELECT "category_id", "category_name", "user_id" FROM "category";
DROP TABLE "category";
ALTER TABLE "new_category" RENAME TO "category";
CREATE UNIQUE INDEX "category_category_id_key" ON "category"("category_id");
CREATE UNIQUE INDEX "category_category_name_key" ON "category"("category_name");
CREATE TABLE "new_user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'User',
    "verificationCode" TEXT NOT NULL DEFAULT '',
    "verification_code_expires" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("email", "name", "password", "role", "token", "user_id", "username", "verificationCode", "verification_code_expires") SELECT "email", "name", "password", "role", "token", "user_id", "username", "verificationCode", "verification_code_expires" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
