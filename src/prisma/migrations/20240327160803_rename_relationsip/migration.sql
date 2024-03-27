/*
  Warnings:

  - You are about to drop the `_Have` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Have" DROP CONSTRAINT "_Have_A_fkey";

-- DropForeignKey
ALTER TABLE "_Have" DROP CONSTRAINT "_Have_B_fkey";

-- DropTable
DROP TABLE "_Have";

-- CreateTable
CREATE TABLE "_Own" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Own_AB_unique" ON "_Own"("A", "B");

-- CreateIndex
CREATE INDEX "_Own_B_index" ON "_Own"("B");

-- AddForeignKey
ALTER TABLE "_Own" ADD CONSTRAINT "_Own_A_fkey" FOREIGN KEY ("A") REFERENCES "Fragrance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Own" ADD CONSTRAINT "_Own_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
