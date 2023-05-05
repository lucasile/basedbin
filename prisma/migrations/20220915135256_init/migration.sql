/*
  Warnings:

  - Made the column `content` on table `Paste` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paste" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL
);
INSERT INTO "new_Paste" ("content", "createdAt", "id") SELECT "content", "createdAt", "id" FROM "Paste";
DROP TABLE "Paste";
ALTER TABLE "new_Paste" RENAME TO "Paste";
CREATE UNIQUE INDEX "Paste_id_key" ON "Paste"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
