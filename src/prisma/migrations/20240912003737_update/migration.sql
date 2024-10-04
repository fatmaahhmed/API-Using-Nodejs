-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Admin',
    "token" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Admin" ("email", "name", "password", "role", "user_id", "username") SELECT "email", "name", "password", "role", "user_id", "username" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
