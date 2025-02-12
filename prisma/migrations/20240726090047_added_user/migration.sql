/*
  Warnings:

  - You are about to drop the column `email` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `names` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `dateOn` on the `Mortality` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Relative` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Relative` table. All the data in the column will be lost.
  - You are about to drop the column `mortalityId` on the `Relative` table. All the data in the column will be lost.
  - You are about to drop the column `names` on the `Relative` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Relative` table. All the data in the column will be lost.
  - You are about to drop the column `relationship` on the `Relative` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nid]` on the table `Mortality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Relative` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diedOn` to the `Mortality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Mortality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nid` to the `Mortality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nid` to the `Relative` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `Relative` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Relative` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_relativeId_fkey";

-- DropForeignKey
ALTER TABLE "Relative" DROP CONSTRAINT "Relative_mortalityId_fkey";

-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "email";
ALTER TABLE "Hospital" DROP COLUMN "location";
ALTER TABLE "Hospital" DROP COLUMN "names";
ALTER TABLE "Hospital" DROP COLUMN "password";
ALTER TABLE "Hospital" ADD COLUMN     "userId" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Mortality" DROP COLUMN "dateOn";
ALTER TABLE "Mortality" ADD COLUMN     "diedOn" TIMESTAMP(3) NOT NULL;
ALTER TABLE "Mortality" ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL;
ALTER TABLE "Mortality" ADD COLUMN     "nid" STRING NOT NULL;
ALTER TABLE "Mortality" ALTER COLUMN "status" SET DEFAULT 'UNCLAIMED';

-- AlterTable
ALTER TABLE "Relative" DROP COLUMN "email";
ALTER TABLE "Relative" DROP COLUMN "location";
ALTER TABLE "Relative" DROP COLUMN "mortalityId";
ALTER TABLE "Relative" DROP COLUMN "names";
ALTER TABLE "Relative" DROP COLUMN "password";
ALTER TABLE "Relative" DROP COLUMN "relationship";
ALTER TABLE "Relative" ADD COLUMN     "nid" STRING NOT NULL;
ALTER TABLE "Relative" ADD COLUMN     "tel" STRING NOT NULL;
ALTER TABLE "Relative" ADD COLUMN     "userId" STRING NOT NULL;

-- DropTable
DROP TABLE "Payment";

-- CreateTable
CREATE TABLE "Claim" (
    "id" STRING NOT NULL,
    "amount" FLOAT8 NOT NULL,
    "method" STRING NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL,
    "pickUpDate" TIMESTAMP(3) NOT NULL,
    "relationship" STRING NOT NULL,
    "relativeId" STRING NOT NULL,
    "mortalityId" STRING NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "names" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "role" STRING NOT NULL,
    "location" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Claim_mortalityId_key" ON "Claim"("mortalityId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_userId_key" ON "Hospital"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Mortality_nid_key" ON "Mortality"("nid");

-- CreateIndex
CREATE UNIQUE INDEX "Relative_userId_key" ON "Relative"("userId");

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relative" ADD CONSTRAINT "Relative_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_relativeId_fkey" FOREIGN KEY ("relativeId") REFERENCES "Relative"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_mortalityId_fkey" FOREIGN KEY ("mortalityId") REFERENCES "Mortality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
