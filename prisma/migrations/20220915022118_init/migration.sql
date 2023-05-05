/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Paste` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paste" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL
);
INSERT INTO "new_Paste" ("content", "id") SELECT "content", "id" FROM "Paste";
DROP TABLE "Paste";
ALTER TABLE "new_Paste" RENAME TO "Paste";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
