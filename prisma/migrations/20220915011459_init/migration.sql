/*
  Warnings:

  - You are about to drop the column `date` on the `Paste` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Paste` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paste" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL
);
INSERT INTO "new_Paste" ("content", "id") SELECT "content", "id" FROM "Paste";
DROP TABLE "Paste";
ALTER TABLE "new_Paste" RENAME TO "Paste";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
