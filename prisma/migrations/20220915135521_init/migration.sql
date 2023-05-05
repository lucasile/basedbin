/*
  Warnings:

  - Added the required column `urlID` to the `Paste` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paste" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "urlID" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL
);
INSERT INTO "new_Paste" ("content", "createdAt", "id") SELECT "content", "createdAt", "id" FROM "Paste";
DROP TABLE "Paste";
ALTER TABLE "new_Paste" RENAME TO "Paste";
CREATE UNIQUE INDEX "Paste_id_key" ON "Paste"("id");
CREATE UNIQUE INDEX "Paste_urlID_key" ON "Paste"("urlID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
