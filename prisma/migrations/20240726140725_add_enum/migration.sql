/*
  Warnings:

  - The `status` column on the `Mortality` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MortalityStatusEnum" AS ENUM ('CLAIMED', 'UNCLAIMED', 'TAKEN');

-- CreateEnum
CREATE TYPE "UserRoleEnum" AS ENUM ('RELATIVE', 'HOSPITAL', 'ADMIN');

-- AlterTable
ALTER TABLE "Mortality" DROP COLUMN "status";
ALTER TABLE "Mortality" ADD COLUMN     "status" "MortalityStatusEnum" NOT NULL DEFAULT 'UNCLAIMED';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";
ALTER TABLE "User" ADD COLUMN     "role" "UserRoleEnum" NOT NULL;
