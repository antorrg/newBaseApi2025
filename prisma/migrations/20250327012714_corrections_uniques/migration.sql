/*
  Warnings:

  - You are about to drop the `landing` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Videogame` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "landing";

-- CreateTable
CREATE TABLE "Landing" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "infoHeader" TEXT NOT NULL,
    "infoBody" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Landing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Landing_title_key" ON "Landing"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Videogame_name_key" ON "Videogame"("name");
