-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'User',
    "verificationCode" TEXT NOT NULL DEFAULT '',
    "verification_code_expires" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER
);
INSERT INTO "new_user" ("email", "name", "password", "productId", "role", "token", "user_id", "username") SELECT "email", "name", "password", "productId", "role", "token", "user_id", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
