/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Paste` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Paste_id_key" ON "Paste"("id");
